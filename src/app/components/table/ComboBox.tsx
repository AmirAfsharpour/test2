"use client"
import { useState, Fragment, useEffect } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid'
import { Drug } from '@/types/drug';



/* const drugs: Drug[] = [
  { id: 1, faName: "لوزارتان قرص 25 میلی گرم", enName: "LOSARTAN POTASSIUM 25MG TAB", code: "lo25", price: 6340, stock: 592 },
] */
interface ComboBoxInputProps {
  query: string;
/*   setQuery: React.Dispatch<React.SetStateAction<string>>;*/ 
  setQuery:(value: string) => void;
  drugs: Drug[]
  selected : Drug | null
  setSelected : (drug: Drug | null) => void
  isopen: boolean;
/*   setQuery: React.Dispatch<React.SetStateAction<string>>;*/ 
  setIsOpen:(value: boolean) => void;
}
export default function ComboBoxInput({ query, setQuery, drugs, selected, isopen ,setSelected ,setIsOpen }: ComboBoxInputProps) {
/* useEffect(() => {
  if (drugs.length === 1 && (!selected || selected.codeMelliDaroo !== drugs[0].codeMelliDaroo)) {
    setSelected(drugs[0]);
  }
  // هیچ کاری نکن اگر مقدار selected درست باشه یا drugs بیشتر از یکی باشه
}, [drugs.length]); */
const [test,setTest] = useState(true);

  
  //const [query, setQuery] = useState<string>('')

  /* const filteredDrugs =
    query === ''
      ? drugs
      : drugs.filter((drug) =>
        (drug.faName + drug.enName + drug.code)
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      ) */

  return (
    <div className="w-full flex flex-col items-end" dir="rtl">
      <Combobox  value={selected} onChange={setSelected}>
        <div className="relative w-full max-w-[120px] sm:max-w-[150px] md:max-w-xs">
          <Combobox.Input
            className="w-full border-2 border-[#82B1FF] text-right focus:scale-[1.02] duration-300 transition-all ease-in-out rounded-xl py-1 md:py-2 pl-8 md:pl-10 pr-2 md:pr-4 text-xs md:text-sm leading-5 text-gray-900 focus:outline-none focus:border-[#5C6BC0] placeholder:text-right h-6 md:h-8 lg:h-10 shadow-lg focus:shadow-xl bg-white"
            value={selected ? selected.ename : query} // 👈 باعث میشه متن تایپ‌شده باقی بمونه
  displayValue={(drug: Drug | null) => selected ? selected.ename : query}
  onChange={e => setQuery(e.target.value)}
  placeholder="نام دارو..."
  autoComplete="off"

            //value={query}
          />
          
          <Combobox.Button as='button' /* onClick={() => setIsOpen(!isopen)} */  className="absolute inset-y-0 left-0 flex items-center pl-1 md:pl-2">
            <ChevronUpDownIcon className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-[#82B1FF]" />
          </Combobox.Button>
 { /* (isopen || drugs.length > 1) */ true &&
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterEnter={() => setIsOpen(true)}
            afterLeave={() => setIsOpen(false)}
          >
           
            <Combobox.Options
              className="
                absolute right-0 mt-2 
                sm:scale-[0.8] sm:mt-0 sm:w-[600px]
                md:scale-[0.8] md:mt-2 md:w-[600px]
                lg:scale-[1] lg:mt-6 lg:w-[700px]
                xl:scale-[1.2] xl:mt-8 
                scal-[0.6]
                min-w-[400px]
                w-fit 
                z-[9999] bg-white rounded-xl shadow-2xl max-h-60 md:max-h-80 overflow-auto border border-gray-200 text-xs md:text-sm 
                "
                >
              {/* w-[350px] sm:w-[400px] md:w-[550px] lg:w-[680px] xl:w-[680px] max-w-[800px] min-w-[350px] */}
              <div>
               {drugs.length === 0 && query !== '' ? (
                  ''//<div className="px-4 py-2 text-gray-700 text-xs md:text-sm">دارویی پیدا نشد.</div>
                ) : ( <div className="flex items-center gap-2 px-2 py-1 border-b bg-[#3D5AFE] text-white font-bold sticky top-0 z-10 text-xs md:text-sm">
                  <span className="w-6 md:w-8 lg:w-12">ردیف</span>
                  <span className="flex-1  sm:block whitespace-nowrap">نام انگلیسی</span>
                  <span className="flex-1 whitespace-nowrap">نام فارسی</span>
                  <span className="w-8 md:w-12 lg:w-16 text-center ml-3">موجودی</span>
                  <span className="w-12 md:w-16 lg:w-20 text-center md:block">قیمت آزاد</span>
                  <span className="w-12 md:w-12 lg:w-12 text-center whitespace-nowrap ">کد مجازی</span>
                </div> )}
                
               
                {drugs.length === 0 && query !== '' ? (
                  ''//<div className="px-4 py-2 text-gray-700 text-xs md:text-sm">دارویی پیدا نشد.</div>
                ) : (
                  drugs.map((drug, index) => (
                    <Combobox.Option
                      key={index}
                      value={drug}
                      className={({ active }) =>
                        "flex items-center gap-2 px-2 py-2 cursor-pointer select-none shadow-sm last:border-none z-40 text-xs md:text-sm " +
                        (active ? "bg-blue-100 shadow-xl transition-all duration-200 ease-in-out text-blue-900" : "")
                      }
                    >
                      {({ selected: isSelected }) => (
                        <>
                          <span className="w-6 md:w-8 lg:w-12">{index+1}</span>
                          <span className="flex-1 text-xs text-black  sm:block  overflow-hidden text-ellipsis">{drug.ename}</span>
                          <span className="flex-1 overflow-hidden text-ellipsis">{drug.fname}</span>
                          <span className="w-8 md:w-12 lg:w-16 ml-3 text-center">{drug.quantity}</span>
                          <span className="w-12 md:w-16 lg:w-20 text-center text-black md:block">{drug.freePrice}</span>
                          <span className="w-12 md:w-12 lg:w-12">{drug.virualCodeDaroo || '-'}</span>
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </div>
            </Combobox.Options>
            
          </Transition>
           }
        </div>
      </Combobox>
    </div>
  )
}