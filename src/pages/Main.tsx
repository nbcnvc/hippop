import { useEffect, useState } from 'react';
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
        <Card store={store} key={store.id} />
      ))}
    </Masonry>
  );
};

export default Main;
