var readline = require('readline');
var fs = require('fs');

var myInterface = readline.createInterface({
    input: fs.createReadStream('train_data.txt')
});
let trainArray = [];


myInterface.on('line', function (line) {
    trainArray.push(line);
});

myInterface.on('close', function () {
    let documents = []
    for(let movie of trainArray) {
        let splitData = movie.split(":::");
        let genre = splitData[2].trim();
        let plot = splitData[3].trim();
        let document = [plot, genre];
        documents.push(document)
    }
    console.log(documents);
});
