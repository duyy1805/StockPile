import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import "./global.css";
import { useColorScheme } from 'nativewind';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';

export default function App() {
  const { setColorScheme } = useColorScheme();
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    console.log('App: Switching theme to', next);
    setTheme(next);
    setColorScheme(next);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-white dark:bg-slate-900">
        {!user ? (
          <LoginScreen 
            onLoginSuccess={handleLoginSuccess} 
            theme={theme}
            toggleTheme={toggleTheme}
          />
        ) : (
          <DashboardScreen 
            user={user} 
            onLogout={handleLogout} 
            theme={theme}
            toggleTheme={toggleTheme}
          />
        )}
      </View>
    </SafeAreaProvider>
  );
}
