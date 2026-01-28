import { View, Text, StyleSheet } from 'react-native';
import BottomNav from '@/components/BottomNav';
import ProfileCard, { type Profile } from '@/components/ProfileCard';
import { type AssetTag as AssetTagLabel } from '@/components/AssetTag';
import React from 'react';
import { useRouter } from 'expo-router';

// Single search result profile
const SEARCH_RESULT: Profile = {
	id: '2',
	displayName: 'Maya Lee',
	location: 'San Francisco, CA',
	bio: 'Product designer. Building delightful mobile experiences with a focus on user-centered design and accessibility.',
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
		{
			id: 'm2',
			title: 'UX Design Workshop',
			description: 'Learn user research and prototyping techniques.',
			tags: ['Art & Design', 'Professional Development', 'Online Courses'],
			portfolioUrl: 'https://example.com/maya-workshop',
		},
	],
};

export default function SearchPage() {
	const router = useRouter();
	const [showContent, setShowContent] = React.useState(false);
	const [isMounted, setIsMounted] = React.useState(false);

	React.useEffect(() => {
		setIsMounted(true);
	}, []);

	React.useEffect(() => {
		if (!isMounted) return;

		// Check if we came from loading page
		const cameFromLoading = sessionStorage?.getItem('cameFromLoading') === 'true';
		
		if (!cameFromLoading) {
			// Redirect to loading page if not coming from it (with slight delay to ensure router is ready)
			setTimeout(() => {
				router.replace('/loading');
			}, 0);
		} else {
			// Clear the flag and show content
			sessionStorage?.removeItem('cameFromLoading');
			setShowContent(true);
		}
	}, [router, isMounted]);

	if (!showContent) {
		return null; // Don't render anything while redirecting
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Search Results</Text>
				<Text style={styles.subtitle}>Found a potential match</Text>
			</View>

			<View style={styles.cardContainer}>
				<ProfileCard profile={SEARCH_RESULT} />
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
	},
	cardContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 16,
	},
});
