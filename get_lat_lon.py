from opencage.geocoder import OpenCageGeocode

def get_lat_lon(location_name):
    # Replace 'YOUR_API_KEY' with your actual API key from OpenCage Geocoding API
    # You can sign up for a free API key at: https://opencagedata.com
    api_key = 'aaca8815d8cc4927a89fbf3eb41d2b3f'
    geocoder = OpenCageGeocode(api_key)
    
    # Perform geocoding for the given location name
    results = geocoder.geocode(location_name)
    
    if results and len(results):
        # Extract latitude and longitude from the first result
        lat = results[0]['geometry']['lat']
        lng = results[0]['geometry']['lng']
        return lat, lng
    else:
        return None, None

if __name__ == "__main__":
    location_name = input("Enter the location name: ")
    latitude, longitude = get_lat_lon(location_name)
    if latitude is not None and longitude is not None:
        print(f"Latitude: {latitude}, Longitude: {longitude}")
    else:
        print("Location not found.")
