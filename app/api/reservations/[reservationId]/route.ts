import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  reservationId?: string
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser()
  if (!currentUser) return NextResponse.error()

  const { reservationId } = params

  if (!reservationId || typeof reservationId !== "string") throw new Error("Invalid ID")

  // make sure that only the creator of the reservation or the creator of the listing the reservation is on can delete the reservation
  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [
        { userId: currentUser.id },
        { listing: { userId: currentUser.id } }
      ]
    }
  })
  return NextResponse.json(reservation)
}