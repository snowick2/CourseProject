# plots

## Project setup

Before running this project locally, please install node.js https://nodejs.org/en/
Once node is installed, run npm install from the project root.

To run this project locally you will need to run the API and UI.

To run this project's API locally:
1. cd api
2. node index.js

To run this project's UI locally:
2. npm run serve from project root
3. Navigate to localhost:8080 in a browser

To train on a new dataset:
1. cd train
2. Add a training data file to this directory
3. Modify training.js to parse and train the training data.
4. Modify training.js to save the classifier to a new .json file
5. node training.js
6. Set index.js to load your new classifier at line 11

```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
