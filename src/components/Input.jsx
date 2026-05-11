import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

export const Input = ({ label, placeholder, value, onChangeText, secureTextEntry, className = '' }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(!secureTextEntry);

  return (
    <View className={`mb-5 ${className}`}>
      {label && <Text className="text-slate-600 dark:text-slate-400 mb-2 font-medium ml-1">{label}</Text>}
      <View className={`flex-row items-center bg-slate-50 dark:bg-slate-800 border rounded-2xl px-4 py-1 ${isFocused ? 'border-blue-500 bg-white dark:bg-slate-900 shadow-sm' : 'border-slate-200 dark:border-slate-700'}`}>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 py-3 text-slate-800 dark:text-white"
          placeholderTextColor="#94a3b8"
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff size={20} color="#64748b" /> : <Eye size={20} color="#64748b" />}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
