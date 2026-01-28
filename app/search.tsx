import { View, Text, StyleSheet, ScrollView } from 'react-native';
import BottomNav from '@/components/BottomNav';
import ProfileCard, { type Profile } from '@/components/ProfileCard';
import { type Skill } from '@/components/SkillsTag';

const MOCK_PROFILES: Profile[] = [
	{
		id: '1',
		displayName: 'Alex Johnson',
		location: 'New York, NY',
		bio: 'Frontend dev. Lover of React Native and coffee.',
		avatarUrl: 'https://i.pravatar.cc/150?img=1',
		skills: ['Web Development', 'Tech Support & Development', 'Coffee'] as Skill[],
	},
	{
		id: '2',
		displayName: 'Maya Lee',
		location: 'San Francisco, CA',
		bio: 'Product designer. Building delightful mobile experiences.',
		avatarUrl: 'https://i.pravatar.cc/150?img=5',
		skills: ['Art & Design', 'Web Design', 'Marketing & Sales'] as Skill[],
	},
	{
		id: '3',
		displayName: 'Samir Patel',
		location: 'Austin, TX',
		bio: 'Full-stack engineer. Open source contributor.',
		avatarUrl: 'https://i.pravatar.cc/150?img=8',
		skills: ['Data', 'Professional Development', 'Networking'] as Skill[],
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
