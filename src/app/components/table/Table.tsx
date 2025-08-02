"use client"
import React, { useEffect, useState } from 'react'
import PersianDatePicker from '../inputs/DatePicker'
import ComboBoxInput from './ComboBox'
import { Search } from '../../../Services/searchService'
import type { Drug } from '../../../types/drug' // ✅ اینجا اصلاح شد
import BarcodeScannerModal from "../modals/scanner/BarcodeScannerModal";
type TableRow = {
  selectedDate: string;
  quantity: string;
  searchInput: string;
  isOpenCombo : boolean;
  drug: Drug | null;
};

function Table() {
  const [rows, setRows] = useState<TableRow[]>([
    { selectedDate: '1404/05/07', quantity: '', searchInput: '', isOpenCombo : false, drug: null }
  ]);
  const [results, setResults] = useState<Drug[]>([]);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const [barcodeRowIndex, setBarcodeRowIndex] = useState<number | null>(null);
 /*  const handleRowChange = (index: number, key: keyof TableRow, value: any) => {
    setRows(prevRows => {
      const updated = [...prevRows];
      updated[index][key] = value;
      return updated;
    });
  }; */
function handleRowChange<K extends keyof TableRow>(
  index: number,
  key: K,
  value: TableRow[K]
) {
  setRows(prevRows => {
    const updated = [...prevRows];
    updated[index][key] = value;
    return updated;
  });
}
  const handleDrugSelect = (index: number, drug: Drug | null) => {
    setRows(prevRows => {
      const updated = [...prevRows];
      updated[index].drug = drug;
      if (index === prevRows.length - 1 && drug) {
        updated.push({
          selectedDate: '1404/05/07',
          quantity: '',
          searchInput: '',    
          isOpenCombo : false,
          drug: null,
        });
      }
      return updated;
    });
  };

  useEffect(() => {
    const lastRow = rows[rows.length - 1];
    if (lastRow.searchInput.length < 3) return;

    if (typingTimeout) clearTimeout(typingTimeout);

    const timeout = setTimeout(async () => {
      const data = await Search(lastRow.searchInput);
      setResults(Array.isArray(data.result) ? data.result : []);
    }, 1000);

    setTypingTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [rows[rows.length - 1].searchInput]);

  /* useEffect(() => {
    console.log("here")
    if (results.length === 1) {
      const lastRow = rows[rows.length - 1];
      console.log("here")
      lastRow.drug = results[0]
      lastRow.searchInput = results[0].ename
      console.log(`last row darug : ${lastRow.drug}`)
    }
  }, [results]) */

useEffect(() => {
  const lastRowIndex = rows.length - 1;
  const lastRow = rows[lastRowIndex];

  // اگر فقط یک نتیجه هست و هنوز دارو انتخاب نشده
  if (
    results.length === 1 &&
    !lastRow.drug &&
    lastRow.searchInput.length >= 3
  ) {
    handleDrugSelect(lastRowIndex, results[0]);
    // همچنین مقدار سرچ رو هم با نام دارو پر کن (اگه دوست داشتی)
    // handleRowChange(lastRowIndex, "searchInput", results[0].ename);
  }
  // دقت کن dependencies درست باشه!
}, [results]);
  return (
    <>
      <table className="rtl border-collapse w-full max-w-6xl table-auto shadow-2xl scale-[0.7]  text-center rounded-2xl">
        <thead>
          <tr className="shadow-lg">
            <th className="dpn-tbl-header rounded-tl-[10px] ">تاریخ انقضا</th>
            <th className="dpn-tbl-header">تعداد</th>
            <th className="dpn-tbl-header">کدملی دارو</th>
            <th className="dpn-tbl-header">نام کالا</th>
            <th className="dpn-tbl-header rounded-tr-[10px]">ردیف</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className={`dpn-tbl-row relative ${row.isOpenCombo ? 'z-[1]':''}`}>
              <td className="dpn-tbl-detail">
                <div className="flex flex-col sm:flex-row justify-center gap-1 items-center min-w-0">
                  <input
                    className="

                border-[#82B1FF] border-2 min-w-20 rounded-xl w-full max-w-20 sm:max-w-24 md:max-w-32 lg:max-w-44 p-1 md:p-2 text-center shadow-lg focus:outline-none focus:shadow-xl focus:scale-[1.02] focus:border-[#5C6BC0] transition-all duration-300 ease-in-out text-xs md:text-sm lg:text-base h-8 md:h-8 lg:h-10 bg-white"
                    type="text"
                    autoComplete='off'
                    value={row.selectedDate}
                    onChange={e => handleRowChange(idx, "selectedDate", e.target.value)}
                  />
                  <PersianDatePicker Date={row.selectedDate} setDate={date => handleRowChange(idx, "selectedDate", date)} />
                </div>
              </td>

              <td className="dpn-tbl-detail">
                <input
                  type="text"
                  className="border-[#82B1FF] border-2 min-w-8 rounded-xl w-16 sm:w-20 md:w-24 lg:w-28 placeholder:text-xs md:placeholder:text-sm lg:placeholder:text-base p-1 md:p-2 text-center shadow-lg focus:outline-none focus:shadow-xl focus:scale-[1.02] focus:border-[#5C6BC0] transition-all duration-300 ease-in-out h-6 md:h-8 lg:h-10 bg-white"
                  placeholder="تعداد"
                  value={row.quantity}
                  onChange={e => handleRowChange(idx, "quantity", e.target.value)}
                />
              </td>

              <td className="dpn-tbl-detail text-xs sm:text-sm">{row.drug?.codeMelliDaroo ?? '-'}</td>

              <td className="dpn-tbl-detail">
                <div className="flex flex-col sm:flex-row justify-center items-center w-full gap-1 sm:gap-2 z-40 min-w-0">
                  <button onClick={() => setBarcodeRowIndex(idx)} className="rounded-lg cursor-pointer hover:scale-[1.02] transition-all ease-in-out duration-100 bg-[#3D5AFE] w-8 md:w-10 lg:w-12 h-6 md:h-8 lg:h-10 p-1 md:p-2 flex items-center justify-center shadow-lg hover:shadow-xl">
                    <img src="/barcode-white.svg" alt="" width={25} height={25} className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-9 lg:h-9" />
                  </button>
                  <ComboBoxInput                    
                    query={row.searchInput}
                    setQuery={value => handleRowChange(idx, "searchInput", value)}
                    setIsOpen={value => handleRowChange(idx, "isOpenCombo", value)}
                    drugs={results}
                    selected={row.drug}
                    isopen={row.isOpenCombo}
                    setSelected={(drug) => handleDrugSelect(idx, drug)}
                  />
                </div>
              </td>

              <td className="dpn-tbl-detail text-xs sm:text-sm">{idx + 1}</td>
            </tr>))}
        </tbody>
      </table>
      {barcodeRowIndex !== null && (
        <BarcodeScannerModal
          onClose={() => setBarcodeRowIndex(null)}
          onDetected={(code) => {
            handleRowChange(barcodeRowIndex, "searchInput", code);
            setBarcodeRowIndex(null);
          }}
        />
      )}
    </>
  );
}

export default Table;