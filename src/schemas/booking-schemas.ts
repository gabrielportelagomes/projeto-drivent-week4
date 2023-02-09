import { CreateOrUpdateBooking } from "@/protocols";
import Joi from "joi";

export const createOrUpdateBookingSchema = Joi.object<CreateOrUpdateBooking>({
  roomId: Joi.number().integer().required(),
});
