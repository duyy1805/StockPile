import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { api } from '../api/client';
import { Package } from 'lucide-react-native';

const LoginScreen = ({ onLoginSuccess }) => {
  const [userName, setUserName] = useState('haint');
  const [passWord, setPassWord] = useState('12345678');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    const result = await api.login(userName, passWord);
    setLoading(false);
    
    if (result.success) {
      onLoginSuccess(result.data);
    } else {
      setError(result.message);
    }
  };

  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <LinearGradient
        colors={['#1e40af', '#3b82f6']}
        className="absolute w-full h-1/2"
      />
      
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header / Logo */}
            <View className="items-center justify-center pt-16 pb-12">
              <View className="w-20 h-20 bg-white/20 rounded-3xl items-center justify-center mb-4 border border-white/30 backdrop-blur-md">
                <Package size={40} color="white" />
              </View>
              <Text className="text-white text-3xl font-bold tracking-tight">Smart Warehouse</Text>
              <Text className="text-white/70 mt-1">Hệ thống quản lý kho thông minh</Text>
            </View>

            {/* Login Card */}
            <View className="flex-1 bg-slate-50 rounded-t-[40px] px-8 pt-10 shadow-2xl">
              <Text className="text-2xl font-bold text-slate-800 mb-2">Đăng nhập</Text>
              <Text className="text-slate-500 mb-8">Đăng nhập để bắt đầu trải nghiệm hệ thống!</Text>

              {error ? (
                <View className="bg-red-50 border border-red-100 p-3 rounded-xl mb-6">
                  <Text className="text-red-600 text-center">{error}</Text>
                </View>
              ) : null}

              <Input 
                label="Tên đăng nhập"
                placeholder="Nhập tên đăng nhập"
                value={userName}
                onChangeText={setUserName}
              />

              <Input 
                label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                value={passWord}
                onChangeText={setPassWord}
                secureTextEntry
              />

              <TouchableOpacity className="self-end mb-8">
                <Text className="text-blue-600 font-medium">Quên mật khẩu?</Text>
              </TouchableOpacity>

              <Button 
                title="Đăng nhập" 
                onPress={handleLogin}
                loading={loading}
              />

              <View className="mt-auto pb-8 items-center">
                <Text className="text-slate-400 text-xs">Phiên bản: 1.1.2 (v1)</Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default LoginScreen;
