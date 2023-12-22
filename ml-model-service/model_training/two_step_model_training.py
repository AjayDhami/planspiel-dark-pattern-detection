import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import make_pipeline
from sklearn.metrics import accuracy_score
from joblib import dump, load

# Load the CSV file from the model_training folder
df = pd.read_csv("../model_training/dataset.csv")
print(f"Initial DataFrame count: {len(df)}")
df.head()

# List of selected types for the second-level models
dark_pattern_types = ["Fake Scarcity", "Fake Social Proof", "Fake Urgency", "Misdirection"]

# Step 1: First-level model to distinguish between Dark Patterns and Not Dark Patterns
# Create a boolean mask
dark_pattern_mask = df['Type'].isin(dark_pattern_types)

# Assign labels for the first-level model (0 for Not Dark Patterns, 1 for Dark Patterns)
df['First_Level_Label'] = dark_pattern_mask.astype(int)

# Split the dataset into training and testing sets for the first-level model
train_df, test_df = train_test_split(df, test_size=0.2, random_state=42)

print(f"Train DataFrame count: {len(train_df)}")
print(f"Test DataFrame count: {len(test_df)}")

# Create pipelines for the first-level models
first_level_algorithms = {
    "Multinomial Naive Bayes": make_pipeline(TfidfVectorizer(), MultinomialNB()),
    "Support Vector Machines": make_pipeline(TfidfVectorizer(), SVC(kernel='linear')),
    "Random Forest": make_pipeline(TfidfVectorizer(), RandomForestClassifier())
}

# Create a folder for trained models if it doesn't exist
trained_models_folder = "trained_models"
os.makedirs(trained_models_folder, exist_ok=True)

# Create a folder for trained first-level models if it doesn't exist
first_level_models_folder = os.path.join(trained_models_folder, "first_level_models")
os.makedirs(first_level_models_folder, exist_ok=True)

# Train and evaluate each first-level model
for algo_name, model in first_level_algorithms.items():
    # Drop rows with missing values in the 'Text' column
    train_df = train_df.dropna(subset=['Text'])

    # Ensure 'Text' column has string data type
    train_df['Text'] = train_df['Text'].astype(str)

    # Reset the index of the DataFrame
    train_df = train_df.reset_index(drop=True)

    # Fit the first-level model
    model.fit(train_df['Text'], train_df['First_Level_Label'])

    # Evaluate the first-level model on the test set
    predictions = model.predict(test_df['Text'])
    accuracy = accuracy_score(test_df['First_Level_Label'], predictions)

    # Save the trained first-level model to a file in the first_level_models folder
    model_path = os.path.join(first_level_models_folder, f'{algo_name.lower().replace(" ", "_")}_model.joblib')
    dump(model, model_path)

    print(f"{algo_name} First-Level Model Accuracy: {accuracy:.2f}")

# User input text
user_input_text = "Reviewed by group"
print(f"\nText to predict: {user_input_text}")

# Load and make predictions with the first-level models
first_level_predictions = {}

for algo_name, model in first_level_algorithms.items():
    # Load the saved model
    model_path = os.path.join(first_level_models_folder, f'{algo_name.lower().replace(" ", "_")}_model.joblib')
    loaded_model = load(model_path)

    # Make predictions
    first_level_prediction = loaded_model.predict([user_input_text])

    # first_level_prediction[0]: Extracts the actual prediction value from the array.
    first_level_predictions[algo_name] = first_level_prediction[0]

# Print first-level predictions
print("\nFirst-Level Predictions:")
for algo_name, prediction in first_level_predictions.items():
    print(f"{algo_name}: {prediction}")


# Step 2: Train second-level models for each Dark Pattern type

# Filter the original DataFrame for Dark Pattern types
second_level_df = df[df['Type'].isin(dark_pattern_types)]
print(f"Total Dark Pattern containing dataset: {len(second_level_df)}")

fake_scarcity_df = second_level_df[second_level_df['Type'] == 'Fake Scarcity']
fake_social_proof_df = second_level_df[second_level_df['Type'] == 'Fake Social Proof']
fake_urgency_df = second_level_df[second_level_df['Type'] == 'Fake Urgency']
misdirection_df = second_level_df[second_level_df['Type'] == 'Misdirection']

# Print the length of each DataFrame
print(f"Fake Scarcity DataFrame Length: {len(fake_scarcity_df)}")
print(f"Fake Social Proof DataFrame Length: {len(fake_social_proof_df)}")
print(f"Fake Urgency DataFrame Length: {len(fake_urgency_df)}")
print(f"Misdirection DataFrame Length: {len(misdirection_df)}")

# Create a folder for trained second-level models if it doesn't exist
second_level_models_folder = os.path.join(trained_models_folder, "second_level_models")
os.makedirs(second_level_models_folder, exist_ok=True)

