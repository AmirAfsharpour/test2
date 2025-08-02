"use client"
import React, { useState } from "react"
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import weekends from "react-multi-date-picker/plugins/highlight_weekends"
import Icon from "react-multi-date-picker/components/icon"
import "react-multi-date-picker/styles/layouts/mobile.css"
interface DatePickerProps {
  Date: string;
  /* setDate: React.Dispatch<React.SetStateAction<string>>; */
  setDate : (value: string) => void;
}
export default function PersianDatePicker({Date, setDate}: DatePickerProps) {
  //const [value, setValue] = useState()

  const handleBuyDate = (e: any) => {
    setDate(`${e?.year}/${e?.month.number.toString().padStart(2, '0')}/${e?.day.toString().padStart(2, '0')}`);
  }

  const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

  return (
    <>
      <button
        style={{ zIndex: "999" }}
        className="rounded-lg cursor-pointer hover:scale-[1.02] transition-all ease-in-out duration-100 bg-[#3D5AFE] w-8 md:w-10 lg:w-12 h-6 md:h-8 lg:h-10 p-1 md:p-2 flex items-center justify-center shadow-lg hover:shadow-xl"
      >
        <DatePicker
          render={<Icon className="text-white p-0 m-0 w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />}
          plugins={[weekends()]}          
          value={Date}
          onChange={(e) => handleBuyDate(e)}
          weekDays={weekDays}
          style={{ width: '100%' }}
          containerStyle={{ width: 'fit-content', zIndex: '999' }}          
          //id="datepicker1"
          portal
          inputClass=""
          calendar={persian}
          placeholder=""
          /* maxDate={serverTime?.fa} */
          locale={persian_fa}
          //calendarPosition="right"
          editable={true}
          className="rmdp-mobile"
          format="YYYY/MM/DD"
        >

        </DatePicker>
      </button>
    </>
  );
}