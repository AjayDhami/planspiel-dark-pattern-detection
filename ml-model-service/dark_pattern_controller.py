from flask import Blueprint, request
from flask_cors import cross_origin
import dark_pattern_service

dark_pattern = Blueprint('dark_pattern', __name__, url_prefix='/darkPattern')


@dark_pattern.route('/createModel', methods=['GET'])
@cross_origin()
def create_dark_pattern_model():
    return dark_pattern_service.create_model()


@dark_pattern.route('/<string:website_id>', methods=['POST'])
@cross_origin()
def parse_website_for_dark_pattern_detection(website_id):
    return dark_pattern_service.parse_website_url(website_id, params=request.json)
