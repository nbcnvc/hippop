import React from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../../types/types';

interface BookmarkProps {
  items: any; // 이 부분은 필요한 데이터 타입으로 수정해주세요.
}

function Bookmark({ items }: BookmarkProps) {
  return (
    <div style={{ margin: '0 auto' }}>
      <div>
        {items.pages.map((page: any) => {
          return (
            <div className="subs-wrapper" key={page.page}>
              <div className="fids">
                {page.stores.slice(0, 3).map((store: Store) => (
                  <Link to={`/detail/${store.id}`} key={store.id} className="user-subs">
                    <img
                      src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${store.images[0]}`}
                      alt={`Store Image`}
                      width={200}
                    />
                    <div className="info-box">
                      <div>
                        <h2>{store.title}</h2>
                        <p>
                          {store.period_start} ~ {store.period_end}
                        </p>
                      </div>
                      <button>상세보기</button>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Bookmark;
