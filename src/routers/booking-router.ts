import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getBooking, postBooking, putBooking } from "@/controllers";
import { createOrUpdateBookingSchema } from "@/schemas";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", getBooking)
  .post("/", validateBody(createOrUpdateBookingSchema), postBooking)
  .put("/:bookingId", validateBody(createOrUpdateBookingSchema), putBooking);

export { bookingRouter };
