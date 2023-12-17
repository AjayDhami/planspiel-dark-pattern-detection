from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from api.components.dark_pattern import dark_pattern_service

dark_pattern = Blueprint('dark_pattern', __name__, url_prefix='/darkPattern')


@dark_pattern.route('/', methods=['POST'])
@cross_origin()
def scrapping_particular_website():
    website_details = dark_pattern_service.scrapping_particular_website(params=request.json)
    return website_details


@dark_pattern.route('/<string:website_id>', methods=['GET'])
@cross_origin()
def fetch_particular_website_details(website_id):
    website_details = dark_pattern_service.fetch_particular_website(website_id)
    return jsonify(website_details)
