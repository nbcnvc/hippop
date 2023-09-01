import React from 'react';
import { Link } from 'react-router-dom';
import { PostType, ReviewProps } from '../../types/types';

const MyReview = ({ selectItems }: ReviewProps) => {
  // 작성 날짜 잘라내기
  function formatDate(dateTimeString: string) {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };
    const formattedDate = new Date(dateTimeString).toLocaleString('en-US', options);

    const [month, day, year] = formattedDate.split('/'); // 날짜를 월, 일, 년 순서로 분리
    return `${year}. ${month}. ${day}`; // 'YYYY-MM-DD' 형식으로 재조합하여 반환
    // return new Date(dateTimeString).toLocaleString('en-US', options); // 기본 년월일
  }

  function extractImageTags(html: string) {
    const imageTags = [];
    const pattern = /<img.*?src=["'](.*?)["'].*?>/g;
    let match;

    while ((match = pattern.exec(html)) !== null) {
      imageTags.push(match[1]);
    }

    return imageTags;
  }

  return (
    <div style={{ margin: '0 auto' }}>
      <div className="post-wrapper">
        {selectItems.map((post: PostType) => {
          const imageTags = extractImageTags(post.body);
          return (
            <div className="fid" key={post.id}>
              <Link to={`/rdetail/${post.id}`}>
                {imageTags.length > 0 ? (
                  <div>
                    <img src={imageTags[0]} alt={`Image 0`} width={250} />
                  </div>
                ) : (
                  <div>
                    <img src="/asset/defaultImg.png" alt="Default Image" width={250} />
                  </div>
                )}
                <div className="info-box">
                  <div>
                    <h2>{post.title}</h2>
                    <p>{formatDate(post.created_at)}</p>
                  </div>
                  <button>상세보기</button>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyReview;
