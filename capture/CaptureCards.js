const puppeteer = require('puppeteer');
const sharp = require('sharp');

async function captureScreenshot(pageUrl, tempPath, savePath) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(pageUrl, { waitUntil: 'networkidle0' }); // ページのURLを適切に設定

    // ページ全体のスクリーンショットを取る
    //await page.screenshot({ path: savePath });

    const element = await page.$('#woodCard'); // IDで要素を選択
    await element.screenshot({ path: tempPath, omitBackground: true });

    await browser.close();

    //sharpを用いて画像を正方形に
    const metadata = await sharp(tempPath).metadata();
    if (metadata.width < 800) {
        await sharp(tempPath)
            .extend({
                top: 0,
                bottom: 0,
                left: (800 - metadata.width) / 2,
                right: (800 - metadata.width) /2,
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            })
            .toFormat('png')
            .toFile(savePath);
    }
}

(async () => {
    for (let i = 1; i <= 498; i++) {
        const pageUrl = `http://localhost:3000/woodnft-demo#/CardCapture/${i}`;
        const savePath = `saveCard/${i}.png`;
        const tempPath = `temp.png`

        await captureScreenshot(pageUrl, tempPath, savePath);
        console.log(`Captured ${i}`);
    }
})();
