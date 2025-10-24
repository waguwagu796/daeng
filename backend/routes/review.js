const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

// 리뷰 작성
router.post("/reviews", async (req, res) => {
  console.log("POST /reviews body:", req.body);  // 여기서 body가 찍히는지 확인
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 특정 여행지 리뷰 조회
router.get("/reviews/:destinationId", async (req, res) => {
  try {
    const reviews = await Review.find({ destinationId: req.params.destinationId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
