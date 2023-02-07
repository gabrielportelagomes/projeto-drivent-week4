import { CreateBooking } from "@/protocols";
import Joi from "joi";

export const createBookingSchema = Joi.object<CreateBooking>({
  roomId: Joi.number().integer().min(1).required(),
});
