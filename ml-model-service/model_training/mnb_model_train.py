import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
from sklearn.metrics import accuracy_score
from joblib import dump, load


def read_and_clean_dataset(file_input_path):
    # Load the CSV file
    df = pd.read_csv(file_input_path)
    print(f"Initial DataFrame count: {len(df)}")
    df.head()

    # Drop rows with missing values in the 'Text' column
    df = df.dropna(subset=['Text'])

    # Ensure 'Text' column has string data type
    df['Text'] = df['Text'].astype(str)

    # Reset the index of the DataFrame
    df = df.reset_index(drop=True)

    return df


def train_and_evaluate_model(df, target_column, save_filename):
    # Split the dataset into training and testing sets
    train_df, test_df = train_test_split(df, test_size=0.2, random_state=34)

    # Create a pipeline for the model
    model = make_pipeline(TfidfVectorizer(), MultinomialNB())

    # Fit the model
    model.fit(train_df['Text'], train_df[target_column])

    # Evaluate the model on the test set
    predictions = model.predict(test_df['Text'])
    accuracy = accuracy_score(test_df[target_column], predictions)

    # Save the trained model to a file
    model_folder = os.path.join("trained_models")
    os.makedirs(model_folder, exist_ok=True)
    model_path = os.path.join(model_folder, f'{save_filename.lower().replace(" ", "_")}_model.joblib')
    dump(model, model_path)

    # Return the accuracy and the trained model
    return accuracy, model


def train_first_level_model(df):
    print(f"\nTraining first level model")
    # Create a boolean mask for Dark Patterns
    dark_pattern_mask = df['Type'].isin(dark_pattern_types)

    # Assign labels for the first-level model (0 for Not Dark Patterns, 1 for Dark Patterns)
    df['Label'] = dark_pattern_mask.astype(int)

    # Train and evaluate the first-level model using Multinomial Naive Bayes
    accuracy, model = train_and_evaluate_model(df, 'Label', "first_level")
    print(f"First Level Model Accuracy: {accuracy:.2f}")

    # Remove the extra column
    df.drop(columns=['Label'], inplace=True)


def train_second_level_models(df):
    # Filter the original DataFrame to select dataframe containing dark patterns
    dark_patterns_df = df[df['Type'].isin(dark_pattern_types)]

    for dark_pattern_type in dark_pattern_types:
        print(f"\nTraining second level model for: {dark_pattern_type}")

        # Filter the dataset for the specific Dark Pattern type
        positive_df = dark_patterns_df[dark_patterns_df['Type'] == dark_pattern_type].copy()

        # Create a combined negative dataset
        negative_df = dark_patterns_df[dark_patterns_df['Type'] != dark_pattern_type].copy()

        # Ensure that negative_df contains instances with Label as 0 and positive_df with Label as 1
        positive_df.loc[:, 'Label'] = 1
        negative_df.loc[:, 'Label'] = 0

        # Ensure that the negative dataset has the same number of instances as the positive dataset
        negative_df = negative_df.sample(n=len(positive_df), random_state=43)

        # Combine positive and negative datasets
        train_combined_df = pd.concat([positive_df, negative_df]).sample(frac=1, random_state=34).reset_index(drop=True)

        # Train and evaluate the second-level model using Multinomial Naive Bayes
        accuracy, model = train_and_evaluate_model(train_combined_df, 'Label', dark_pattern_type)
        print(f"{dark_pattern_type} Model Accuracy: {accuracy:.2f}")

        # Remove the extra column
        train_combined_df.drop(columns=['Label'], inplace=True)


def predict_dark_pattern(input_text):
    print(f"\nInput Text: {input_text}")

    # Load and make predictions with the first-level model
    first_level_model_path = os.path.join("trained_models", "first_level_model.joblib")
    loaded_first_level_model = load(first_level_model_path)
    first_level_prediction = loaded_first_level_model.predict([input_text])

    print(f"\nFirst-Level Prediction: {'Dark Pattern' if first_level_prediction[0] == 1 else 'Not Dark Pattern'}")

    # Check if it is identified as a Dark Pattern
    if first_level_prediction[0] == 1:
        # Load and make predictions with the second-level models
        for dark_pattern_type in dark_pattern_types:
            # Load the saved second-level model
            second_level_model_path = os.path.join("trained_models",
                                                   f'{dark_pattern_type.lower().replace(" ", "_")}_model.joblib')
            loaded_second_level_model = load(second_level_model_path)

            # Make predictions
            second_level_prediction = loaded_second_level_model.predict([input_text])

            print(f"{dark_pattern_type}: {'Yes' if second_level_prediction[0] == 1 else 'No'}")


# Example usage
csv_path = "../model_training/dataset.csv"
dark_pattern_types = ["Fake Scarcity", "Fake Social Proof", "Fake Urgency", "Misdirection"]

filtered_df = read_and_clean_dataset(csv_path)
train_first_level_model(filtered_df)
train_second_level_models(filtered_df)

user_input_text = "Manage Cookies Learn More"
predict_dark_pattern(user_input_text)
