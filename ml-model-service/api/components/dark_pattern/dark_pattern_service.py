from flask import current_app
from bson import ObjectId


def get_website_collection():
    mongo = current_app.config['mongo']
    return mongo.db.website  # Assuming 'website' is the collection name


def scrapping_particular_website(params):
    website_collection = get_website_collection()

    website_data = {
        "websiteId": params['website_id'],
        "websiteName": "Dummy data for website",
        # Add more fields as needed
    }

    try:
        # Insert data into the MongoDB collection
        result = website_collection.insert_one(website_data)

        # TODO Fetch website detail and do web scrapping
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


def fetch_particular_website(website_id):
    website_collection = get_website_collection()

    try:
        # Convert the website_id to ObjectId
        website_id = ObjectId(website_id)

        # Fetch details for a particular website based on the website ID
        website = website_collection.find_one({"_id": website_id})

        if website:
            # Serialize the ObjectId to a string before returning the result
            website['_id'] = str(website['_id'])
            response = {"website_details": website}
        else:
            response = {"message": "Website not found"}

    except Exception as e:
        response = {"message": f"Error: {str(e)}"}

    return response
