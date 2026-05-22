import { chromium } from "playwright";

const pageUrl = "http://localhost:3000/admin/availability";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });

await page.goto(pageUrl, { waitUntil: "networkidle", timeout: 120000 });

const gridcells = await page.locator('[role="gridcell"]').evaluateAll((cells) =>
  cells.map((cell) => ({
    text: cell.textContent?.trim() ?? "",
    hidden: cell.getAttribute("data-hidden"),
    outside: cell.getAttribute("data-outside"),
    disabled: cell.getAttribute("data-disabled"),
    className: cell.getAttribute("class") ?? "",
  }))
);

const weekdayText = await page.locator("thead").first().innerText().catch(() => "");
const title = await page.locator("h1").first().innerText().catch(() => "");

console.log(
  JSON.stringify(
    {
      title,
      weekdayText,
      cellCount: gridcells.length,
      first21Cells: gridcells.slice(0, 21),
      last21Cells: gridcells.slice(-21),
    },
    null,
    2
  )
);

await page.screenshot({ path: "C:/tmp/admin-availability.png", fullPage: true });
await browser.close();
