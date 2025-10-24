const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  //destinationId: { type: String, required: true }, // 여행지 ID
  author: { type: String, required: true }, // 작성자
  content: { type: String, required: true }, // 리뷰 내용
  rating: { type: Number, default: 0 }, // 평점 (1~5)
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", reviewSchema);
