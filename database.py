import json

def save_data(data):
    with open("productivity.json", "w") as f:
        json.dump(data, f, indent=4)

    print("\nData saved to productivity.json")