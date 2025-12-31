import { cssInterop } from 'nativewind';
import {
  Image,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Modal,
} from 'react-native';

// Configure cssInterop for React Native components that need className support
cssInterop(Image, { className: 'style' });
cssInterop(FlatList, { className: 'style', contentContainerClassName: 'contentContainerStyle' });
cssInterop(ScrollView, { className: 'style', contentContainerClassName: 'contentContainerStyle' });
cssInterop(TextInput, { className: 'style' });
cssInterop(TouchableOpacity, { className: 'style' });
cssInterop(ActivityIndicator, { className: 'style' });
cssInterop(SafeAreaView, { className: 'style' });
cssInterop(KeyboardAvoidingView, { className: 'style' });
cssInterop(Modal, { className: 'style' });
