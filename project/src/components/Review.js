import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./ReviewSection.css";

// props: destinationId
// optional props: currentUser (나중에 로그인 유저 정보)
const ReviewSection = ({ destinationId, currentUser }) => {
  const [reviews, setReviews] = useState([]);
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState(currentUser?.name || ""); // 로그인 유저 있으면 자동 입력
  const [rating, setRating] = useState(0);
  const [sortOrder, setSortOrder] = useState("latest");
  const [ratingFilter, setRatingFilter] = useState(0);

  const API_BASE = "http://localhost:5000";

  // 리뷰 불러오기
  const fetchReviews = useCallback(async () => {
    try {
      const res = await axios.get(`/api/reviews/${destinationId}`);
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [destinationId]);

  // 리뷰 작성
  const submitReview = async () => {
    // 로그인 유저가 있으면 author를 자동으로 설정
    const reviewAuthor = currentUser?.name || author;

    if (!reviewAuthor || !content || rating === 0) return;

    try {
      await axios.post("/api/reviews", {
        destinationId,
        content,
        author: reviewAuthor,
        rating,
      });
      setContent("");
      if (!currentUser) setAuthor(""); // 로그인 없으면 작성자 초기화
      setRating(0);
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const averageRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
    : 0;

  const sortedReviews = [...reviews]
    .filter(r => r.rating >= ratingFilter)
    .sort((a, b) => {
      if (sortOrder === "latest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortOrder === "highest") return b.rating - a.rating;
      if (sortOrder === "lowest") return a.rating - b.rating;
      return 0;
    });

  return (
    <div className="review-section">
      <h3>리뷰</h3>
      <div className="rating-select">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= rating ? "selected" : ""}`}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>
      {reviews.length > 0 && (
        <p className="average-rating">평균 ⭐ {averageRating} ({reviews.length}명)</p>
      )}

      {reviews.length > 0 && (
        <div className="review-controls">
          <div className="review-sort">
            <span>정렬: </span>
            <button className={sortOrder === "latest" ? "active" : ""} onClick={() => setSortOrder("latest")}>최신순</button>
            <button className={sortOrder === "highest" ? "active" : ""} onClick={() => setSortOrder("highest")}>높은순</button>
            <button className={sortOrder === "lowest" ? "active" : ""} onClick={() => setSortOrder("lowest")}>낮은순</button>
          </div>

          <div className="review-filter">
            <span>별점 필터: </span>
            {[0, 5, 4, 3].map((f) => (
              <button key={f} className={ratingFilter === f ? "active" : ""} onClick={() => setRatingFilter(f)}>
                {f === 0 ? "전체" : `${f}점 이상`}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 리뷰 작성 폼 */}
      <div className="review-form-card">
        {!currentUser && (
          <input
            type="text"
            placeholder="작성자"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        )}
        <textarea
          placeholder="리뷰 작성"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        
        <button onClick={submitReview}>작성</button>
      </div>

      {reviews.length === 0 && <p className="no-reviews">첫 리뷰를 작성해보세요!</p>}

      {/* 리뷰 리스트 */}
      <div className="review-list">
        {sortedReviews.map((r) => (
          <div key={r._id} className="review-card">
            <div className="review-header">
              <strong>{r.author}</strong>
              <span className="review-date">{new Date(r.createdAt).toLocaleString()}</span>
            </div>
            <div className="review-rating">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={i < r.rating ? "star selected" : "star"}>★</span>
              ))}
            </div>
            <p className="review-content">{r.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ReviewSection;
