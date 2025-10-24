import React, { useState, useEffect } from 'react';
import './TravelBoard.css';

const TravelBoard = () => {
  const [selectedTourStyle, setSelectedTourStyle] = useState('전체');
  const [posts, setPosts] = useState([]);
  const [modalPost, setModalPost] = useState(null);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('latest'); // latest, popular, likes

  // 여행 유형
  const tourStyles = ['전체', '술', '맛집', '유적', '쇼핑', '액티비티', '자연', '힐링'];

  // 예시 게시글 데이터
  useEffect(() => {
    const dummyPosts = [
      {
        id: 1,
        userId: 'user1',
        subject: '제주도 맛집 투어 후기',
        content: '3박 4일 동안 제주도 맛집만 돌아다녔어요! 흑돼지, 해산물, 카페까지 정말 만족스러운 여행이었습니다.',
        tourStyle: '맛집',
        startDate: '2025-10-15',
        endDate: '2025-10-18',
        tourSpot: '제주도',
        hitCount: 152,
        likes: 24,
        author: '홍길동',
        authorImage: null,
        images: [],
        comments: 8,
        created: '2025-10-23'
      },
      {
        id: 2,
        userId: 'user2',
        subject: '부산 해운대 서핑 체험기',
        content: '처음으로 서핑을 배웠는데 정말 재밌었어요! 해운대 파도가 초보자에게 딱 좋더라구요.',
        tourStyle: '액티비티',
        startDate: '2025-10-20',
        endDate: '2025-10-21',
        tourSpot: '부산',
        hitCount: 89,
        likes: 15,
        author: '김철수',
        authorImage: null,
        images: [],
        comments: 5,
        created: '2025-10-22'
      },
      {
        id: 3,
        userId: 'user3',
        subject: '경주 역사 탐방 코스 추천',
        content: '불국사, 석굴암, 첨성대까지! 경주의 유적지를 하루만에 돌아본 코스 공유합니다.',
        tourStyle: '유적',
        startDate: '2025-10-18',
        endDate: '2025-10-18',
        tourSpot: '경주',
        hitCount: 203,
        likes: 42,
        author: '이영희',
        authorImage: null,
        images: [],
        comments: 12,
        created: '2025-10-21'
      },
      {
        id: 4,
        userId: 'user4',
        subject: '강릉 바다 힐링 여행',
        content: '조용한 해변에서 책 읽고 커피 마시며 보낸 힐링 여행. 정말 힐링되었어요.',
        tourStyle: '힐링',
        startDate: '2025-10-10',
        endDate: '2025-10-12',
        tourSpot: '강릉',
        hitCount: 167,
        likes: 31,
        author: '박민수',
        authorImage: null,
        images: [],
        comments: 6,
        created: '2025-10-20'
      }
    ];
    setPosts(dummyPosts);
  }, []);

  // 필터링
  const filteredPosts = selectedTourStyle === '전체'
    ? posts
    : posts.filter(post => post.tourStyle === selectedTourStyle);

  // 정렬
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'popular') return b.hitCount - a.hitCount;
    if (sortBy === 'likes') return b.likes - a.likes;
    return new Date(b.created) - new Date(a.created); // latest
  });

  // 게시글 클릭 (조회수 증가)
  const handlePostClick = (post) => {
    const updatedPosts = posts.map(p =>
      p.id === post.id ? { ...p, hitCount: p.hitCount + 1 } : p
    );
    setPosts(updatedPosts);
    setModalPost({ ...post, hitCount: post.hitCount + 1 });
  };

  // 좋아요 토글
  const handleLike = (postId) => {
    const updatedPosts = posts.map(p =>
      p.id === postId ? { ...p, likes: p.likes + 1 } : p
    );
    setPosts(updatedPosts);
    if (modalPost && modalPost.id === postId) {
      setModalPost({ ...modalPost, likes: modalPost.likes + 1 });
    }
  };

  return (
    <div className="community-page">
      <div className="community-header">
        <h1>여행 게시판</h1>
        <p>멍멍이들과 함께한 여행 이야기를 공유해보세요</p>
      </div>

      {/* 여행 유형 선택 */}
      <div className="selection-section">
        <h2>여행 유형</h2>
        <div className="button-group">
          {tourStyles.map(style => (
            <button
              key={style}
              className={`select-btn ${selectedTourStyle === style ? 'active' : ''}`}
              onClick={() => setSelectedTourStyle(style)}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* 정렬 & 글쓰기 */}
      <div className="controls">
        <div className="sort-buttons">
          <button
            className={`sort-btn ${sortBy === 'latest' ? 'active' : ''}`}
            onClick={() => setSortBy('latest')}
          >
            최신순
          </button>
          <button
            className={`sort-btn ${sortBy === 'popular' ? 'active' : ''}`}
            onClick={() => setSortBy('popular')}
          >
            인기순
          </button>
          <button
            className={`sort-btn ${sortBy === 'likes' ? 'active' : ''}`}
            onClick={() => setSortBy('likes')}
          >
            좋아요순
          </button>
        </div>
        <button className="write-btn" onClick={() => setIsWriteModalOpen(true)}>
          ✏️ 글쓰기
        </button>
      </div>

      {/* 게시글 목록 */}
      <div className="post-list">
        {sortedPosts.length === 0 ? (
          <p className="no-result">게시글이 없습니다.</p>
        ) : (
          sortedPosts.map(post => (
            <div className="post-card" key={post.id} onClick={() => handlePostClick(post)}>
              <div className="post-header">
                <span className="tour-badge">{post.tourStyle}</span>
                <span className="tour-spot">📍 {post.tourSpot}</span>
              </div>
              <h3>{post.subject}</h3>
              <p className="content-preview">{post.content.slice(0, 100)}...</p>
              <div className="post-meta">
                <span className="author">{post.author}</span>
                <span className="date">{post.created}</span>
                <div className="post-stats">
                  <span>👁️ {post.hitCount}</span>
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                </div>
              </div>
              <div className="post-date-range">
                {post.startDate} ~ {post.endDate}
              </div>
            </div>
          ))
        )}
      </div>

      {/* 게시글 상세 모달 */}
      {modalPost && (
        <div className="modal" onClick={() => setModalPost(null)}>
          <div className="modal-content detail" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setModalPost(null)}>✕</button>
            
            <div className="detail-header">
              <span className="tour-badge large">{modalPost.tourStyle}</span>
              <h2>{modalPost.subject}</h2>
              <div className="detail-meta">
                <span className="author">{modalPost.author}</span>
                <span className="date">{modalPost.created}</span>
              </div>
              <div className="detail-info">
                <span>📍 {modalPost.tourSpot}</span>
                <span>📅 {modalPost.startDate} ~ {modalPost.endDate}</span>
              </div>
            </div>

            <div className="detail-stats">
              <span>조회 {modalPost.hitCount}</span>
              <span>좋아요 {modalPost.likes}</span>
              <span>댓글 {modalPost.comments}</span>
            </div>

            <div className="detail-content">
              <p>{modalPost.content}</p>
            </div>

            <div className="detail-actions">
              <button className="like-btn" onClick={() => handleLike(modalPost.id)}>
                ❤️ 좋아요 ({modalPost.likes})
              </button>
              <button className="report-btn">🚨 신고하기</button>
            </div>

            <div className="comments-section">
              <h3>댓글 {modalPost.comments}개</h3>
              <div className="comment-input">
                <input type="text" placeholder="댓글을 입력하세요..." />
                <button>작성</button>
              </div>
              <div className="comment-list">
                <p className="no-comments">아직 댓글이 없습니다.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 글쓰기 모달 */}
      {isWriteModalOpen && (
        <div className="modal" onClick={() => setIsWriteModalOpen(false)}>
          <div className="modal-content write" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setIsWriteModalOpen(false)}>✕</button>
            
            <h2>여행 게시글 작성</h2>
            
            <form className="write-form">
              <div className="form-group">
                <label>제목</label>
                <input type="text" placeholder="제목을 입력하세요" />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>여행 유형</label>
                  <select>
                    {tourStyles.filter(s => s !== '전체').map(style => (
                      <option key={style} value={style}>{style}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>여행지</label>
                  <input type="text" placeholder="예: 제주도" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>시작일</label>
                  <input type="date" />
                </div>
                <div className="form-group">
                  <label>종료일</label>
                  <input type="date" />
                </div>
              </div>

              <div className="form-group">
                <label>내용</label>
                <textarea rows="10" placeholder="여행 후기를 자세히 작성해주세요"></textarea>
              </div>

              <div className="form-group">
                <label>사진 업로드</label>
                <input type="file" multiple accept="image/*" />
                <p className="help-text">최대 5장까지 업로드 가능합니다</p>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsWriteModalOpen(false)}>
                  취소
                </button>
                <button type="submit" className="submit-btn">
                  작성완료
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelBoard;