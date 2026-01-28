import { View, Text, StyleSheet, TouchableOpacity, Animated, PanResponder, Easing } from 'react-native';
import { Platform } from 'react-native';
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

	// Animated values for smooth transitions
	const translateX = React.useRef(new Animated.Value(0)).current;
	const opacity = React.useRef(new Animated.Value(1)).current;

	const animateToCenter = () => {
		Animated.parallel([
			Animated.spring(translateX, { toValue: 0, useNativeDriver: true }),
			Animated.timing(opacity, { toValue: 1, duration: 150, easing: Easing.out(Easing.quad), useNativeDriver: true }),
		]).start();
	};

	const changeIndex = (dir: 1 | -1) => {
		// animate out in the direction
		Animated.parallel([
			Animated.timing(translateX, { toValue: dir * -60, duration: 150, easing: Easing.in(Easing.quad), useNativeDriver: true }),
			Animated.timing(opacity, { toValue: 0, duration: 150, easing: Easing.in(Easing.quad), useNativeDriver: true }),
		]).start(() => {
			setIndex((i) => (i + dir + MATCHES.length) % MATCHES.length);
			translateX.setValue(dir * 60);
			opacity.setValue(0);
			Animated.parallel([
				Animated.timing(translateX, { toValue: 0, duration: 180, easing: Easing.out(Easing.quad), useNativeDriver: true }),
				Animated.timing(opacity, { toValue: 1, duration: 180, easing: Easing.out(Easing.quad), useNativeDriver: true }),
			]).start();
		});
	};

	// PanResponder for swipe gestures
	const panResponder = React.useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 12,
			onPanResponderMove: (_, gesture) => {
				translateX.setValue(gesture.dx);
				opacity.setValue(Math.max(0.6, 1 - Math.abs(gesture.dx) / 300));
			},
			onPanResponderRelease: (_, gesture) => {
				if (gesture.dx > 80) {
					changeIndex(-1); // swipe right -> previous
				} else if (gesture.dx < -80) {
					changeIndex(1); // swipe left -> next
				} else {
					animateToCenter();
				}
			},
		})
	).current;

	const next = () => changeIndex(1);
	const prev = () => changeIndex(-1);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Matches ({index + 1}/{MATCHES.length})</Text>

			{/* Full-width profile card with swipe */}
			<View style={styles.cardContainer}>
				<Animated.View
					style={{ transform: [{ translateX }], opacity, width: '100%', maxWidth: 720 }}
					{...panResponder.panHandlers}
				>
					<ProfileCard profile={current} />
				</Animated.View>
				{Platform.OS === 'web' && (
					<>
						<TouchableOpacity style={styles.miniArrowLeft} onPress={prev} aria-label="Previous">
							<Text style={styles.miniArrowText}>‹</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.miniArrowRight} onPress={next} aria-label="Next">
							<Text style={styles.miniArrowText}>›</Text>
						</TouchableOpacity>
					</>
				)}
			</View>

			{/* Navigation controls with arrows */}
			<View style={styles.controls}>
				<TouchableOpacity style={[styles.navBtn, styles.navLeft]} onPress={prev} accessibilityRole="button">
					<Text style={styles.navText}>← Prev</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.navBtn, styles.navRight]} onPress={next} accessibilityRole="button">
					<Text style={styles.navText}>Next →</Text>
				</TouchableOpacity>
			</View>

			<BottomNav />
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#fff' },
	title: { fontSize: 20, fontWeight: '600', marginHorizontal: 16, marginTop: 12, marginBottom: 8 },
	cardContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', position: 'relative', paddingHorizontal: 24 },
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
	miniArrowText: { fontSize: 12, color: '#333', fontWeight: '700' },
	miniArrowLeft: {
		position: 'absolute',
		left: 8,
		top: '50%',
		marginTop: -10,
		backgroundColor: 'rgba(255,255,255,0.9)',
		borderColor: '#ddd',
		borderWidth: StyleSheet.hairlineWidth,
		borderRadius: 12,
		paddingHorizontal: 6,
		paddingVertical: 4,
		zIndex: 100,
		shadowColor: '#000',
		shadowOpacity: 0.15,
		shadowOffset: { width: 0, height: 1 },
		shadowRadius: 2,
		elevation: 1,
	},
	miniArrowRight: {
		position: 'absolute',
		right: 8,
		top: '50%',
		marginTop: -10,
		backgroundColor: 'rgba(255,255,255,0.9)',
		borderColor: '#ddd',
		borderWidth: StyleSheet.hairlineWidth,
		borderRadius: 12,
		paddingHorizontal: 6,
		paddingVertical: 4,
		zIndex: 100,
		shadowColor: '#000',
		shadowOpacity: 0.15,
		shadowOffset: { width: 0, height: 1 },
		shadowRadius: 2,
		elevation: 1,
	},
});
