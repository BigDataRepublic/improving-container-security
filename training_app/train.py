import pickle
from os import path, environ
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from sklearn import datasets

model_file = path.join(environ.get("MODEL_DIR"), "model.pkl")

if path.exists(model_file):
	print("The output file at '{0}' already exists. Exiting to prevent data loss.".format(model_file))
	exit(0)

# add parameters for tuning
num_estimators = 100

#TRAIN MODEL:
iris = datasets.load_iris()
x = iris.data[:, 2:]
y = iris.target
X_train, X_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=7)

# train the model
rf = RandomForestRegressor(n_estimators=num_estimators)
rf.fit(X_train, y_train)
y_pred = rf.predict(X_test)
print("MSE:")
print(mean_squared_error(y_test, y_pred))

with open(model_file, 'wb') as model_file:
	pickle.dump(rf, model_file)
