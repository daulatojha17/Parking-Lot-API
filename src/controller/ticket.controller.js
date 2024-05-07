import { HTTP_CODE } from "../constants.js";
import { getRegistrationPlateNumberByCarSize } from "../service/ticketService.js";


const getTicket = async (req, res, next) => {
  const { size } = req.query;
  try {
    if (!size) {
      throw Error("Car size is required");
    }

    res.send(await getRegistrationPlateNumberByCarSize(size));
  } catch (e) {
    if (e.message === "Car size is required") {
      res.status(HTTP_CODE.BAD_REQUEST).send({
        code: HTTP_CODE.BAD_REQUEST,
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
export{
  getTicket,
};
