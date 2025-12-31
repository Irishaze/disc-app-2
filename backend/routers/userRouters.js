import express from "express";
import {
  getAllUsers,
  getAllUserProfiles,
  getUsersAlphabetical,
  getUsersEmailCount,
  createUsers,
} from "../controllers/usersController.js";
import { validateUser } from "../middleware/validateUser.js";

const router = express.Router();

router.get("/all", getAllUsers);
router.get("/alphabetical", getUsersAlphabetical);
router.get("/email-count", getUsersEmailCount);
router.get("/profiles", getAllUserProfiles);
router.post("/", validateUser, createUsers);

export { router };
