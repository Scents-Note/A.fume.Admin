import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { MainLayout } from '@/components/icons/pages/main/MainLayout';

export const MainPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const loginToken = localStorage.getItem('token');

    if (loginToken === null || loginToken === undefined) {
      router.replace('/');
    }
  }, []);

  return (
    <MainLayout>
      <div>test</div>
    </MainLayout>
  );
};

export default MainPage;
