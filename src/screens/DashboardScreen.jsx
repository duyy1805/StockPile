import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LogOut, Bell, Package, ChevronRight, History } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { api } from '../api/client';

const StatCard = ({ title, filled, total, percent }) => {
  return (
    <TouchableOpacity 
      className="bg-white rounded-[32px] p-6 mb-5 flex-row items-center shadow-md shadow-slate-200 border border-slate-50"
      activeOpacity={0.9}
    >
      <View className="flex-1">
        <View className="flex-row items-center mb-2">
          <View className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
          <Text className="text-slate-400 text-xs font-bold uppercase tracking-widest">{total} Kệ tổng số</Text>
        </View>
        <Text className="text-slate-900 text-xl font-black mb-1">{title}</Text>
        <Text className="text-slate-500 font-medium">{filled} kệ đang sử dụng</Text>
      </View>
      
      <View className="items-center justify-center relative w-20 h-20">
        <View className="w-20 h-20 rounded-full border-[6px] border-slate-50 items-center justify-center">
            <View 
              className="absolute w-20 h-20 rounded-full border-[6px] border-blue-600" 
              style={{ 
                borderBottomColor: 'transparent', 
                borderLeftColor: 'transparent', 
                transform: [{ rotate: `${(percent / 100) * 360 - 90}deg` }] 
              }} 
            />
            <Text className="text-slate-900 font-black text-lg">{percent}%</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const DashboardScreen = ({ user, onLogout }) => {
  const insets = useSafeAreaInsets();
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.getWarehouses();
      if (result.success) {
        setWarehouses(result.data);
      }
    };
    fetchData();
  }, []);

  return (
    <View className="flex-1 bg-slate-50">
      <StatusBar style="light" />
      
      {/* Header */}
      <View className="bg-white pb-4 pt-0 shadow-sm z-10">
        <LinearGradient
          colors={['#1e3a8a', '#1e40af']}
          className="pb-6 px-6 rounded-b-[32px]"
          style={{ paddingTop: insets.top + 10 }}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="w-12 h-12 rounded-xl bg-white/20 border border-white/20 items-center justify-center">
                <Text className="text-white font-black text-xl">{user.fullName.charAt(0)}</Text>
              </View>
              <View className="ml-3">
                <Text className="text-blue-100/60 text-[10px] font-bold uppercase tracking-widest">Quản lý kho</Text>
                <Text className="text-white text-lg font-bold">{user.fullName}</Text>
              </View>
            </View>
            <TouchableOpacity 
              onPress={onLogout}
              className="w-10 h-10 rounded-xl bg-white/10 items-center justify-center border border-white/10"
            >
              <LogOut size={20} color="white" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>

      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between items-end mb-6 px-1">
          <Text className="text-slate-900 text-xl font-black">Trạng thái kho</Text>
          <TouchableOpacity>
            <Text className="text-blue-600 font-bold text-sm">Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        {warehouses.map((wh) => (
          <StatCard 
            key={wh.id}
            title={wh.name}
            filled={wh.filled}
            total={wh.total}
            percent={wh.percent}
          />
        ))}
        <View className="pb-10" />
      </ScrollView>
      
      {/* Bottom Tab Mock */}
      <View 
        className="bg-white border-t border-slate-100 flex-row justify-around pt-3 pb-2 px-6"
        style={{ paddingBottom: Math.max(insets.bottom, 20) }}
      >
        <TouchableOpacity className="items-center px-4 py-2 bg-blue-50 rounded-[20px]">
          <Package size={24} color="#1e40af" />
          <Text className="text-blue-900 text-[10px] mt-1 font-black uppercase tracking-tighter">Kho hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center justify-center px-4 py-2">
          <History size={24} color="#94a3b8" />
          <Text className="text-slate-400 text-[10px] mt-1 font-bold uppercase tracking-tighter">Lịch sử</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center justify-center px-4 py-2">
          <Bell size={24} color="#94a3b8" />
          <Text className="text-slate-400 text-[10px] mt-1 font-bold uppercase tracking-tighter">Thông báo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DashboardScreen;
