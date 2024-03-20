import express from "express";
import { createListing, deleteListing, updataListing, getListing, getListings, getSellerListing } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updataListing);
router.get('/get/:id', getListing);
router.get('/get', getListings);
router.get("/:id",getSellerListing);


export default router;