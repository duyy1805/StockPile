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
    <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <StatusBar style="light" />

      {/* Deep Blue Background for the top area */}
      <View className="absolute w-full h-[50%] bg-[#1e3a8a]" />

      <LinearGradient
        colors={['#172554', '#1e40af']}
        className="absolute w-full h-[50%]"
      />

      {/* Subtle decorative circles */}
      <View
        className="absolute w-80 h-80 rounded-full bg-white/5 -top-20 -right-20"
      />
      <View
        className="absolute w-60 h-60 rounded-full bg-blue-400/5 top-20 -left-20"
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
            <View className="items-center justify-center pt-12 pb-14">
              <View className="w-20 h-20 bg-white rounded-[24px] items-center justify-center mb-5 shadow-2xl shadow-blue-900/50">
                <Package size={40} color="#1e40af" />
              </View>
              <Text className="text-white text-4xl font-black tracking-tight">StockPile</Text>
              <Text className="text-blue-100/70 mt-1 text-sm font-medium">Hệ thống quản lý kho thông minh</Text>
            </View>

            {/* Login Card */}
            <View className="flex-1 bg-slate-50 rounded-t-[40px] px-8 pt-12 shadow-2xl">
              <Text className="text-3xl font-black text-slate-900 mb-2">Chào mừng!</Text>
              <Text className="text-slate-500 mb-10 text-base font-medium">Đăng nhập để bắt đầu công việc</Text>

              {error ? (
                <View className="bg-red-50 border border-red-100 p-4 rounded-2xl mb-8 flex-row items-center">
                  <View className="w-2 h-2 rounded-full bg-red-400 mr-3" />
                  <Text className="text-red-600 font-medium">{error}</Text>
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
