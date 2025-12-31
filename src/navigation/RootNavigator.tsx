import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { NavigationIndependentTree } from '@react-navigation/core';
import { RootState } from '../store';
import { AuthStack } from './AuthStack';
import { MainTabs } from './MainTabs';
import { ProductListScreen, ProductDetailsScreen, SplashScreen } from '../screens';

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Main: undefined;
  ProductList: { category: string };
  ProductDetails: { productId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const [showSplash, setShowSplash] = useState(true);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isAuthenticated ? (
            <Stack.Screen name="Auth" component={AuthStack} />
          ) : (
            <>
              <Stack.Screen name="Main" component={MainTabs} />
              <Stack.Screen
                name="ProductList"
                component={ProductListScreen}
                options={{
                  headerShown: true,
                  headerBackTitle: 'Back',
                  headerStyle: { backgroundColor: '#fff' },
                  headerTintColor: '#16a34a',
                }}
              />
              <Stack.Screen
                name="ProductDetails"
                component={ProductDetailsScreen}
                options={{
                  headerShown: true,
                  headerBackTitle: 'Back',
                  headerTitle: '',
                  headerStyle: { backgroundColor: '#fff' },
                  headerTintColor: '#16a34a',
                  headerTransparent: true,
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
};
