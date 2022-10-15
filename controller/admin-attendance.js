const { addMinutes, isAfter } = require("date-fns");
const adminAttendance = require("../models/AdminAttendance");
const error = require("../utils/error");

const getEnable = async (_req, res, next) => {
  try {
    const running = await adminAttendance.findOne({ status: "RUNNING" });
    if (running) {
      throw error("Already running", 400);
    }
    const attendance = new adminAttendance({});
    await attendance.save();
    return res.status(201).json({ message: "Success", attendance });
  } catch (e) {
    next(e);
  }
};

const getStatus = async (_req, res, next) => {
  try {
    const running = await adminAttendance.findOne({ status: "RUNNING" });
    if (!running) {
      throw error("Not running", 400);
    }

    const started = addMinutes(new Date(running.createdAt), running.timeLimit);
    if (isAfter(new Date(), started)) {
      running.status = "COMPLETED";
      await running.save();
    }

    res.status(200).json(running);
  } catch (e) {
    next(e);
  }
};

const getDisable = async (_req, res, next) => {
  try {
    const running = await adminAttendance.findOne({ status: "RUNNING" });
    if (!running) {
      throw error("Not running", 400);
    }
    running.status = "COMPLETED";
    await running.save();

    res.status(200).json(running);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getEnable,
  getDisable,
  getStatus,
};
