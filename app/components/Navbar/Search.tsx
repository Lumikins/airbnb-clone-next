"use client"

import { BiSearch } from "react-icons/bi";

const Search = () => {
  return ( 
    <div className="border-2 w-full py-1 md:w-auto rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold px-6">
          Anywhere
        </div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-2 flex-1 text-center">
          Any week
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex items-center gap-3">
          <div className="hidden sm:block">Add guests</div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default Search;