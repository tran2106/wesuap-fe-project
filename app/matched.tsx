import { View, Text, StyleSheet } from 'react-native';
import BottomNav from '@/components/BottomNav';
import ProfileCard, { type Profile } from '@/components/ProfileCard';
import { type AssetTag as AssetTagLabel } from '@/components/AssetTag';
import React from 'react';

// Single matched profile
const MATCHED_PROFILE: Profile = {
		id: '1',
		displayName: 'Alex Johnson',
		location: 'New York, NY',
		bio: 'Frontend dev. Lover of React Native and coffee.',
		avatarUrl: 'https://i.pravatar.cc/150?img=1',
		skills: ['Web Development', 'Tech Support & Development', 'Coffee'] as AssetTagLabel[],
		socials: {
			github: 'https://github.com/alex',
			twitter: 'https://twitter.com/alex',
			website: 'https://alex.dev',
		},
		assets: [
			{
				id: 'a1',
				title: 'React Native Coaching',
				description: 'Hands-on sessions to build and ship RN apps.',
				tags: ['Web Development', 'Tech Support & Development', 'Online Courses'],
				portfolioUrl: 'https://example.com/alex-portfolio',
				socials: { github: 'https://github.com/alex', twitter: 'https://twitter.com/alex' },
			},
			{			id: 'a2',
			title: 'TypeScript Fundamentals',
			description: 'Learn typing patterns for scalable JS code.',
			tags: ['Online Courses', 'Professional Development'],
			portfolioUrl: 'https://example.com/ts-course',
		},
		{
			id: 'a3',
			title: 'Code Review Sessions',
			description: 'Get expert feedback on your codebase and architecture.',
			tags: ['Professional Development', 'Tech Support & Development'],
			portfolioUrl: 'https://example.com/code-reviews',
		},
	],
};

export default function MatchedPage() {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.badge}>✨ New Match</Text>
				<Text style={styles.title}>You've been matched!</Text>
				<Text style={styles.subtitle}>Based on your interests and skills</Text>
			</View>

			{/* Single profile card */}
			<View style={styles.cardContainer}>
				<ProfileCard profile={MATCHED_PROFILE} />
			</View>

			<BottomNav />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FAFAFA',
	},
	header: {
		paddingTop: 24,
		paddingBottom: 16,
		paddingHorizontal: 20,
		backgroundColor: '#fff',
		borderBottomWidth: 1,
		borderBottomColor: '#f0f0f0',
		alignItems: 'center',
	},
	badge: {
		fontSize: 14,
		fontWeight: '600',
		color: '#FF6A00',
		backgroundColor: '#FFF5ED',
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 12,
		marginBottom: 8,
		overflow: 'hidden',
	},
	title: {
		fontSize: 24,
		fontWeight: '700',
		color: '#1A1A1A',
		marginBottom: 4,
	},
	subtitle: {
		fontSize: 14,
		color: '#666',
		textAlign: 'center',
	},
	cardContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 16,
	},
});
