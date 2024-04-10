import csv
import random

def read_csv_to_array_of_dicts(csv_file, limit=50):
    array_of_dicts = []
    with open(csv_file, 'r') as file:
        reader = csv.DictReader(file)
        for i, row in enumerate(reader):
            if i >= limit:
                break
            cleaned_row = {k: v for k, v in row.items() if k != ''}  # Remove entries with empty string keys
            cleaned_row['type'] = random.choice(['hot', 'cold'])  # Add 'type' key with random value
            cleaned_row['location'] = []  # Add 'location' key with empty list value
            array_of_dicts.append(cleaned_row)
    return array_of_dicts

def write_data_to_js(data, js_file):
    with open(js_file, 'w') as file:
        file.write("const warehouseDetails = ")
        file.write(str(data))

# Example usage:
csv_file = 'Registered Warehouses - WDRA.csv'
data = read_csv_to_array_of_dicts(csv_file, limit=50)

js_file = 'warehouse_details.js'
write_data_to_js(data, js_file)
