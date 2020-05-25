# improving-container-security
A Data Science service with its security improved as per the "Improving the security of Data Science containers" Medium post.

## Parts of the service
The service has three parts:
1. iris_trainer - This container trains a random forest regressor in scikit-learn using the [Iris Dataset](https://scikit-learn.org/stable/auto_examples/datasets/plot_iris_dataset.html). After the model is trained, it is written to a Pickle file (*model.pkl*) in the directory represented by the *MODEL_DIR* environment variable. The image of this container is defined in the *Dockerfile.model* file.
1. iris_predictor - This container loads a random forest regressor of scikit-learn as saved in a *model.pkl* file of the directory represented by the *MODEL_DIR* environment variable. The loaded model is then exposed via Flask on port 5000 to accept a POST with an array of two numbers in the JSON body, i.e. `{ [ 1, 2 ] }`. The response to the POST request is as JSON object with a `value` field and a number as its value, i.e. `{ "value" = 1 }`. The Flask endpoint is simply `/`, thus it is accessed via `http://localhost:5000/`. The image of this container is defined in the *Dockerfile.model* file.
1. iris_frontend - This container runs an AngularJS web application with Nginx on port 4200. The UI has a simple form that POST's two input numbers to an endpoint that is assumed to listen on `http://localhost:5000/`. The response of the POST is then displayed by accessing its `value` field. Therefore, this container ideally connects to iris_predictor. Note that the AngularJS application is built with a builder image using Node.js, which can be seen in the *Dockerfile.frontend* file.

## Running the service
To run the service:
1. Open a terminal and change to the directory that contains the *docker-compose.yml* file (in the root of this repo).
1. Execute `docker-compose build` to create the Docker images.
1. Execute `docker-compose up -d` to create containers and start the service. This will first run the iris_trainer that will train the model if it does not exist. Then, the iris_predictor will run to load the model that should exist in the attached volume. Finally, the iris_frontend will run making the web UI available on `http://localhost:4200/`.
