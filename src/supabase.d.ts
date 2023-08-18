import { User } from '@supabase/supabase-js';

declare module '@supabase/supabase-js' {
  interface User {
    user_metadata: {
      avatar_url: string;
      name: string;
    };
  }
}
