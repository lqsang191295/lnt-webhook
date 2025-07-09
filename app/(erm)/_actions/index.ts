// server actions
"use server";

import puppeteer from "puppeteer";
import { chromium } from "playwright";
import { writeFile } from "fs/promises";
import { join } from "path";

export const convertHtmlToPdf = async (html: string) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      // args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    console.log("PDF generated successfully", pdfBuffer);

    // Trả về string Base64 thay vì Response
    const zipBase64 = Buffer.from(pdfBuffer).toString("base64");

    return zipBase64;
  } catch (error) {
    console.error("Error generating PDF:", error);
    return "";
  }
};

export async function convertHtmlToPdfAction(html: string) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: "networkidle" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await browser.close();

  // Nếu bạn muốn trả file trực tiếp (ví dụ từ API Route), thì return pdfBuffer
  // Nhưng với Server Actions, bạn nên ghi file ra public folder tạm thời
  const fileName = `converted_${Date.now()}.pdf`;
  const filePath = join(process.cwd(), "public", fileName);
  await writeFile(filePath, pdfBuffer);

  return `/` + fileName; // Trả về URL public để client download
}
