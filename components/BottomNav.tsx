import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function BottomNav() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity accessibilityRole="button" onPress={() => router.push('/search')} style={styles.item}>
        <Ionicons name="search" size={24} color="#555" />
      </TouchableOpacity>
      <TouchableOpacity accessibilityRole="button" onPress={() => router.push('/wallet')} style={styles.item}>
        <Ionicons name="card" size={24} color="#555" />
      </TouchableOpacity>
      <TouchableOpacity accessibilityRole="button" onPress={() => router.push('/profile')} style={styles.item}>
        <Ionicons name="person" size={24} color="#555" />
      </TouchableOpacity>
      <TouchableOpacity accessibilityRole="button" onPress={() => router.push('/messages')} style={styles.item}>
        <Ionicons name="chatbubble" size={24} color="#555" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 64,
    backgroundColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e5e5e5',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12, // safe area inset for iOS
    zIndex: 1000,
    elevation: 10, // Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  }
});