# Iterate over each Dark Pattern type
for dark_pattern_type in dark_pattern_types:
    print(f"\nTraining Second-Level Models for {dark_pattern_type}:")

    # Filter the dataset for the specific Dark Pattern type
    positive_df = second_level_df[second_level_df['Type'] == dark_pattern_type]

    # Create a combined negative dataset
    negative_df = second_level_df[second_level_df['Type'] != dark_pattern_type]

    # Ensure that negative_df contains instances with First_Level_Label as 0
    negative_df.loc[:, 'First_Level_Label'] = 0

    # Ensure that the negative dataset has the same number of instances as the positive dataset
    negative_df = negative_df.sample(n=len(positive_df), random_state=42)

    # Combine positive and negative datasets
    train_combined_df = pd.concat([positive_df, negative_df])

    # Shuffle the combined training dataset
    train_combined_df = train_combined_df.sample(frac=1, random_state=42).reset_index(drop=True)

    # Display the lengths of positive and negative datasets for verification
    print(f"Positive Dataset Length: {len(positive_df)}")
    print(f"Negative Dataset Length: {len(negative_df)}")

    # Split the datasets into training and testing sets for the second-level model
    train_pos_df, test_pos_df = train_test_split(positive_df, test_size=0.2, random_state=42)
    train_neg_df, test_neg_df = train_test_split(negative_df, test_size=0.2, random_state=42)

    # Display the lengths of positive and negative datasets for verification
    print(f"Positive Train Dataset Length: {len(train_pos_df)}")
    print(f"Negative Train Dataset Length: {len(train_neg_df)}")
    print(f"Positive Test Dataset Length: {len(test_pos_df)}")
    print(f"Negative Test Dataset Length: {len(test_neg_df)}")

    # Create pipelines for the second-level models
    second_level_algorithms = {
        "Multinomial Naive Bayes": make_pipeline(TfidfVectorizer(), MultinomialNB()),
        "Support Vector Machines": make_pipeline(TfidfVectorizer(), SVC(kernel='linear')),
        "Random Forest": make_pipeline(TfidfVectorizer(), RandomForestClassifier())
    }

    # Train and evaluate each second-level model
    for algo_name, model in second_level_algorithms.items():
        # Drop rows with missing values in the 'Text' column
        train_combined_df = train_combined_df.dropna(subset=['Text'])

        # Ensure 'Text' column has string data type
        train_combined_df['Text'] = train_combined_df['Text'].astype(str)

        # Reset the index of the DataFrame
        train_combined_df = train_combined_df.reset_index(drop=True)

        # Fit the second-level model
        model.fit(train_combined_df['Text'], train_combined_df['First_Level_Label'])

        # Evaluate the second-level model on the test set (positive and negative combined)
        predictions_pos = model.predict(test_pos_df['Text'])
        predictions_neg = model.predict(test_neg_df['Text'])

        # Calculate accuracy separately for positive and negative datasets
        accuracy_pos = accuracy_score(test_pos_df['First_Level_Label'], predictions_pos)
        accuracy_neg = accuracy_score(test_neg_df['First_Level_Label'], predictions_neg)

        # Save the trained second-level model to a file in the second_level_models folder
        model_path = os.path.join(second_level_models_folder,
                                  f'{dark_pattern_type.lower().replace(" ", "_")}_{algo_name.lower().replace(" ", "_")}_model.joblib')
        dump(model, model_path)

        print(f"{dark_pattern_type} - {algo_name} Second-Level Model Accuracy (Positive): {accuracy_pos:.2f}")
        print(f"{dark_pattern_type} - {algo_name} Second-Level Model Accuracy (Negative): {accuracy_neg:.2f}")


def predict_dark_pattern(input_text):
    print(f"\nInput Text: {input_text}")

    # Load and make predictions with the first-level models
    first_level_predictions = {}

    print("\nFirst-Level Predictions:")
    for algo_name, model in first_level_algorithms.items():
        # Load the saved model
        model_path = os.path.join(first_level_models_folder, f'{algo_name.lower().replace(" ", "_")}_model.joblib')
        loaded_model = load(model_path)

        # Make predictions
        first_level_prediction = loaded_model.predict([input_text])

        # first_level_prediction[0]: Extracts the actual prediction value from the array.
        first_level_predictions[algo_name] = first_level_prediction[0]

        print(f"{algo_name}: {'Dark Pattern' if first_level_prediction[0] == 1 else 'Not Dark Pattern'}")

    # Check if it is identified as a Dark Pattern
    if any(value == 1 for value in first_level_predictions.values()):
        # Load and make predictions with the second-level models
        print("\nSecond-Level Predictions:")
        for dark_pattern_type in dark_pattern_types:
            print(f"\nTesting for {dark_pattern_type}:")

            # Load the saved second-level model
            for algo_name in second_level_algorithms.keys():
                model_path = os.path.join(second_level_models_folder,
                                          f'{dark_pattern_type.lower().replace(" ", "_")}_{algo_name.lower().replace(" ", "_")}_model.joblib')
                loaded_model = load(model_path)

                # Make predictions
                second_level_prediction = loaded_model.predict([input_text])

                # Map numerical labels to Dark Pattern names
                dark_pattern_names = {
                    0: f"No",
                    1: f"Yes"
                }

                # Extract the actual prediction value from the array
                second_level_prediction_name = dark_pattern_names.get(second_level_prediction[0], "Unknown")

                print(f"{algo_name}: {second_level_prediction_name}")


# Example usage
user_input_text = "Recommended by group"
predict_dark_pattern(user_input_text)
