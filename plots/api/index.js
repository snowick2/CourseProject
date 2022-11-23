const express = require('express');
const cors = require('cors');
const natural = require("natural");

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    let plot = req.query.plot;
    natural.BayesClassifier.load('../train/classifier.json', null, function (err, classifier) {
        let genre = classifier.classify(plot);
        let classes = classifier.getClassifications(plot);
        let secondClass = classes[1].label;
        let warWords = [' war ', ' army ', ' soldier ']
        if (genre === 'war') {
            let isWar = false;
            for (let word of warWords) {
                if (plot.toLowerCase().indexOf(word) !== -1) {
                    isWar = true;
                    break;
                }
            }
            if (!isWar) genre = secondClass;
        }
        res.json({
            genre: genre,
            classes: classes
        });
    });
});

app.get('/:name', (req, res) => {
    let name = req.params.name;

    res.json({
        message: `Hello ${name}`
    });
});

app.listen(2020, () => {
    console.log('server is listening on port 2020');
});