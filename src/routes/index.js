import express from "express"
import {validate} from "../middleware/validator.middleware.js";
import {park, leave} from "../controller/car.controller.js";
import {create, getStatus, allocated} from "../controller/parking.controller.js";
import {getTicket} from "../controller/ticket.controller.js";
import { HTTP_CODE } from "../constants.js";

/* GET home page. */
const router = express.Router();
router.get("/", function (req, res, next) {
  res.send({
    code: HTTP_CODE.OK,
    message: `parking lot api`,
  });
});

router.post("/parking", validate, create);
router.get("/parking/status", getStatus);
router.get("/parking/allocated", allocated);

router.get("/ticket", getTicket);

router.post("/car/park", park);
router.post("/car/leave", leave);

export {router};
