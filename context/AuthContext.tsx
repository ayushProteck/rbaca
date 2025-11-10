import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
//   const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
//   const navigation = useNavigation();

  const login = async ({ email, password }) => {
    const storedUsers = await AsyncStorage.getItem('registeredUsers');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
  
    const matchedUser = users.find(u => u.email === email);
  
    if (!matchedUser) {
      return {
        title : 'Login Error',
        message : 'User not found. Please sign up first.',
        success: false
      }
    }
  
    if (matchedUser.password !== password) {
      return {
        title : 'Login Error',
        message : 'Incorrect password. Please try again.',
        success: false
      }
    }
  
    await AsyncStorage.setItem('user', JSON.stringify(matchedUser));
    setUser(matchedUser);
    return { success: true }
  };


  const logout = async () => {
    await AsyncStorage.removeItem('user');
    console.log("logged out");
    setUser(null);
  };

  const signup = async (newUser) => {
    const existing = await AsyncStorage.getItem('registeredUsers');
    const users = existing ? JSON.parse(existing) : [];

    const alreadyExists = users.find(u => u.email === newUser.email);
    if (alreadyExists){
        Alert.alert('Error', 'User with this email already exists');
    }

    const updatedUsers = [...users, newUser];
    await AsyncStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

    // await login(newUser); // auto-login after signup
  };

  useEffect(() => {
    const loadUser = async () => {
      const stored = await AsyncStorage.getItem('user');
      if (stored) setUser(JSON.parse(stored));
      setLoading(false);
    };
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
