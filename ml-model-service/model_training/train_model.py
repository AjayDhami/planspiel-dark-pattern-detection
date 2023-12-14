import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
from sklearn.metrics import classification_report, accuracy_score
from joblib import dump, load


def train_and_evaluate_model():
    # Load the CSV file from the model_training folder
    df = pd.read_csv("../model_training/dataset.csv")

    # List of selected types
    selected_types = ["Not Dark Pattern", "Fake Scarcity", "Fake Social Proof", "Fake Urgency", "Misdirection"]

    # Create a boolean mask
    mask = df['Type'].isin(selected_types)

    # Apply the mask to filter the DataFrame
    selected_df = df[mask]

    # Split the dataset into training and testing sets
    # train_df, test_df = train_test_split(df, test_size=0.2, random_state=42)
    train_df, test_df = train_test_split(selected_df, test_size=0.2, random_state=42)

    # Create a text classification pipeline
    model = make_pipeline(
        TfidfVectorizer(),
        MultinomialNB()
    )

    # Drop rows with missing values in the 'Text' column
    train_df = train_df.dropna(subset=['Text'])

    # Ensure 'Text' column has string data type
    train_df['Text'] = train_df['Text'].astype(str)

    # Reset the index of the DataFrame
    train_df = train_df.reset_index(drop=True)

    # Now, you can fit the model
    model.fit(train_df['Text'], train_df['Type'])

    # Evaluate the model on the test set
    predictions = model.predict(test_df['Text'])
    accuracy = accuracy_score(test_df['Type'], predictions)

    # Save the trained model to a file (you can do this after training)
    dump(model, 'dark_pattern_model.joblib')

    print(f"Accuracy: {accuracy:.2f}")
    # print("\nClassification Report:")
    # print(classification_report(test_df['Type'], predictions))


# Function to predict the type of user input
def predict_dark_pattern_type(user_input):
    # Load the saved model
    loaded_model = load('dark_pattern_model.joblib')

    # Make predictions
    prediction = loaded_model.predict([user_input])

    return prediction[0]


if __name__ == "__main__":
    # Call the function to train and evaluate the model
    train_and_evaluate_model()

    # Predict type of given text
    user_input_text = "125 left at 95%"
    predicted_type = predict_dark_pattern_type(user_input_text)
    print(f"Predicted Dark Pattern Type: {predicted_type}")
