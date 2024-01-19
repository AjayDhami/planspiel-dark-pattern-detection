from model_training.dark_pattern_model_train import predict_website_dark_pattern_type, create_dark_pattern_detection_model
from model_training.scraping import web_scrap

def create_model():
    print('Creating Dark Pattern Model')
    create_dark_pattern_detection_model()
    return 'Successfully model created', 200


def parse_website_url(website_id, params):
    print('Parsing website')
    website_url = params['websiteUrl']

    # TODO change implementation of web_scrap method to accept list of website_urls and store their content in given website id
    web_scrap(website_url, website_id)

    dark_patterns = predict_website_dark_pattern_type(website_id)

    # for text, pattern_type in dark_patterns.items():
    #     print(f"{text}: {pattern_type}")

    return dark_patterns, 200
    # return 'Successfully website parsed', 200
