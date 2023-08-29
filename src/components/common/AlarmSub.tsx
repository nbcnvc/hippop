import React from 'react';
import { supabase } from '../../api/supabase';

const AlarmSub = () => {
  // const channel = supabase
  //   .channel('changes')
  //   .on(
  //     'postgres_changes',
  //     {
  //       event: 'INSERT',
  //       schema: 'public',
  //       table: 'subscribe',
  //       filter: `subscribe_from=eq.f19634e3-1a8a-479c-b3ec-6e16619f071a`
  //     },
  //     (payload) => console.log(payload)
  //   )
  //   .subscribe();

  return <div>AlarmSub</div>;
};

export default AlarmSub;
