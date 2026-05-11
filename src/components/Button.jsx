import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

export const Button = ({ title, onPress, loading, variant = 'primary', className = '' }) => {
  const baseStyles = "py-4 rounded-2xl flex-row justify-center items-center";
  const variants = {
    primary: "bg-blue-600 shadow-lg shadow-blue-500/50",
    outline: "bg-transparent border border-blue-600",
  };

  return (
    <TouchableOpacity 
      onPress={onPress} 
      disabled={loading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className={`font-semibold text-lg ${variant === 'primary' ? 'text-white' : 'text-blue-600'}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
