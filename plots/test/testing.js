const readline = require('readline');
const fs = require('fs');
const axios = require('axios');
const natural = require("natural");
let moviesAndPlots = []
let fetchPlot = async (title) => {
    await axios({
        method: "get",
        url: "http://www.omdbapi.com/?apikey=68557062",
        responseType: "json",
        params: {
            t: title,
            plot: "full",
        },
    })
        .then(function (response) {
            moviesAndPlots.push({title: title, plot: response.data.Plot})
            return response.data.Plot;
        })
        .catch(function (err) {
            console.log(err);
        });
};


let classifyMovie = (plot, title) => {
    console.log("classifying")
    natural.BayesClassifier.load('../train/classifier-s.json', null, function (err, classifier) {
        let genre = classifier.classify(plot);
        // output genre and title to file
        writeResults(title, genre);
    });
}

let writeResults = (title, genre) => {
    fs.appendFile('results-s.txt', title + ': ' + genre + '\n', function (err) {
        if (err) {
            // append failed
        } else {
            // done
        }
    })
};

var myInterface = readline.createInterface({
    input: fs.createReadStream('movies.csv')
});
let titles = [];

myInterface.on('line', function (line) {
    titles.push(line);
});

myInterface.on('close', async function () {
        let fetchPlots = async () => {
            for (let i = 0; i < 250; i++) {
                let title = titles[i];
                let plot = await fetchPlot(title);
            }
        }
        await fetchPlots();
        for (let pt of moviesAndPlots) {
            let title = pt.title;
            let plot = pt.plot;
            if (plot && title) classifyMovie(plot, title);
        }
    }
);

