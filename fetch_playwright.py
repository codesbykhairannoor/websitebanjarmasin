import asyncio
from playwright.async_api import async_playwright
import urllib.request
import urllib.parse
import os

hotels = [
    ("Swiss-Belhotel Borneo Banjarmasin", "swiss_belhotel_borneo"),
    ("Summer Bed & Breakfast Banjarmasin", "summer_bed_breakfast"),
    ("Favehotel Banjarmasin", "favehotel_tendean"),
    ("Victoria Hotel River View Banjarmasin", "victoria_hotel_river_view"),
    ("Rattan Inn Banjarmasin", "rattan_inn_resort"),
    ("Galaxy Hotel Banjarmasin", "galaxy_hotel_banjarmasin")
]

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")
        page = await context.new_page()
        
        if not os.path.exists(r"d:\banjarmasinkota\public\panduan"):
            os.makedirs(r"d:\banjarmasinkota\public\panduan")
            
        for query, filename in hotels:
            try:
                print(f"Searching for {query}...")
                await page.goto(f"https://www.google.com/search?q={urllib.parse.quote(query + ' exterior')}&tbm=isch")
                await page.wait_for_selector("img.YQ4gaf", timeout=10000)
                
                # Get first image source
                img_element = await page.query_selector("img.YQ4gaf")
                src = await img_element.get_attribute("src")
                if not src:
                    src = await img_element.get_attribute("data-src")
                
                print(f"Found image for {query}")
                
                if src.startswith("data:image"):
                    response = urllib.request.urlopen(src)
                    with open(rf"d:\banjarmasinkota\public\panduan\{filename}.webp", "wb") as f:
                        f.write(response.read())
                    print(f"Saved Base64 for {query}")
                elif src.startswith("http"):
                    # Download image
                    req = urllib.request.Request(src, headers={'User-Agent': 'Mozilla/5.0'})
                    data = urllib.request.urlopen(req).read()
                    with open(rf"d:\banjarmasinkota\public\panduan\{filename}.webp", "wb") as f:
                        f.write(data)
                    print(f"Saved HTTP for {query}")
            except Exception as e:
                print(f"Failed for {query}: {e}")
                
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
