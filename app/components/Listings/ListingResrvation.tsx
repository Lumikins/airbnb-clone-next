"use client"

import { Range } from "react-date-range"
import Button from "../Button"
import Calendar from "../Inputs/Calendar"

interface ListingReservationProps {
  price: number
  totalPrice: number
  onChangeDate: (value: Range) => void
  dateRange: Range
  onSubmit: () => void
  disabled?: boolean
  disabledDates: Date[]
}

const ListingReservation: React.FC<ListingReservationProps> = ({price, totalPrice, onChangeDate, onSubmit, dateRange, disabled, disabledDates}) => {
  return ( 
    <div className="bg-white rounded-xl overflow-hidden border-[1px] border-neutral-200">
      <div className="flex items-center gap-1 p-4">
        <div className="text-2xl font-semibold">
          € {price}
        </div>
        <div className="font-light text-neutral-600">
          night
        </div>
      </div>
      <hr />
      <Calendar value={dateRange} disabledDates={disabledDates} onChange={(value) => onChangeDate(value.selection)} />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onCLick={onSubmit} />
      </div>
      <div className="p-4 flex items-center justify-between text-lg font-semibold">
        <div>
          Total
        </div>
        <div>
          € {totalPrice}
        </div>
      </div>
    </div>
   );
}
 
export default ListingReservation;