import { Drawer } from 'expo-router/drawer';
import React, { useEffect } from 'react';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAuth } from '@/context/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user, loading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && !user) router.replace('/');
  }, [user, loading, router]);
  
  return (
      <Drawer
        screenOptions={{
          headerShown: false,
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
        <Drawer.Screen
          name="index"
          options={{
            title: 'Home',
            drawerIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Drawer.Screen
          name="explore"
          options={{
            title: 'Explore',
            drawerIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          }}
        />
      </Drawer>
  );
}


function CustomDrawerContent(props : any){
  const { logout } = useAuth();
  const router = useRouter();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        labelStyle={{ color: "#f00" }}
        style={{ marginTop: 20 }}
        onPress={async () => {
          await logout();
          router.replace("/(auth)");
          console.log("User logged out");
        }}
        icon={({color}) => <MaterialIcons name="logout" size={24} color={"#f00"} />}
      />
    </DrawerContentScrollView>
  );
}
