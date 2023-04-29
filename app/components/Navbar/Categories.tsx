"use client"

import { usePathname, useSearchParams } from "next/navigation"
// import { GiWindmill } from "react-icons/gi"
// import { MdOutlineVilla } from "react-icons/md"
// import { TbBeach } from "react-icons/tb"
import CategoryBox from "../CategoryBox"
import Container from "../Container"
import {data} from "../../data/categories"

// export const categories = [
//   {
//     label: "Beach",
//     icon:TbBeach,
//     description: "This property is close to the beach"
//   },
//   {
//     label: "Windmills",
//     icon: GiWindmill,
//     description: "This property has windmills"
//   },
//   {
//     label: "Modern",
//     icon: MdOutlineVilla,
//     description: "This property is modern"
//   },
// ]

const Categories = () => {
  const params = useSearchParams()
  const category = params?.get("category")
  const pathname = usePathname()
  const isMainPage = pathname === "/"

  if(!isMainPage) return null

  return ( 
    <Container>
      <div className="flex pt-4 items-center justify-between overflow-x-auto">
        {data.map((item) => (
            <CategoryBox key={item.label} label={item.label} selected={category === item.label} icon={item.icon} />
          ))}
      </div>
    </Container>
   );
}
 
export default Categories;