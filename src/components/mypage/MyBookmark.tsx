import React from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../../types/types';

interface BookmarkProps {
  items: any; // 이 부분은 필요한 데이터 타입으로 수정해주세요.
}

function Bookmark({ items }: BookmarkProps) {
  return (
    <div>
      <div className="subs-wrapper">
        {items.pages.map((page: any) => (
          <React.Fragment key={page.page}>
            {page.stores.slice(0, 3).map((store: Store) => (
              <Link to={`/detail/${store.id}`} key={store.id} className="user-subs">
                <img
                  src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${store.images[0]}`}
                  alt={`Store Image`}
                  width={200}
                />
                <h2>{store.title}</h2>
                <p>
                  {store.period_start} ~ {store.period_end}
                </p>
              </Link>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Bookmark;
