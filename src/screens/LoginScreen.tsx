import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '../store/authSlice';
import { PrimaryButton, TextInputField } from '../components';
import type { AppDispatch, RootState } from '../store';

interface LoginScreenProps {
  navigation: any;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  
  // Default to test user credentials for convenience
  const [username, setUsername] = useState('johnd');
  const [password, setPassword] = useState('m38rmF$');
  const [errors, setErrors] = useState({ username: '', password: '', api: '' });

  const handleLogin = async () => {
    // Reset errors
    setErrors({ username: '', password: '', api: '' });

    // Basic validation
    if (!username) {
      setErrors((prev) => ({ ...prev, username: 'Username is required' }));
      return;
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, password: 'Password is required' }));
      return;
    }

    try {
      await dispatch(loginAsync({ username, password })).unwrap();
      // Navigation handled by auth state change
    } catch (err: any) {
      setErrors((prev) => ({ ...prev, api: err || 'Login failed' }));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <ScrollView
        contentContainerClassName="flex-grow"
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-6 pt-20">
          {/* Header */}
          <View className="mb-12">
            <Text className="text-4xl font-bold text-gray-900 mb-2">
              Welcome Back
            </Text>
            <Text className="text-gray-600 text-base">
              Sign in to continue shopping
            </Text>
          </View>

          {/* API Error */}
          {(errors.api || error) && (
            <View className="mb-4 p-3 bg-red-50 rounded-lg">
              <Text className="text-red-600 text-sm">{errors.api || error}</Text>
            </View>
          )}

          {/* Test Credentials Info */}
          <View className="mb-6 p-3 bg-blue-50 rounded-lg">
            <Text className="text-blue-900 text-sm font-semibold mb-1">Test Credentials:</Text>
            <Text className="text-blue-800 text-xs">Username: johnd</Text>
            <Text className="text-blue-800 text-xs">Password: m38rmF$</Text>
          </View>

          {/* Form */}
          <View className="mb-6">
            <TextInputField
              label="Username"
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              error={errors.username}
              containerClassName="mb-4"
            />
            <TextInputField
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              error={errors.password}
              containerClassName="mb-2"
            />
            <TouchableOpacity className="self-end mb-6">
              <Text className="text-primary-600 font-medium">
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <PrimaryButton
            title="Sign In"
            onPress={handleLogin}
            loading={loading}
            className="mb-6"
          />

          {/* Register Link */}
          <View className="flex-row justify-center">
            <Text className="text-gray-600">Don&apos;t have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text className="text-primary-600 font-semibold">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
