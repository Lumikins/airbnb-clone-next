"use client"

import Container from "@/app/components/Container";
import ListingHead from "@/app/components/Listings/ListingHead";
import ListingInfo from "@/app/components/Listings/ListingInfo";
import ListingReservation from "@/app/components/Listings/ListingResrvation";
import { categories } from "@/app/components/Navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeUser, SafeReservation } from "@/app/types";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { toast } from "react-hot-toast";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection"
}

interface ListingClientProps {
  reservations?: SafeReservation[]
  listing: SafeListing & {
    user: SafeUser
  }
  currentUser?: SafeUser | null
}

const ListingClient: React.FC<ListingClientProps> = ({reservations = [], listing, currentUser}) => {
  const loginModal = useLoginModal()
  const router = useRouter()
  const disabledDates = useMemo(() => {
    let dates: Date[] = []
    // iterate over the reservation and create a range of dates between start and end dates
    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      })
      dates = [...dates, ...range]
    })
    return dates
  },[reservations])

  const [isLoading, setIsLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(listing.price)
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)

  const onCreateReservation = useCallback(()=> {
    if(!currentUser) return loginModal.onOpen()
    setIsLoading(true)
    axios.post("/api/reservations", {
      listingId: listing?.id, startDate: dateRange.startDate, endDate: dateRange.endDate, totalPrice,
    })
    .then(() => {
      toast.success("Listing reserved!")
      setDateRange(initialDateRange)
      router.push("/trips")
    })
    .catch(() => {
      toast.error("Listing not saved")
    })
    .finally(() => {
      setIsLoading(false)
    })
  },[currentUser, loginModal, listing?.id, dateRange, totalPrice, router])

  // whenever there is a change in the calendar, we check how many days were selected and multiply by the listing price per day. if there are no selected dates, only a single day price will be displayed
  useEffect(() => {
    if(dateRange.startDate && dateRange.endDate){
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      )
      dayCount && listing.price ? setTotalPrice(dayCount * listing.price) : setTotalPrice(listing.price)
      // if(dayCount && listing.price){
      //   setTotalPrice(dayCount * listing.price)
      // } else {
      //   setTotalPrice(listing.price)
      // }
    }
  },[dateRange, listing.price])

  const category = useMemo(() => {
    return categories.find((item) => 
      item.label === listing.category)
  }, [listing.category])

  return ( 
    <Container>
      <div className="max-w-screen-lg mx-3 lg:mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead title={listing.title} imageSrc={listing.imageSrc} locationValue={listing.locationValue} id={listing.id} currentUser={currentUser} />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo user={listing.user} category={category} description={listing.description} roomCount={listing.roomCount} bathroomCount={listing.bathroomCount} guestCount={listing.guestCount} locationValue={listing.locationValue} />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation price={listing.price} totalPrice={totalPrice} onChangeDate={(value) => setDateRange(value)} dateRange={dateRange} onSubmit={onCreateReservation} disabled={isLoading} disabledDates={disabledDates} />
            </div>
          </div>
        </div>
      </div>
    </Container>
   );
}
 
export default ListingClient;