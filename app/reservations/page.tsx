import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import EmptyState from "../components/EmptyState";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async() => {
  const currentUser = await getCurrentUser()
  if(!currentUser) return (
    <EmptyState title="Unathorized" subtitle="Please login" />
  )
  const reservations = await getReservations({
    authorId: currentUser.id
  })
  if(reservations.length === 0) return (
    <EmptyState title="No reservation found" subtitle="It looks like you have no reservations for your properties" />
  )
  return (
    <ReservationsClient reservations={reservations} currentUser={currentUser} />
  )
}

export default ReservationsPage