from selenium import webdriver
import requests
from bs4 import BeautifulSoup


driver = webdriver.Chrome()
driver.get("https://www.cheapair.com/hotels/review?jsr=(bn:!n,corporateDiscountCode:%27%27,isPersonal:!f,nameNum:-1,occupantString:%272%27,paymentType:P,rateType:!n,rooms:!((arrives:%272024-01-02%27,chainCode:RT,departs:%272024-01-05%27,pricing:(currency:USD,rateUSD:85),propId:C9163,rateCode:%27240018861%27,rateKey:F~OjogZyQ0Nik2ZktnUVgdMGtXNzdjA2gLVlQNFAUFTghUc2wBBQtQTgRVFFQBLDBjaiFnbVcAVFACClsFAjwSVAxQAFdUUQQYDgYMVRkAUQFdHAxTAQJICgtWUVcBD1YIAwAGUTFUA1YADFYTMA0CWAkcNFW7NjhVoWI2BQNVAlKjNzwCEHFcEVVUA0J2BFSROE5iSkBMGEgEF1sQchMPXndQVkdKFxFdTwQTXBZ1QV4NEh1AE0MDDUVdFhwTDwJEbp9jNtY3OwpV_jg1Bl4EFwkBgjQ52TJnxDUx7DA19TFk-jBlxWcxy2EcVwNVUgUFDVYVAVVWBU4AXlAHS1UEAVBJVVFSUA1XUlUCUQBc1zd_A1EKVhoHChoAUzdTAQJRBV8CUxoKAlUFVQ8NDFRpimMzRQS8ZzLgzF2t,roomTypeCode:%27213001442%27,sourceSys:ER)),roomsId:0,searchId:300326429,shopRequest:(HSS:H,bn:!n,checkin:%272024-01-02%27,checkout:%272024-01-05%27,locId:CNCE,rms:%272%27))")

driver.implicitly_wait(25)

data = driver.page_source
soup = BeautifulSoup(data, 'html.parser')
div_texts = []

# Fetching text from all div tags and sub div tags 
body_divs = soup.body.find_all('div', recursive=True)  # Set recursive=False to only find direct children
for div in body_divs:
    # div_texts = list(div.text)
    div_texts.append(div_texts)
    list_items = div.find_all('li')
    print(list_items)
    if list_items:
        for li in list_items:
            div_texts.append(li)


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