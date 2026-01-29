import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomNav from '@/components/BottomNav';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function WalletPage() {
  const router = useRouter();

  const handleFindMatch = () => {
    // Clear any existing session storage flag
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem('cameFromLoading');
    }
    // Navigate to loading page
    router.push('/loading');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.subtitle}>Ready to find your perfect match?</Text>
        
        <TouchableOpacity 
          style={styles.matchButton}
          onPress={handleFindMatch}
          accessibilityRole="button"
          accessibilityLabel="Find my match"
        >
          <Ionicons name="search" size={24} color="#fff" />
          <Text style={styles.buttonText}>Find My Match</Text>
        </TouchableOpacity>
      </View>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FAFAFA', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  matchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#FF6A00',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#FF6A00',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
});
