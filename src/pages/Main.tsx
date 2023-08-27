import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Masonry } from '@mui/lab';

import { supabase } from '../api/supabase';
import { Store } from '../types/types';
import Card from '../components/list/Card';

const Main = () => {
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    const fetchStores = async () => {
      const { data } = await supabase.from('store').select();
      setStores(data as Store[]);
    };

    fetchStores();
  }, []);

  return (
    <Masonry columns={3} spacing={2}>
      {stores.map((store) => (
        <Link to={`detail/${store.id}`}>
          <Card store={store} key={store.id} />
        </Link>
      ))}
    </Masonry>
  );
};

export default Main;
