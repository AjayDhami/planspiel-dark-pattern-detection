import certifi
from flask import Flask
from flask_pymongo import PyMongo
from config import Config
from routes import register_routes

# Create Flask api
app = Flask(__name__)

# Load config from Config class
app.config.from_object(Config)

# Initialize MongoDB with TLS
mongo = PyMongo(app, tlsCAFile=certifi.where())
app.config['mongo'] = mongo

# Register the book blueprint with the mongo instance
app = register_routes(app)

if __name__ == "__main__":
    # api.run(host=os.getenv('HOST'), port=os.getenv('PORT'))
    app.run(debug=True)
