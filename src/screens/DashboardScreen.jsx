import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LogOut, Bell, Package, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { api } from '../api/client';

const StatCard = ({ title, filled, total, percent }) => {
  return (
    <TouchableOpacity 
      className="bg-white rounded-3xl p-5 mb-4 flex-row items-center shadow-sm border border-slate-100"
      activeOpacity={0.7}
    >
      <View className="flex-1">
        <Text className="text-slate-800 text-lg font-bold mb-1">{title}</Text>
        <Text className="text-blue-500 font-medium">{filled}/{total} kệ đã đầy</Text>
      </View>
      
      <View className="items-center justify-center relative w-16 h-16">
        {/* Simple Progress Ring visualization using SVG or View */}
        <View className="w-16 h-16 rounded-full border-4 border-slate-100 items-center justify-center">
           {/* In a real app we would use react-native-svg for a real ring */}
           <View 
            className="absolute w-16 h-16 rounded-full border-4 border-blue-500" 
            style={{ borderBottomColor: 'transparent', borderLeftColor: 'transparent', transform: [{ rotate: '45deg' }] }} 
           />
           <Text className="text-blue-600 font-bold text-sm">{percent}%</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const DashboardScreen = ({ user, onLogout }) => {
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
      <LinearGradient
        colors={['#1e40af', '#3b82f6']}
        className="pt-14 pb-8 px-6 rounded-b-[40px] shadow-lg shadow-blue-500/30"
      >
        <View className="flex-row items-center justify-between mb-6">
          <View className="flex-row items-center">
            <View className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 items-center justify-center">
              <Text className="text-white font-bold text-xl">{user.fullName.charAt(0)}</Text>
            </View>
            <View className="ml-4">
              <Text className="text-white/70 text-sm font-medium">Xin chào,</Text>
              <Text className="text-white text-xl font-bold">{user.fullName}</Text>
            </View>
          </View>
          <View className="flex-row gap-3">
            <TouchableOpacity className="w-10 h-10 rounded-full bg-white/10 items-center justify-center">
              <Bell size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={onLogout}
              className="w-10 h-10 rounded-full bg-white/10 items-center justify-center"
            >
              <LogOut size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        
        <View className="bg-white/10 p-4 rounded-2xl border border-white/20">
          <Text className="text-white/80 text-sm">Chúc bạn một ngày làm việc hiệu quả!</Text>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between items-end mb-4 px-1">
          <Text className="text-slate-800 text-xl font-bold">Trạng thái kho</Text>
          <TouchableOpacity>
            <Text className="text-blue-600 font-medium">Xem tất cả</Text>
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

        {/* Quick Actions */}
        <Text className="text-slate-800 text-xl font-bold mt-4 mb-4 px-1">Tiện ích nhanh</Text>
        <View className="flex-row flex-wrap justify-between">
           {[
             { title: 'Nhập kho', icon: Package, color: 'bg-green-500' },
             { title: 'Xuất kho', icon: Package, color: 'bg-orange-500' },
             { title: 'Giám định', icon: Package, color: 'bg-purple-500' },
             { title: 'Kiểm kê', icon: Package, color: 'bg-blue-500' },
           ].map((item, idx) => (
             <TouchableOpacity 
              key={idx}
              className="w-[48%] bg-white p-5 rounded-3xl mb-4 shadow-sm border border-slate-100 items-center"
             >
                <View className={`${item.color} w-12 h-12 rounded-2xl items-center justify-center mb-3`}>
                  <item.icon size={24} color="white" />
                </View>
                <Text className="text-slate-800 font-bold">{item.title}</Text>
             </TouchableOpacity>
           ))}
        </View>
        
        <View className="h-10" />
      </ScrollView>
      
      {/* Bottom Tab Mock */}
      <SafeAreaView className="bg-white border-t border-slate-100 flex-row justify-around py-2">
        <TouchableOpacity className="items-center">
          <View className="bg-blue-600 p-2 rounded-xl">
            <Package size={24} color="white" />
          </View>
          <Text className="text-blue-600 text-xs mt-1 font-bold">Kho</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center justify-center">
          <Bell size={24} color="#94a3b8" />
          <Text className="text-slate-400 text-xs mt-1">Thông báo</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center justify-center">
          <LogOut size={24} color="#94a3b8" />
          <Text className="text-slate-400 text-xs mt-1">Cài đặt</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default DashboardScreen;
