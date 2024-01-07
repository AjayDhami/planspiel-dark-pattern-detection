from flask import current_app
from bson import ObjectId
from model_training.scraping import web_scrap
from model_training.dark_pattern_model_train import predict_website_dark_pattern_type, create_dark_pattern_detection_model


def get_website_collection():
    mongo = current_app.config['mongo']
    return mongo.db.websites  # Assuming 'websites' is the collection name


def create_model():
    create_dark_pattern_detection_model()
    return 'Successfully model created', 200


def parse_website_url(website_id, params):
    website_collection = get_website_collection()
    website_id = ObjectId(website_id)
    website = website_collection.find_one({"_id": website_id})

    # TODO later fetch all urls from website from database
    website_url = params['websiteUrl']
    web_scrap(website_url, website_id)
    dark_patterns = predict_website_dark_pattern_type(website_id)

    # TODO save dark patterns in database
    for text, pattern_type in dark_patterns.items():
        print(f"{text}: {pattern_type}")

    return 'Successfully website parsed', 200


def test_data_insert(params):
    website_collection = get_website_collection()

    website_data = {
        "websiteId": params['website_id'],
        "websiteName": "Dummy data for website",
        # Add more fields as needed
    }

    try:
        # Insert data into the MongoDB collection
        result = website_collection.insert_one(website_data)
        # Check if the insertion was successful
        if result.inserted_id:
            response = {
                "message": "Data inserted successfully",
                "inserted_id": str(result.inserted_id)
            }
        else:
            response = {"message": "Failed to insert data"}

    except Exception as e:
        response = {"message": f"Error: {str(e)}"}

    return response
