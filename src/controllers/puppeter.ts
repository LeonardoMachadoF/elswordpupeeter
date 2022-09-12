import { Request, Response } from "express";
import puppeteer from 'puppeteer';

export const teste = async (req: Request, res: Response) => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://elsword.koggames.com/', {
        waitUntil: 'networkidle2'
    })

    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight)
        let items = document.querySelectorAll('.et_pb_text_inner p')
        console.log(items)
    })

    // await page.close();
    res.json({ status: true });
}