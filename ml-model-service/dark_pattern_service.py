from model_training.dark_pattern_model_train import predict_website_dark_pattern_type, \
    create_dark_pattern_detection_model
from model_training.scraping import web_scrap
from flask import jsonify


def create_model():
    print('Creating Dark Pattern Model')
    create_dark_pattern_detection_model()
    return 'Successfully model created', 200


def parse_website_url(website_id, params):
    print('Parsing website')
    website_url = params['websiteUrl']

    web_scrap(website_url, website_id)

    dark_patterns = predict_website_dark_pattern_type(website_id)
    dark_patterns = [{'text': key, 'patternType': value} for key, value in dark_patterns.items()]

    return jsonify(dark_patterns)
