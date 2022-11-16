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
    console.log(trainArray[0])
});
