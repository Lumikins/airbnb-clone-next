import prisma from "@/app/libs/prismadb"

export interface IListingsParams {
  userId?: string
  guestCount?: number
  roomCount?: number
  bathroomCount?: number
  startDate?: string
  endDate?: string
  locationValue?: string
  category?: string
}

export default async function getListings(params: IListingsParams) {
  try {
    const { userId, guestCount, roomCount, bathroomCount, startDate, endDate, locationValue, category } = params
    let query: any = {}
    if (userId) query.userId = userId
    if (category) query.category = category

    // get all listings with params equal to or greater than our search params
    if (roomCount) query.roomCount = { gte: +roomCount }
    if (bathroomCount) query.bathroomCount = { gte: +bathroomCount }
    if (guestCount) query.guestCount = { gte: +guestCount }

    if (locationValue) query.locationValue = locationValue

    // filter out conflicts in reservations
    if (startDate && endDate) query.NOT = {
      reservations: {
        some: {
          OR: [{
            endDate: { gte: startDate },
            startDate: { lte: startDate }
          },
          {
            startDate: { lte: endDate },
            endDate: { gte: endDate }
          }]
        }
      }
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc"
      }
    })
    const SafeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString()
    }))
    return SafeListings
  } catch (error: any) {
    throw new Error(error)
  }
}