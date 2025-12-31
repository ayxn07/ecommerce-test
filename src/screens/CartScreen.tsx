import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { removeFromCart, updateQuantity } from '../store/cartSlice';
import { Card, EmptyState, PrimaryButton, Toast, useToast } from '../components';

interface CartScreenProps {
  navigation: any;
}

export const CartScreen: React.FC<CartScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);
  const { toast, showToast, hideToast } = useToast();

  if (items.length === 0) {
    return (
      <EmptyState
        icon="🛒"
        title="Cart is empty"
        message="Add products to your cart to see them here"
      />
    );
  }

  return (
    <View className="flex-1 bg-white">
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onHide={hideToast}
      />
      <View className="px-6 pt-16 pb-4">
        <Text className="text-3xl font-bold text-gray-900">Shopping Cart</Text>
        <Text className="text-gray-600 mt-2">
          {items.length} item{items.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View className="px-6 mb-4">
            <Card className="flex-row p-3">
              <Image
                source={{ uri: item.image }}
                className="w-24 h-24 rounded-lg"
                resizeMode="cover"
              />
              <View className="flex-1 ml-3">
                <Text className="text-gray-900 font-semibold text-base mb-1" numberOfLines={2}>
                  {item.name}
                </Text>
                {item.selectedColor && (
                  <Text className="text-gray-600 text-sm">Color: {item.selectedColor}</Text>
                )}
                {item.selectedSize && (
                  <Text className="text-gray-600 text-sm">Size: {item.selectedSize}</Text>
                )}
                <View className="flex-row items-center justify-between mt-2">
                  <Text className="text-gray-900 font-bold text-lg">
                    ${item.price}
                  </Text>
                  <View className="flex-row items-center">
                    <TouchableOpacity
                      onPress={() =>
                        dispatch(
                          updateQuantity({ id: item.id, quantity: item.quantity - 1 })
                        )
                      }
                      className="w-8 h-8 bg-gray-200 rounded items-center justify-center"
                    >
                      <Text className="text-gray-800 font-bold">-</Text>
                    </TouchableOpacity>
                    <Text className="mx-4 font-semibold">{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() =>
                        dispatch(
                          updateQuantity({ id: item.id, quantity: item.quantity + 1 })
                        )
                      }
                      className="w-8 h-8 bg-primary-600 rounded items-center justify-center"
                    >
                      <Text className="text-white font-bold">+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => dispatch(removeFromCart(item.id))}
                className="ml-2"
              >
                <Text className="text-red-500 text-xl">🗑️</Text>
              </TouchableOpacity>
            </Card>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Checkout Footer */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-gray-600 text-base">Total:</Text>
          <Text className="text-gray-900 font-bold text-2xl">
            ${total.toFixed(2)}
          </Text>
        </View>
        <PrimaryButton
          title="Proceed to Checkout"
          onPress={() => {
            showToast('Checkout feature coming soon!', 'info');
          }}
        />
      </View>
    </View>
  );
};
