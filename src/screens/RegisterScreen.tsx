import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { mockUser } from '../constants/mockData';
import { PrimaryButton, TextInputField } from '../components';

interface RegisterScreenProps {
  navigation: any;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleRegister = async () => {
    // Reset errors
    setErrors({ name: '', email: '', password: '', confirmPassword: '' });

    // Basic validation
    let hasError = false;
    if (!name) {
      setErrors((prev) => ({ ...prev, name: 'Name is required' }));
      hasError = true;
    }
    if (!email) {
      setErrors((prev) => ({ ...prev, email: 'Email is required' }));
      hasError = true;
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, password: 'Password is required' }));
      hasError = true;
    }
    if (password !== confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      dispatch(login({ ...mockUser, name, email }));
      setLoading(false);
    }, 1500);
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
              Create Account
            </Text>
            <Text className="text-gray-600 text-base">
              Sign up to start shopping
            </Text>
          </View>

          {/* Form */}
          <View className="mb-6">
            <TextInputField
              label="Full Name"
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
              error={errors.name}
              containerClassName="mb-4"
            />
            <TextInputField
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
              containerClassName="mb-4"
            />
            <TextInputField
              label="Password"
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              error={errors.password}
              containerClassName="mb-4"
            />
            <TextInputField
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              error={errors.confirmPassword}
              containerClassName="mb-6"
            />
          </View>

          {/* Register Button */}
          <PrimaryButton
            title="Sign Up"
            onPress={handleRegister}
            loading={loading}
            className="mb-6"
          />

          {/* Login Link */}
          <View className="flex-row justify-center">
            <Text className="text-gray-600">Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="text-primary-600 font-semibold">Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
