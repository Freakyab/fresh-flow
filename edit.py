import csv
import random
from opencage.geocoder import OpenCageGeocode

def generate_random_email(name):
    domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'example.com']  # Add more domains if needed
    name_parts = name.lower().split()
    username = ''.join(name_parts) + str(random.randint(1, 999))
    domain = random.choice(domains)
    return f"{username}@{domain}"

def read_csv_to_array_of_dicts(csv_file, limit=349):
    array_of_dicts = []
    count_variable = 0
    with open(csv_file, 'r') as file:
        reader = csv.DictReader(file)
        for i, row in enumerate(reader):
            if i >= limit:
                break
            cleaned_row = {k: v for k, v in row.items() if k != ''}  # Remove entries with empty string keys
            
            # Add 'type' key with random value
            cleaned_row['type'] = random.choice(['hot', 'cold'])  
            cleaned_row['image'] = "/images/warehouse_1.jpg"
            lat_lng = cleaned_row.pop('location', '').split(',')
            cleaned_row['location'] = [float(lat_lng[0]), float(lat_lng[1])]
            cleaned_row['price'] = random.randint(1000, 5000)
            
            # Add random email using name
            cleaned_row['email'] = generate_random_email(cleaned_row['name'])
         
            array_of_dicts.append(cleaned_row)
            count_variable += 1
    print(count_variable)
    return array_of_dicts

def write_data_to_js(data, js_file):
    with open(js_file, 'w') as file:
        file.write("const warehouseDetailData = ")
        file.write(str(data))

if __name__ == "__main__":
    csv_file = 'Registered Warehouses - WDRA.csv'
    data = read_csv_to_array_of_dicts(csv_file, limit=349)

    js_file = 'warehouse_details.js'
    write_data_to_js(data, js_file)
