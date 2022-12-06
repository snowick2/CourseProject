const express = require('express');
const cors = require('cors');
const natural = require("natural");
const util = require('../tune/util')

const app = express();
let classifier = '../train/classifier.json';
app.use(cors());

app.get('/', (req, res) => {
    let plot = req.query.plot;
    natural.BayesClassifier.load(classifier, null, function (err, classifier) {
        let genre = classifier.classify(plot);
        let classes = classifier.getClassifications(plot);
        genre = util.lessWar(plot, genre, classes);
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
    let classifyWith = process.argv.slice(2)[0];
    if(classifyWith) classifier = classifyWith;
    console.log(classifier);
    console.log('server is listening on port 2020');
});