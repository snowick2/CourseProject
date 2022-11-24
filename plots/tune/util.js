const lessWar = (plot, genre, classes) => {
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
        if (!isWar) return secondClass;
        return genre;
    }
    return genre;
};
exports.lessWar = lessWar;
