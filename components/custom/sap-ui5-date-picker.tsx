"use client";

import { useEffect, memo } from "react";
import { DatePicker } from "@ui5/webcomponents-react";
import "@ui5/webcomponents/dist/DatePicker.js";

// Cấu hình ngôn ngữ lịch
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js";
import {
  setLanguage,
  getLanguage,
} from "@ui5/webcomponents-base/dist/config/Language.js";

function SapUi5DatePicker({ value, onChange }) {
  useEffect(() => {
    // Kiểm tra ngôn ngữ hiện tại, chỉ set nếu chưa phải tiếng Việt

    console.log("getLanguage() === ", getLanguage());
    if (getLanguage() !== "vi") {
      setLanguage("vi");
    }
  }, []);

  return (
    <DatePicker
      formatPattern="dd/MM/yyyy"
      onChange={(e) => {
        const newDateStr = e.detail.value;
        const parts = newDateStr.split("/");
        const newDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`); // YYYY-MM-DD
        if (!isNaN(newDate.getTime())) {
          onChange(newDate);
        }
      }}
      primaryCalendarType="Gregorian"
      value={value.toLocaleDateString("vi-VN").replace(/\//g, "/")} // dd/MM/yyyy
    />
  );
}

export default memo(SapUi5DatePicker);
