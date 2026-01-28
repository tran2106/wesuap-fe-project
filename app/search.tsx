import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Animated, Easing, Dimensions, PanResponder, Platform } from 'react-native';
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

export function SearchContent() {
	const [index, setIndex] = React.useState(0);
	const current = MATCHES[index];
	const next = () => setIndex((i) => (i + 1) % MATCHES.length);
	const prev = () => setIndex((i) => (i - 1 + MATCHES.length) % MATCHES.length);

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

	const nextHandler = () => changeIndex(1);
	const prevHandler = () => changeIndex(-1);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Matches ({index + 1}/{MATCHES.length})</Text>

			{/* Full-width profile card */}
			<View style={styles.cardContainer}>
				<Animated.View
					style={{ transform: [{ translateX }], opacity, width: '100%', maxWidth: 720, flex: 1 }}
					{...panResponder.panHandlers}
				>
					<ProfileCard profile={current} />
				</Animated.View>
				
				{/* Side arrows - only on web */}
				{Platform.OS === 'web' && (
					<>
						<TouchableOpacity style={styles.sideArrowLeft} onPress={prevHandler} aria-label="Previous">
							<Text style={styles.sideArrowText}>‹</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.sideArrowRight} onPress={nextHandler} aria-label="Next">
							<Text style={styles.sideArrowText}>›</Text>
						</TouchableOpacity>
					</>
				)}
			</View>

			{/* Navigation controls */}
			<View style={styles.controls}>
				<TouchableOpacity style={[styles.navBtn, styles.navLeft]} onPress={prevHandler} accessibilityRole="button">
					<Text style={styles.navText}>Prev</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.navBtn, styles.navRight]} onPress={nextHandler} accessibilityRole="button">
					<Text style={styles.navText}>Next</Text>
				</TouchableOpacity>
			</View>

			<BottomNav />
		</View>
	);
}

export default function SearchPage() {
	const [phase, setPhase] = React.useState<'loading' | 'found' | 'ready'>('loading');
	const [overlayVisible, setOverlayVisible] = React.useState(true);
	const checkScale = React.useRef(new Animated.Value(0.6)).current;
	const checkOpacity = React.useRef(new Animated.Value(0)).current;
	const titleOpacity = React.useRef(new Animated.Value(0)).current;
	const titleTranslateY = React.useRef(new Animated.Value(8)).current;
	const slideX = React.useRef(new Animated.Value(0)).current;
	const { width } = Dimensions.get('window');

	React.useEffect(() => {
		const t1 = setTimeout(() => {
			setPhase('found');
			Animated.sequence([
				Animated.parallel([
					Animated.timing(checkOpacity, { toValue: 1, duration: 220, easing: Easing.out(Easing.quad), useNativeDriver: true }),
					Animated.spring(checkScale, { toValue: 1, friction: 6, tension: 120, useNativeDriver: true }),
				]),
				Animated.parallel([
					Animated.timing(titleOpacity, { toValue: 1, duration: 260, easing: Easing.out(Easing.quad), useNativeDriver: true }),
					Animated.timing(titleTranslateY, { toValue: 0, duration: 260, easing: Easing.out(Easing.quad), useNativeDriver: true }),
				]),
				Animated.delay(400),
			]).start(() => {
				Animated.timing(slideX, {
					toValue: -width - 60,
					duration: 546, // 420 * 1.3 = slower
					easing: Easing.inOut(Easing.cubic),
					useNativeDriver: true,
				}).start(() => {
					setOverlayVisible(false);
					setPhase('ready');
				});
			});
		}, 1000);
		return () => clearTimeout(t1);
	}, [checkOpacity, checkScale, titleOpacity, titleTranslateY, slideX, width]);

	return (
		<View style={{ flex: 1 }}>
			{phase === 'ready' ? (
				<SearchContent />
			) : (
				<View style={styles.container} />
			)}
			{overlayVisible && (
				<Animated.View style={[styles.introOverlay, { transform: [{ translateX: slideX }] }]}>
					{phase === 'loading' ? (
						<>
							<ActivityIndicator size="large" color="#fff" />
							<Text style={styles.introText}>Loading...</Text>
						</>
					) : (
						<View style={{ alignItems: 'center' }}>
							<Animated.View style={[styles.checkCircle, { opacity: checkOpacity, transform: [{ scale: checkScale }] }] }>
								<Text style={styles.checkMark}>✓</Text>
							</Animated.View>
							<Animated.Text style={[styles.foundText, { opacity: titleOpacity, transform: [{ translateY: titleTranslateY }] } ]}>
								We found your match!
							</Animated.Text>
						</View>
					)}
				</Animated.View>
			)}
		</View>
	);
}

const ORANGE = '#FF6A00';
const styles = StyleSheet.create({
	container: { 
		flex: 1, 
		backgroundColor: '#FAFAFA',
	},
	title: { 
		fontSize: 22, 
		fontWeight: '700', 
		marginHorizontal: 16, 
		marginTop: 16, 
		marginBottom: 12,
		color: '#1A1A1A',
		letterSpacing: -0.3,
	},
	cardContainer: { 
		flex: 1, 
		justifyContent: 'center', 
		alignItems: 'center', 
		position: 'relative', 
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	controls: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingVertical: 16,
		backgroundColor: '#fff',
		borderTopWidth: 1,
		borderTopColor: '#E8E8E8',
	},
	navBtn: {
		backgroundColor: ORANGE,
		paddingHorizontal: 24,
		paddingVertical: 12,
		borderRadius: 12,
		borderWidth: 0,
		shadowColor: ORANGE,
		shadowOpacity: 0.3,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 3,
	},
	navLeft: {},
	navRight: {},
	navText: { 
		fontSize: 15, 
		fontWeight: '700', 
		color: '#fff',
		letterSpacing: 0.3,
	},
	loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FF6A00' },
	introOverlay: { 
		position: 'absolute', 
		top: 0, 
		left: 0, 
		right: 0, 
		bottom: 0, 
		backgroundColor: ORANGE, 
		alignItems: 'center', 
		justifyContent: 'center' 
	},
	introText: { marginTop: 12, color: '#fff', fontSize: 14, fontWeight: '600' },
	checkCircle: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
	checkMark: { fontSize: 52, color: ORANGE, fontWeight: '800' },
	foundText: { marginTop: 14, color: '#fff', fontSize: 18, fontWeight: '800' },
	sideArrowText: { fontSize: 20, color: '#fff', fontWeight: '700' },
	sideArrowLeft: {
		position: 'absolute',
		left: 8,
		top: '50%',
		marginTop: -22,
		backgroundColor: ORANGE,
		borderColor: 'transparent',
		borderWidth: 0,
		borderRadius: 22,
		width: 44,
		height: 44,
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 100,
		shadowColor: ORANGE,
		shadowOpacity: 0.35,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 3,
	},
	sideArrowRight: {
		position: 'absolute',
		right: 8,
		top: '50%',
		marginTop: -22,
		backgroundColor: ORANGE,
		borderColor: 'transparent',
		borderWidth: 0,
		borderRadius: 22,
		width: 44,
		height: 44,
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 100,
		shadowColor: ORANGE,
		shadowOpacity: 0.35,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 3,
	},
});
