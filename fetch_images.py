import urllib.request
import urllib.parse
import json
import re
import os

hotels = [
    ("Swiss-Belhotel Borneo Banjarmasin exterior", "swiss_belhotel_borneo"),
    ("Summer Bed & Breakfast Banjarmasin exterior", "summer_bed_breakfast"),
    ("Favehotel Banjarmasin exterior", "favehotel_tendean"),
    ("Victoria Hotel River View Banjarmasin", "victoria_hotel_river_view"),
    ("Rattan Inn Banjarmasin", "rattan_inn_resort"),
    ("Galaxy Hotel Banjarmasin", "galaxy_hotel_banjarmasin")
]

def fetch_image(query, filename):
    url = "https://duckduckgo.com/i.js?l=us-en&o=json&q=" + urllib.parse.quote(query)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        html = urllib.request.urlopen("https://html.duckduckgo.com/html/?q=" + urllib.parse.quote(query)).read().decode('utf-8')
        m = re.search(r'vqd=([\d-]+)', html)
        if not m:
            print(f"Failed to get vqd for {query}")
            return
        vqd = m.group(1)
        
        search_url = f"https://duckduckgo.com/i.js?l=id-id&o=json&q={urllib.parse.quote(query)}&vqd={vqd}"
        req2 = urllib.request.Request(search_url, headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req2).read().decode('utf-8')
        data = json.loads(res)
        
        if 'results' in data and len(data['results']) > 0:
            img_url = data['results'][0]['image']
            print(f"Found {img_url} for {query}")
            
            # Download image
            img_req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
            img_data = urllib.request.urlopen(img_req).read()
            filepath = os.path.join(r"d:\banjarmasinkota\public\panduan", f"{filename}.webp")
            
            with open(filepath, 'wb') as f:
                f.write(img_data)
            print(f"Saved to {filepath}")
    except Exception as e:
        print(f"Error for {query}: {e}")

if not os.path.exists(r"d:\banjarmasinkota\public\panduan"):
    os.makedirs(r"d:\banjarmasinkota\public\panduan")

for h, f in hotels:
    fetch_image(h, f)
