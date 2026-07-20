const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    page.on('pageerror', err => {
      console.log('PAGE_ERROR:', err.message);
    });
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('CONSOLE_ERROR:', msg.text());
      }
    });

    console.log('Navigating to http://localhost:3000/en...');
    await page.goto('http://localhost:3000/en', { waitUntil: 'networkidle0' });
    console.log('Page loaded successfully. Checking content...');
    
    const content = await page.content();
    if (content.includes('This page couldn\'t load')) {
      console.log('FOUND NEXTJS ERROR SCREEN!');
    } else {
      console.log('NO ERROR SCREEN FOUND. PAGE RENDERED NORMALLY.');
    }
    
    await browser.close();
  } catch (err) {
    console.error('SCRIPT_ERROR:', err);
  }
})();
