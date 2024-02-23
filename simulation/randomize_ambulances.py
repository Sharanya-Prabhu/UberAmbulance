import random
import requests
import math

# Around starting location in 10km radius place 15 ambulances
# Enter valid latitute and longitude of the starting location in place of the placeholder zero values
currLat,currLng = 0.0, 0.0
radius = 10000
numAmbulances = 15

# Get all ambulances
response = requests.get("http://localhost:3000/ambulances")
if response.status_code != 200:
    print("Failed to get ambulances")
    exit(1)

# Delete all ambulances
for ambulance in response.json()['data']['ambulances']:
    response = requests.delete(f"http://localhost:3000/ambulances/{ambulance['_id']}")
    if response.status_code == 204:
        print(f"Deleted ambulance with id: {ambulance['_id']}")
    else:
        print(f"Failed to delete ambulance with id: {ambulance['_id']}")

# Create new ambulances
for i in range(numAmbulances):
    lat = currLat + (random.random() - 0.5) * radius / 111300
    lng = currLng + (random.random() - 0.5) * radius / (111300 * math.cos(math.radians(currLat)))

    ambulance = {
        "ambulanceId": f"AMB{i+1}",
        "location": {
            "type": "Point",
            "coordinates": [lng, lat]
        },
        "state": "idle"
    }
    response = requests.post("http://localhost:3000/ambulances", json=ambulance)
    
    if response.status_code == 201:
        print(f"Created ambulance with id: {response.json()['data']['ambulance']['_id']}")
    else:
        print(f"Failed to create ambulance with id: {ambulance['_id']}")
