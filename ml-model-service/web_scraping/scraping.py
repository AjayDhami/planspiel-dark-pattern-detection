from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from ordered_set import OrderedSet
import csv
import re

def web_scrap(url):
    PATTERN = re.compile(r'(www\.|http://|https://)(.*?)(\.com|\.de|\.co|\.app)')
    all_text = []
    
    # Initialize WebDriver
    driver = webdriver.Chrome()
    url = url
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

    # To store file with website name defining a regular expression pattern
    matches = PATTERN.findall(url)
    if matches:
        for match in matches:
            extracted_text = match[1]
    else:
        extracted_text = url

    # Store scraped data into a file
    output_file_path = "scraped_data/{}.csv".format(extracted_text)
    try:
        with open(output_file_path, 'w', encoding='utf-8') as file:
            # Create a CSV writer
            csv_writer = csv.writer(file)
            # Write each line of text as a separate row in the CSV file
            for line in filtered_list:
                csv_writer.writerow([line])
        print(f'Data has been successfully written to {output_file_path}')
    except Exception as e:
        print(f'Error writing to the file: {e}')

    # Close browser window
    driver.quit()

    return 'Done'



