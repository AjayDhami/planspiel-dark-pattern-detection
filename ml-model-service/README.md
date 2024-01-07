# Description
This repository is a Flask-based web service which is one of the submodule for Dark Pattern Detection Project.
It involves building, training AI Models for dark pattern detection as well as web scrapping part.

## Steps to run ml-model-service
- Navigate to  project directory: `cd ml-model-service`
- Create a virtual environment: `python -m venv venv`
- Activate the virtual environment: 
  - For Unix or MacOS: `source venv/bin/activate`
  - For Windows: `.\venv\Scripts\activate`
- Install the required dependencies: `pip install -r requirements.txt`
- Create `.env` file in root directory of your `cd ml-model-service` project. Refer to `sample.env` file and replace with actual values.
- Command to run the application: `python main.py` or run `main.py` directly from IDE
- Command to deactivate virtual environment: `deactivate`

