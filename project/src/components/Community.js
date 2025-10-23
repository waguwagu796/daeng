import React, { useState, useEffect } from 'react';
import './Community.css';

const Community = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [posts, setPosts] = useState([]);
    const [modalPost, setModalPost] = useState(null);

    // 예시 게시글 데이터 (실제 API 연동 가능)
    useEffect(() => {
        const dummyPosts = [
            { id: 1, title: '첫 번째 게시글', category: '자유', author: '홍길동', date: '2025-10-23', content: '이곳은 첫 번째 게시글 내용입니다. 자세한 내용은 여기에...' },
            { id: 2, title: '질문 게시글', category: '질문', author: '김철수', date: '2025-10-22', content: 'React에서 상태 관리하는 방법에 대해 질문드립니다...' },
            { id: 3, title: '후기 게시글', category: '후기', author: '이영희', date: '2025-10-21', content: '최근 여행을 다녀온 후기를 공유합니다. 정말 좋았던 경험...' },
        ];
        setPosts(dummyPosts);
    }, []);

    const categories = ['전체', '자유', '질문', '후기'];
    const filteredPosts = selectedCategory && selectedCategory !== '전체'
        ? posts.filter(post => post.category === selectedCategory)
        : posts;

    return (
        <div className="community-page">
            <div className="community-header">
                <h1>커뮤니티</h1>
                <p>게시글을 보고, 작성하며, 소통해보세요.</p>
            </div>

            {/* 카테고리 선택 */}
            <div className="selection-section">
                <h2>카테고리 선택</h2>
                <div className="button-group">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`select-btn ${selectedCategory === cat ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* 게시글 목록 */}
            <div className="post-list">
                {filteredPosts.length === 0 ? (
                    <p className="no-result">게시글이 없습니다.</p>
                ) : (
                    filteredPosts.map(post => (
                        <div className="post-card" key={post.id} onClick={() => setModalPost(post)}>
                            <h3>{post.title}</h3>
                            <p className="meta">{post.author} | {post.date} | {post.category}</p>
                            <p className="content-preview">{post.content.slice(0, 80)}...</p>
                        </div>
                    ))
                )}
            </div>

            {/* 모달 상세보기 */}
            {modalPost && (
                <div className="modal" onClick={() => setModalPost(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2>{modalPost.title}</h2>
                        <p className="meta">{modalPost.author} | {modalPost.date} | {modalPost.category}</p>
                        <p>{modalPost.content}</p>
                        <button className="close-btn" onClick={() => setModalPost(null)}>닫기</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Community;
