from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from ordered_set import OrderedSet


# Initialize WebDriver
driver = webdriver.Chrome()
driver.get("https://v-tenet.vercel.app/")

# Use explicit wait for elements to be present in the DOM
wait = WebDriverWait(driver, 25)
wait.until(EC.presence_of_all_elements_located((By.TAG_NAME, 'body')))

# Fetch page source after the wait
data = driver.page_source
soup = BeautifulSoup(data, 'html.parser')

# Find all div tags
div_tags = soup.find_all('div')

# Initialize list to store all text content 
all_text = []

# Traverse through all the div tags and iterate through nested tags inside the div
for div_tag in div_tags:
    for nested_tag in div_tag.find_all(recursive=False):
        text = nested_tag.get_text(strip=True)
        all_text.append(text)

# To filter empty list or lines from fetched data
filtered_list = [item for item in all_text if item.strip() != '']
for i in range(len(filtered_list)):
    filtered_list[i] = filtered_list[i].replace('\n', '')

# Remove duplicate elements
filtered_list = list(OrderedSet(filtered_list))

# Store scraped data into a file
output_file_path = 'output.txt'
try:
    with open(output_file_path, 'w', encoding='utf-8') as file:
        for text in filtered_list:
            file.write(text + '\n')
    print(f'Data has been successfully written to {output_file_path}')
except Exception as e:
    print(f'Error writing to the file: {e}')

# Close browser windows
driver.quit()
