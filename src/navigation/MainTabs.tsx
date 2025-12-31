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
import { Ionicons } from '@expo/vector-icons';

export type MainTabsParamList = {
  Home: undefined;
  Categories: undefined;
  Wishlist: undefined;
  Cart: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabsParamList>();

const Badge = ({ count }: { count: number }) => {
  if (count === 0) return null;
  return (
    <View className="absolute -top-2 -right-3 bg-red-500 rounded-full min-w-[18px] h-[18px] items-center justify-center px-1">
      <Text className="text-white text-[10px] font-bold">{count > 9 ? '9+' : count}</Text>
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
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#f3f4f6',
          height: 65,
          paddingBottom: 10,
          paddingTop: 8,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? 'home' : 'home-outline'} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? 'grid' : 'grid-outline'} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View testID="wishlist-tab">
              <Ionicons 
                name={focused ? 'heart' : 'heart-outline'} 
                size={24} 
                color={color} 
              />
              <Badge count={wishlistItems.length} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View>
              <Ionicons 
                name={focused ? 'cart' : 'cart-outline'} 
                size={24} 
                color={color} 
              />
              <Badge count={cartItems.length} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? 'person' : 'person-outline'} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
