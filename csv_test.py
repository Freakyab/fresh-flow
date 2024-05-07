import csv
import random
from opencage.geocoder import OpenCageGeocode

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
            
            # Geocode location name and add latitude and longitude
            latitude, longitude = get_lat_lon(cleaned_row.get('name', ''))
            if latitude is not None and longitude is not None:
                print(count_variable)
                cleaned_row['location'] = [latitude, longitude]  # Update location to [lat, lng] format
                array_of_dicts.append(cleaned_row)
                count_variable = count_variable + 1
    print(count_variable)
    return array_of_dicts

def write_data_to_js(data, js_file):
    with open(js_file, 'w') as file:
        file.write("const warehouseDetails = ")
        file.write(str(data))

# Function to geocode location name
def get_lat_lon(location_name):
    api_key = 'aaca8815d8cc4927a89fbf3eb41d2b3f'
    geocoder = OpenCageGeocode(api_key)
    
    results = geocoder.geocode(location_name)
    
    if results and len(results):
        lat = results[0]['geometry']['lat']
        lng = results[0]['geometry']['lng']
        return lat, lng
    else:
        return None, None

if __name__ == "__main__":
    csv_file = 'Registered Warehouses - WDRA.csv'
    data = read_csv_to_array_of_dicts(csv_file, limit=349)

    js_file = 'warehouse_details.js'
    write_data_to_js(data, js_file)
