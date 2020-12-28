#!/usr/bin/env node
const pw = require('playwright');

(async () => {
  let browser = null;
  try {
    browser = await pw.chromium.launch();  // or 'firefox' or 'webkit'
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto('https://movie.jorudan.co.jp/cinema/broadcast/');
    const dateElems  = await page.$$('main > table.tvlist >> th:first-child');
    const metaElems  = await page.$$('main > table.tvlist >> td.tvdate');
    const titleElems = await page.$$('main > table.tvlist >> td.cf > div.detail > div.title');
    const length = Math.min(dateElems.length, metaElems.length, titleElems.length);
    
    const films = [];
    for(let i = 0; i < length; i++) {
      const dateElem  = dateElems[i];
      const metaElem  = metaElems[i];
      const titleElem = titleElems[i];
      const date  = await dateElem.innerText();
      const meta  = await metaElem.innerText();
      const title = await titleElem.innerText();
      films.push({ date, meta, title });
    }
    
    console.log(result);
  }
  catch(error) {
    console.error(error);
  }
  finally {
    if(browser) {
      await browser.close();
    }
  }
})();
