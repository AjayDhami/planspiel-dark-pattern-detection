from selenium import webdriver
import requests
from bs4 import BeautifulSoup


driver = webdriver.Chrome()
driver.get("https://v-tenet.vercel.app/")

driver.implicitly_wait(25)

data = driver.page_source
soup = BeautifulSoup(data, 'html.parser')
div_texts = []

# Fetching text from all div tags and sub div tags 
body_divs = soup.body.find_all('div', recursive=True)  # Set recursive=False to only find direct children
div_texts = [div.text for div in body_divs]


# To filter empty list or lines from fetched data
filtered_list = [item for item in div_texts if item.strip() != '']
for i in range(len(filtered_list)):
    filtered_list[i] = filtered_list[i].replace('\n', '')

# Remove duplicate elements
filtered_list = list(set(filtered_list))
# print(filtered_list)

# Store scraped data into a file
output_file_path = 'output.txt'
with open(output_file_path, 'w', encoding='utf-8') as file:
    for text in filtered_list:
        file.write(text + '\n')

print(f'Data has been successfully written to {output_file_path}')

# Close browser window
driver.quit()