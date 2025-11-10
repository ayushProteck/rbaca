import { useAuth } from '@/context/AuthContext';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function AuthLayout() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) router.replace('/(tabs)');
    console.log('AuthLayout user:', user);
  }, [user, loading, router]);

  return <Stack 
        screenOptions={{
            headerShown: false,
        }}
        initialRouteName='index'
        />;
}
