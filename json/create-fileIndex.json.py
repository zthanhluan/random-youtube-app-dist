import os
import json

def generate_file_index():
    # Specify the files to exclude
    exclude_files = {"fileIndex.json"}
    
    # Get all .json files in the current folder except the excluded ones
    json_files = [
        file for file in os.listdir("./") 
        if file.endswith(".json") and file not in exclude_files
    ]
    
    # Write the JSON file
    with open("fileIndex.json", "w") as f:
        json.dump(json_files, f, indent=2)

    print(f"File index created with {len(json_files)} files, excluding {exclude_files}.")

if __name__ == "__main__":
    generate_file_index()
