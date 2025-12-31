import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  HomeScreen,
  CategoriesScreen,
  SearchScreen,
  WishlistScreen,
  CartScreen,
  ProfileScreen,
} from '../screens';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { View, Text } from 'react-native';

export type MainTabsParamList = {
  Home: undefined;
  Categories: undefined;
  Search: undefined;
  Wishlist: undefined;
  Cart: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabsParamList>();

const Badge = ({ count }: { count: number }) => {
  if (count === 0) return null;
  return (
    <View className="absolute -top-1 -right-1 bg-primary-600 rounded-full w-5 h-5 items-center justify-center">
      <Text className="text-white text-xs font-bold">{count > 9 ? '9+' : count}</Text>
    </View>
  );
};

export const MainTabs = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#16a34a',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#e5e7eb',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>📂</Text>,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🔍</Text>,
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <Text style={{ fontSize: 24 }}>❤️</Text>
              <Badge count={wishlistItems.length} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <Text style={{ fontSize: 24 }}>🛒</Text>
              <Badge count={cartItems.length} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>👤</Text>,
        }}
      />
    </Tab.Navigator>
  );
};
