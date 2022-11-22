let readline = require('readline');
let fs = require('fs');
let natural = require('natural');
let classifier = new natural.BayesClassifier();

let myInterface = readline.createInterface({
    input: fs.createReadStream('train_data.txt')
});
let trainArray = [];


myInterface.on('line', function (line) {
    trainArray.push(line);
});

myInterface.on('close', function () {
    let documents = []
    for (let i = 0; i < trainArray.length; i++) {
        let movie = trainArray[i];
        let splitData = movie.split(":::");
        let genre = splitData[2].trim();
        let plot = splitData[3].trim();
        documents.push({plot: plot, genre: genre});
    }

    let myInterfaceScript = readline.createInterface({
        input: fs.createReadStream('scripts.csv')
    });
    let scriptData = [];
    myInterfaceScript.on('line', function (line) {
        scriptData.push(line);
    });

    myInterfaceScript.on('close', function () {
        for (let i = 1; i < scriptData.length; i++) {
            let rec = scriptData[i];
            let splitData = rec.split('"');
            let script = splitData[1];
            if (splitData[2]) {
                let genre = splitData[2].replace(',', '');
                documents.push({plot: script, genre: genre});
            }
        }
        console.log("done parsing")
        classifier.events.on('trainedWithDocument', function (obj) {
            console.log(obj);
            /* {
            *   total: 23 // There are 23 total documents being trained against
            *   index: 12 // The index/number of the document that's just been trained against
            *   doc: {...} // The document that has just been indexed
            *  }
            */
        });
        for(let d of documents) {
            classifier.addDocument(d.plot, d.genre);
        }
        console.log("done adding docs");
        classifier.train();
        classifier.save('classifier-p-s.json', function (err, classifier) {
            // the classifier is saved to the classifier.json file!
        });

    });
});