import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomNav from '@/components/BottomNav';
import ProfileCard, { type Profile } from '@/components/ProfileCard';
import { type AssetTag as AssetTagLabel } from '@/components/AssetTag';
import React from 'react';

const MATCHES: Profile[] = [
	{
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
			{
				id: 'a2',
				title: 'TypeScript Fundamentals',
				description: 'Learn typing patterns for scalable JS code.',
				tags: ['Online Courses', 'Professional Development'],
				portfolioUrl: 'https://example.com/ts-course',
			},
		],
	},
	{
		id: '2',
		displayName: 'Maya Lee',
		location: 'San Francisco, CA',
		bio: 'Product designer. Building delightful mobile experiences.',
		avatarUrl: 'https://i.pravatar.cc/150?img=5',
		skills: ['Art & Design', 'Web Design', 'Marketing & Sales'] as AssetTagLabel[],
		socials: {
			instagram: 'https://instagram.com/maya',
			website: 'https://maya.design',
		},
		assets: [
			{
				id: 'm1',
				title: 'Mobile UI Kit',
				description: 'Pixel-perfect components for iOS/Android.',
				tags: ['Art & Design', 'Web Design', 'Content Creation'],
				portfolioUrl: 'https://example.com/maya-ui',
				imageUrl: 'https://picsum.photos/200/200?random=10',
				socials: { instagram: 'https://instagram.com/maya' },
			},
		],
	},
	{
		id: '3',
		displayName: 'Samir Patel',
		location: 'Austin, TX',
		bio: 'Full-stack engineer. Open source contributor.',
		avatarUrl: 'https://i.pravatar.cc/150?img=8',
		skills: ['Data', 'Professional Development', 'Networking'] as AssetTagLabel[],
		socials: {
			linkedin: 'https://linkedin.com/in/samir',
			github: 'https://github.com/samir',
		},
		assets: [
			{
				id: 's1',
				title: 'Data Viz Workshop',
				description: 'Make compelling charts with D3 and React.',
				tags: ['Professional Development', 'Online Courses', 'Networking'],
				portfolioUrl: 'https://example.com/samir-dataviz',
				socials: { linkedin: 'https://linkedin.com/in/samir' },
			},
		],
	},
];

export default function MatchedPage() {
	const [index, setIndex] = React.useState(0);
	const current = MATCHES[index];

	const next = () => setIndex((i) => (i + 1) % MATCHES.length);
	const prev = () => setIndex((i) => (i - 1 + MATCHES.length) % MATCHES.length);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Matches ({index + 1}/{MATCHES.length})</Text>

			{/* Full-width profile card */}
			<View style={styles.cardContainer}>
				<ProfileCard profile={current} />
			</View>

			{/* Navigation controls */}
			<View style={styles.controls}>
				<TouchableOpacity style={[styles.navBtn, styles.navLeft]} onPress={prev} accessibilityRole="button">
					<Text style={styles.navText}>Prev</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.navBtn, styles.navRight]} onPress={next} accessibilityRole="button">
					<Text style={styles.navText}>Next</Text>
				</TouchableOpacity>
			</View>

			<BottomNav />
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#fff' },
	title: { fontSize: 20, fontWeight: '600', marginHorizontal: 16, marginTop: 12, marginBottom: 8 },
	cardContainer: { flex: 1, justifyContent: 'center' },
	controls: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	
	
	navBtn: {
		backgroundColor: '#f2f2f2',
		paddingHorizontal: 16,
		paddingVertical: 10,
		borderRadius: 8,
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: '#ddd',
	},
	navLeft: {},
	navRight: {},
	navText: { fontSize: 14, fontWeight: '600', color: '#333' },
});
