import { forbiddenError, notFoundError } from "@/errors";
import bookingRepository from "@/repositories/booking-repository";

async function getBooking(userId: number) {
  const booking = await bookingRepository.findBooking(userId);

  if (!booking) throw notFoundError();

  return booking;
}

async function postBooking(userId: number, roomId: number) {
  const room = await bookingRepository.findRoomByIdWithBookings(roomId);

  if (!room) throw notFoundError();

  if (room._count.Booking >= room.capacity) throw forbiddenError();

  const booking = await bookingRepository.createBooking(userId, roomId);

  if (!booking) throw forbiddenError();

  return booking;
}

async function putBooking(userId: number, roomId: number, bookingId: number) {
  const room = await bookingRepository.findRoomByIdWithBookings(roomId);

  if (!room) throw notFoundError();

  if (room._count.Booking >= room.capacity) throw forbiddenError();

  const booking = await bookingRepository.updateBooking(userId, roomId, bookingId);

  if (!booking) throw forbiddenError();

  return booking;
}

const bookingService = { getBooking, postBooking, putBooking };

export default bookingService;
