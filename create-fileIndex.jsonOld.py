import os
import json
import random

def generate_file_index():
    # Specify the files to exclude
    exclude_files = {"fileIndex.json", "manifest.json"}
    
    # Get all .json files in the current folder except the excluded ones
    json_files = [
        file for file in os.listdir(".") 
        if file.endswith(".json") and file not in exclude_files
    ]
    
    # Write the JSON file
    with open("fileIndex.json", "w") as f:
        json.dump(json_files, f, indent=2)

    print(f"File index created with {len(json_files)} files, excluding {exclude_files}.")

def merge_json_files():
    # Read fileIndex.json to get the list of JSON files
    try:
        with open("fileIndex.json", "r") as f:
            file_index = json.load(f)
    except FileNotFoundError:
        print("Error: fileIndex.json not found. Please run the file index generator first.")
        return

    # Initialize a set to hold unique video IDs
    unique_video_ids = set()

    # Iterate through the files in fileIndex.json
    for json_file in file_index:
        try:
            with open(json_file, "r") as f:
                data = json.load(f)
                # Add video IDs to the set, ensuring uniqueness
                unique_video_ids.update(data)
        except (FileNotFoundError, json.JSONDecodeError) as e:
            print(f"Error reading {json_file}: {e}")

    # Convert the set to a list and shuffle the contents
    video_id_list = list(unique_video_ids)
    random.shuffle(video_id_list)

    # Write the shuffled list to videoIds-EnglishAll.json
    with open("videoIds-EnglishAll.json", "w") as f:
        json.dump(video_id_list, f, indent=2)

    print(f"videoIds-EnglishAll.json created with {len(video_id_list)} unique video IDs.")

if __name__ == "__main__":
    # Step 1: Generate fileIndex.json
    generate_file_index()
    
    # Step 2: Merge JSON files into videoIds-EnglishAll.json
    merge_json_files()

