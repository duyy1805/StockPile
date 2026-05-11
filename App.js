import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import "./global.css";
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';

export default function App() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <SafeAreaProvider>
      <View className="flex-1">
        {!user ? (
          <LoginScreen onLoginSuccess={handleLoginSuccess} />
        ) : (
          <DashboardScreen user={user} onLogout={handleLogout} />
        )}
      </View>
    </SafeAreaProvider>
  );
}
