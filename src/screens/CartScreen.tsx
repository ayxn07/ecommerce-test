import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
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
          <View className="px-6 mb-4" testID={`cart-item-${item.id}`}>
            <Card className="p-4">
              <View className="flex-row">
                <Image
                  source={{ uri: item.image }}
                  className="w-24 h-24 rounded-lg"
                  resizeMode="cover"
                />
                <View className="flex-1 ml-4">
                  <View className="flex-row justify-between">
                    <Text className="text-gray-900 font-semibold text-base flex-1 pr-2" numberOfLines={2}>
                      {item.name}
                    </Text>
                    <TouchableOpacity
                      onPress={() => dispatch(removeFromCart(item.id))}
                      className="p-1"
                      testID={`remove-item-${item.id}`}
                    >
                      <Ionicons name="trash-outline" size={20} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                  
                  {item.selectedSize && (
                    <View className="flex-row items-center mt-1">
                      <Text className="text-gray-500 text-xs">Size: </Text>
                      <View className="bg-gray-100 px-2 py-0.5 rounded">
                        <Text className="text-gray-700 text-xs font-semibold">{item.selectedSize}</Text>
                      </View>
                    </View>
                  )}

                  <View className="flex-row items-center justify-between mt-3">
                    <Text className="text-gray-900 font-bold text-lg">
                      ${item.price}
                    </Text>
                    <View className="flex-row items-center bg-gray-50 rounded-lg">
                      <TouchableOpacity
                        onPress={() =>
                          dispatch(
                            updateQuantity({ id: item.id, quantity: item.quantity - 1 })
                          )
                        }
                        className="w-8 h-8 items-center justify-center"
                        testID={`decrease-quantity-${item.id}`}
                      >
                        <Ionicons name="remove" size={18} color="#374151" />
                      </TouchableOpacity>
                      <Text className="mx-3 font-semibold text-gray-900" testID={`item-quantity-${item.id}`}>
                        {item.quantity}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          dispatch(
                            updateQuantity({ id: item.id, quantity: item.quantity + 1 })
                          )
                        }
                        className="w-8 h-8 items-center justify-center"
                        testID={`increase-quantity-${item.id}`}
                      >
                        <Ionicons name="add" size={18} color="#16a34a" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </Card>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 120 }}
        testID="cart-items-list"
      />

      {/* Checkout Footer */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4" style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
      }}>
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-gray-600 text-sm">Subtotal:</Text>
          <Text className="text-gray-900 font-semibold text-lg">
            ${total.toFixed(2)}
          </Text>
        </View>
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-gray-900 font-bold text-base">Total:</Text>
          <Text className="text-gray-900 font-bold text-2xl" testID="cart-total">
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
