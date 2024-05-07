import {createTicket, findTicketById, stampExit} from "../service/ticketService.js";
import {findAvailableSlot, allocatedParkingSlot, releaseParkingSlot, findNearestParkingSlot} from "../service/parkingService.js";
import { HTTP_CODE } from "../constants.js";

const park = async (req, res) => {
  const { size, floor, plateNumber } = req.body;
  try {
    const parkingLots = await findNearestParkingSlot(
      floor,
      size
    );
    if (!parkingLots) {
      throw new Error("no available slot");
    }
    const availableSlot = findAvailableSlot(parkingLots);
    const createdTicket = await createTicket(
      plateNumber,
      size,
      parkingLots,
      availableSlot.slotID
    );

    await allocatedParkingSlot(
      parkingLots._id,
      size,
      availableSlot.slotID
    );

    res.send({
      code: HTTP_CODE.CREATED,
      data: createdTicket,
      message: `Ticket has created`,
    });
  } catch (e) {
    if (e.message === "no available slot") {
      res.status(HTTP_CODE.NOT_FOUND).send({
        code: HTTP_CODE.NOT_FOUND,
        message: e.message,
      });
    } else {
      res.status(HTTP_CODE.INTERNAL_ERROR).send({
        code: HTTP_CODE.INTERNAL_ERROR,
        message: e.message,
      });
    }
  }
};

const leave = async (req, res, next) => {
  const { id } = req.body;
  try {
    const ticket = await findTicketById(id);
    if (ticket.length === 0) {
      throw new Error("ticket not found");
    }
    if (ticket.exitedAt) {
      throw new Error("ticket has already exited");
    }
    await releaseParkingSlot(ticket);
    await stampExit(ticket);
    res.send({
      code: 200,
      message: `Ticket has exited`,
    });
  } catch (e) {
    if (e.message === "ticket not found") {
      res.status(HTTP_CODE.NOT_FOUND).send({
        code: HTTP_CODE.NOT_FOUND,
        message: e.message,
      });
    } else if (e.message === "ticket has already exited") {
      res.status(HTTP_CODE.UNPROCESSABLE_ENTITY).send({
        code: HTTP_CODE.UNPROCESSABLE_ENTITY,
        message: "ticket has already exited",
      });
    } else {
      res.status(HTTP_CODE.INTERNAL_ERROR).send({
        code: HTTP_CODE.INTERNAL_ERROR,
        message: e.message,
      });
    }
  }
};

export {
  park,
  leave,
};
