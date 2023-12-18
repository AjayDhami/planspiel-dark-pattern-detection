import certifi
from flask import Flask
from flask_pymongo import PyMongo
from config.config import Config
from routes import routes

# Create Flask api
app = Flask(__name__)

# Load config from Config class
app.config.from_object(Config)

# Initialize MongoDB with TLS
mongo = PyMongo(app, tlsCAFile=certifi.where())
app.config['mongo'] = mongo

# Register the book blueprint with the mongo instance
app = routes.register_routes(app)

if __name__ == "__main__":
    # api.run(host=os.getenv('HOST'), port=os.getenv('PORT'))
    app.run(debug=True)
