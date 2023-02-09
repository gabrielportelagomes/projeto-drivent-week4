import { forbiddenError, notFoundError } from "@/errors";
import bookingRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function verifyTicketAndEnrollment(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw forbiddenError();
  }
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw forbiddenError();
  }
}

async function getBooking(userId: number) {
  await verifyTicketAndEnrollment(userId);

  const booking = await bookingRepository.findBookingByUserId(userId);

  return booking;
}

async function postBooking(userId: number, roomId: number) {
  await verifyTicketAndEnrollment(userId);

  const bookingExists = await bookingRepository.findBookingByUserId(userId);

  if (bookingExists) throw forbiddenError();

  const room = await bookingRepository.findRoomByIdWithBookings(roomId);

  if (!room) throw notFoundError();

  if (room._count.Booking >= room.capacity) throw forbiddenError();

  const booking = await bookingRepository.createBooking(userId, roomId);

  return booking;
}

async function putBooking(userId: number, roomId: number, bookingId: number) {
  await verifyTicketAndEnrollment(userId);

  const booking = await bookingRepository.findBooking(bookingId);

  if (!booking || booking.userId !== userId || booking.roomId === roomId) throw forbiddenError();

  const room = await bookingRepository.findRoomByIdWithBookings(roomId);

  if (!room) throw notFoundError();

  if (room._count.Booking >= room.capacity) throw forbiddenError();

  const updatedBooking = await bookingRepository.updateBooking(userId, roomId, bookingId);

  return updatedBooking;
}

const bookingService = { getBooking, postBooking, putBooking };

export default bookingService;
