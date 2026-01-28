import { View, Text, StyleSheet, ScrollView } from 'react-native';
import BottomNav from '@/components/BottomNav';
import ProfileCard, { type Profile } from '@/components/ProfileCard';

const MOCK_PROFILES: Profile[] = [
	{
		id: '1',
		displayName: 'Alex Johnson',
		location: 'New York, NY',
		bio: 'Frontend dev. Lover of React Native and coffee.',
		avatarUrl: 'https://i.pravatar.cc/150?img=1',
		headline: 'React Native Engineer | Building smooth mobile UX',
		skills: ['Engineering', 'Product', 'Design'],
	},
	{
		id: '2',
		displayName: 'Maya Lee',
		location: 'San Francisco, CA',
		bio: 'Product designer. Building delightful mobile experiences.',
		avatarUrl: 'https://i.pravatar.cc/150?img=5',
		headline: 'Mobile Product Designer | Accessibility advocate',
		skills: ['Design', 'Marketing'],
	},
	{
		id: '3',
		displayName: 'Samir Patel',
		location: 'Austin, TX',
		bio: 'Full-stack engineer. Open source contributor.',
		avatarUrl: 'https://i.pravatar.cc/150?img=8',
		headline: 'Full-stack Dev | TypeScript, Node.js, and Data viz',
		skills: ['Engineering', 'Data', 'Operations'],
	},
];

export default function SearchPage() {
	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				<Text style={styles.title}>Search</Text>
				{MOCK_PROFILES.map((p) => (
					<ProfileCard key={p.id} profile={p} />
				))}
			</ScrollView>
			<BottomNav />
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#fff' },
	scrollContent: { paddingBottom: 96 },
	title: { fontSize: 24, fontWeight: '600', margin: 16 },
});
