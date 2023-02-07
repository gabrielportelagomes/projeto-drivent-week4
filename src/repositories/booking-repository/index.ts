import { prisma } from "@/config";

async function findBooking(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
    select: {
      id: true,
      Room: true,
    },
  });
}

async function findRoomByIdWithBookings(id: number) {
  return prisma.room.findUnique({
    where: {
      id,
    },
    include: {
      _count: { select: { Booking: true } },
    },
  });
}

async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}

async function updateBooking(userId: number, roomId: number, bookingId: number) {
  return prisma.booking.update({
    where: { id: bookingId },
    data: {
      userId,
      roomId,
    },
  });
}

const bookingRepository = { findBooking, findRoomByIdWithBookings, createBooking, updateBooking };

export default bookingRepository;
