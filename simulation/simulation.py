import requests
import googlemaps
import time

def get_ambulance_location(ambulance_id):
    # Query the API to get the ambulance location
    url = "http://localhost:3000/ambulances/getone/{}".format(ambulance_id)
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()["data"]["ambulance"]["location"]["coordinates"]
    else:
        raise Exception("Unable to get ambulance location")

def update_ambulance_location(ambulance_id, location):
    # Update the ambulance location on the API
    url = "http://localhost:3000/ambulances/{}".format(ambulance_id)
    payload = {
        
        "location": {
            "type": "Point",
            "coordinates": location
        }       
    }

    print(payload)
    response = requests.patch(url, json=payload)
    if response.status_code != 200:
        raise Exception("Unable to update ambulance location")

def get_directions(origin, destination, api_key):
    # Use Google Maps API to get the directions
    gmaps = googlemaps.Client(key=api_key)
    directions = gmaps.directions(origin, destination, mode="driving")
    return directions[0]["legs"][0]["steps"]

def simulate_ambulance_movement(ambulance_id, destination_lat, destination_lng):
    speed = 60  # 60 meters per second
    time_step = 1  # 1 second
    dist_step = speed * time_step  # 60 meters
    api_key = ""  # Enter API key here

    # Get the ambulance location
    ambulance_location = get_ambulance_location(ambulance_id)
    origin = (ambulance_location[1], ambulance_location[0])
    destination = (destination_lat, destination_lng)
    
    # Get the directions to the destination
    steps = get_directions(origin, destination, api_key)
    
    # Simulate the ambulance movement
    for step in steps:

        # move dist_step/distance part of the step 
        start = step["start_location"]
        current = start
        destination = step["end_location"]

        while current != destination:

            next_lat = current["lat"] + (destination["lat"] - start["lat"]) * dist_step / step["distance"]["value"]
            # next_lat must be between current["lat"] and destination["lat"]
            if next_lat > destination["lat"] and next_lat > current["lat"] or next_lat < destination["lat"] and next_lat < current["lat"]:
                next_lat = destination["lat"]

            next_lng = current["lng"] + (destination["lng"] - start["lng"]) * dist_step / step["distance"]["value"]
            # next_lng must be between current["lng"] and destination["lng"]
            if next_lng > destination["lng"] and next_lng > current["lng"] or next_lng < destination["lng"] and next_lng < current["lng"]:
               next_lng = destination["lng"]    
        
            current = {"lat": next_lat, "lng": next_lng}
            step_location = [next_lng, next_lat]

            update_ambulance_location(ambulance_id, step_location)
            time.sleep(time_step)
        print("Step completed")

if __name__ == "__main__":
    
    ambulance_id = input("Enter ambulance id: ")
    destination_lat = float(input("Enter destination latitude: "))
    destination_lng = float(input("Enter destination longitude: "))

    
    simulate_ambulance_movement(ambulance_id, destination_lat, destination_lng)
