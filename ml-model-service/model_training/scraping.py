from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from ordered_set import OrderedSet
import pandas as pd
import os


def web_scrap(url, website_id):
    all_text = []
    
    # Initialize WebDriver
    driver = webdriver.Chrome()
    driver.get(url)

    # Use explicit wait for elements to be present in the DOM
    wait = WebDriverWait(driver, 25)
    wait.until(EC.presence_of_all_elements_located((By.TAG_NAME, 'body')))

    # Fetch page source after the wait
    data = driver.page_source
    soup = BeautifulSoup(data, 'html.parser')

    # Find all div tags
    div_tags = soup.find_all('div')

    # Print id and class attributes in sequence
    for div_tag in div_tags:
        # Iterate through nested tags inside the div
        for nested_tag in div_tag.find_all(recursive=False):
            text = nested_tag.get_text(strip=True)
            all_text.append(text)

    # To filter empty list or lines from fetched data
    filtered_list = [item for item in all_text if item.strip() != '']
    for i in range(len(filtered_list)):
        filtered_list[i] = filtered_list[i].replace('\n', '')

    # Remove duplicate elements
    filtered_list = list(OrderedSet(filtered_list))

    current_script_path = os.path.dirname(os.path.abspath(__file__))
    output_directory = os.path.join(current_script_path, "scraped_data")

    if not os.path.exists(output_directory):
        os.makedirs(output_directory)

    df = pd.DataFrame({"Text": filtered_list})
    output_file_path = os.path.join(output_directory, "{}.csv".format(website_id))

    try:
        df.to_csv(output_file_path, index=False, encoding='utf-8')
        # TODO use regex to save only certain text
        print(f'Data has been successfully written to {output_file_path}')
    except Exception as e:
        print(f'Error writing to the file: {e}')

    # Close browser window
    driver.quit()

    return 'Done'
