from json import loads, dump
from requests import get
from pprint import pprint
import re

id = 1

def generate_db():

    db_dict = {}
    memo = set()
    call_list = api_call("/api")
    for item in call_list:
        recursive(call_list[item], db_dict, memo)

    with open('db_json.json', 'w') as db_file:
        dump(db_dict, db_file)

    return 0

def recursive(url: str, db_dict: dict, memo: set):

    # base cases
    if url in memo: return

    memo.add(url)
    call_list = api_call(url)
    if call_list:
        if "results" in call_list:
            for item in call_list["results"]:
                recursive(item["url"], db_dict, memo)
        elif "desc" in call_list:
            temp_db_entry = {}
            for key in call_list:
                if key != "url":
                    temp_db_entry[key] = call_list[key]

            splits = re.split(r'/', call_list["url"])
            tags = []
            if len(splits) > 3:
                tags = splits[2:-1]
            temp_db_entry["type"] = tags
            temp_db_entry["src"] = ["PHB", "Player's Handbook"]

            global id
            temp_db_entry["id"] = id
            id += 1

            pprint(temp_db_entry)

            # input()
            db_dict[temp_db_entry["index"]] = {temp_db_entry["index"]}

def api_call(url):

    URL_PREFIX = "https://www.dnd5eapi.co"

    api_url = URL_PREFIX + url

    response = get(api_url)

    if response.status_code == 200:
        return loads(response.content.decode('utf-8'))
    else:
        return None

if __name__ == "__main__":
    generate_db()