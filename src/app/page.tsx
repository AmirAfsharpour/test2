import PersianDatePicker from "@/app/components/inputs/DatePicker";
import ComboBoxInput from "@/app/components/table/ComboBox";
import BarcodeWhite from "@/images/barcode-white.svg"
import BarcodeBlue from '@/images/barcode-Blue.svg';
import Table from "@/app/components/table/Table";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center w-full min-h-screen p-2 sm:p-4">
        <div className="responsive-table mobile-table-container w-full relative">
          <Table/>
        </div>
      </div>
    </>
  );
}
