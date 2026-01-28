import { View, Text, StyleSheet } from 'react-native';
import BottomNav from '@/components/BottomNav';

export default function WalletPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallet</Text>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '600' },
});
