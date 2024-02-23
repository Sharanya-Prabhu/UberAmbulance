import requests

def reset_ambulances():

    #Enter valid longitudes and latitudes to reset the ambulances to in place of the 0.0 placeholder values
    ambulances = [
        {"_id": "63e3e7a4c25e11eb762b78d0", "ambulanceId": "AMB001", "lng": 0.0, "lat": 0.0},
        {"_id": "63e3e7a5c25e11eb762b78d2", "ambulanceId": "AMB002", "lng": 0.0, "lat": 0.0},
        {"_id": "63e3e7a5c25e11eb762b78d4", "ambulanceId": "AMB003", "lng": 0.0, "lat": 0.0},
    ]
    # send a patch request to http://localhost:3000/ambulances/:id with the new location as the body

    for ambulance in ambulances:
        url = f"http://localhost:3000/ambulances/{ambulance['_id']}"
        data = {
            "location": {
                "type": "Point",
                "coordinates": [ambulance["lng"], ambulance["lat"]]   
            },
            "state": "idle",
        }
        response = requests.patch(url, json=data)
        if response.status_code == 200:
            print(f"Updated ambulance with id: {ambulance['_id']}")
        else:
            print(f"Failed to update ambulance with id: {ambulance['_id']}")


reset_ambulances() 