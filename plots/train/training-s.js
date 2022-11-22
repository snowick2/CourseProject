var readline = require('readline');
var fs = require('fs');
var natural = require('natural');
var classifier = new natural.BayesClassifier();

var myInterface = readline.createInterface({
    input: fs.createReadStream('scripts.csv')
});
let trainArray = [];


myInterface.on('line', function (line) {
    trainArray.push(line);
});

myInterface.on('close', function () {
    for(let i = 1; i < trainArray.length; i++) {
        let rec = trainArray[i];
        let splitData = rec.split('"');
        let script = splitData[1];
        if(splitData[2]) {
            let genre = splitData[2].replace(',', '');
            classifier.addDocument(script, genre);
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
    classifier.train();
    classifier.save('classifier-s.json', function(err, classifier) {
        // the classifier is saved to the classifier.json file!
    });

 let spr = "When a green ogre named Shrek discovers his swamp has been 'swamped' with all sorts of fairytale creatures by the scheming Lord Farquaad, Shrek sets out with a very loud donkey by his side to 'persuade' Farquaad to give Shrek his swamp back. Instead, a deal is made. Farquaad, who wants to become the King, sends Shrek to rescue Princess Fiona, who is awaiting her true love in a tower guarded by a fire-breathing dragon. But once they head back with Fiona, it starts to become apparent that not only does Shrek, an ugly ogre, begin to fall in love with the lovely princess, but Fiona is also hiding a huge secret."
     console.log(classifier.classify(spr));
});
