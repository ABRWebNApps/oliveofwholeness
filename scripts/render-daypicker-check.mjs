import React from "react";
import ReactDOMServer from "react-dom/server";
import { DayPicker } from "react-day-picker";

const html = ReactDOMServer.renderToStaticMarkup(
  React.createElement(DayPicker, {
    month: new Date(2026, 4, 1),
    fixedWeeks: true,
    showOutsideDays: true,
    mode: "single",
    classNames: {
      months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
      month: "space-y-4",
      month_caption: "flex justify-center pt-1 relative items-center mb-4",
      caption_label: "text-base font-semibold",
      nav: "space-x-1 flex items-center",
      month_grid: "w-full border-collapse space-y-1",
      weekdays: "flex",
      weekday:
        "text-muted-foreground rounded-md w-12 font-medium text-[0.85rem] uppercase tracking-wider",
      week: "flex w-full mt-2",
      day: "relative p-0 text-center text-sm",
      day_button: "h-10 w-10 p-0 font-normal rounded-xl",
      outside:
        "outside text-muted-foreground/30 opacity-50 aria-selected:bg-accent/30 aria-selected:text-muted-foreground aria-selected:opacity-30",
      hidden: "invisible",
    },
  })
);

const dayButtonTexts = [...html.matchAll(/<button[^>]*>(.*?)<\/button>/g)].map(
  (match) => match[1]
);

console.log(
  JSON.stringify(
    {
      buttonCount: dayButtonTexts.length,
      first14: dayButtonTexts.slice(0, 14),
      last14: dayButtonTexts.slice(-14),
      hasSaturday2: dayButtonTexts.includes("2"),
      htmlSnippet: html.slice(0, 3000),
    },
    null,
    2
  )
);
