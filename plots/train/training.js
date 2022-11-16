var readline = require('readline');
var fs = require('fs');
var natural = require('natural');
var classifier = new natural.BayesClassifier();

var myInterface = readline.createInterface({
    input: fs.createReadStream('train_data.txt')
});
let trainArray = [];


myInterface.on('line', function (line) {
    trainArray.push(line);
});

myInterface.on('close', function () {
    let documents = []
    for(let i = 0; i < trainArray.length; i++) {
        let movie = trainArray[i];
        let splitData = movie.split(":::");
        let genre = splitData[2].trim();
        let plot = splitData[3].trim();
        let document = [plot, genre];
        documents.push(document);
        classifier.addDocument(plot, genre);
    }
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
    classifier.save('classifier.json', function(err, classifier) {
        // the classifier is saved to the classifier.json file!
    });

    let spr = "Opening with the Allied invasion of Normandy on 6 June 1944, members of the 2nd Ranger Battalion under Cpt. Miller fight ashore to secure a beachhead. Amidst the fighting, two brothers are killed in action. Earlier in New Guinea, a third brother is KIA. Their mother, Mrs. Ryan, is to receive all three of the grave telegrams on the same day. The United States Army Chief of Staff, George C. Marshall, is given an opportunity to alleviate some of her grief when he learns of a fourth brother, Private James Ryan, and decides to send out 8 men (Cpt. Miller and select members from 2nd Rangers) to find him and bring him back home to his mother...";
    console.log(classifier.classify(spr));
});
