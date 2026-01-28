import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Animated, Easing, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

const ORANGE = '#FF6A00';
const { width } = Dimensions.get('window');

export default function LoadingPage() {
  const router = useRouter();
  const [phase, setPhase] = React.useState<'loading' | 'found'>('loading');

  // Animations for the FOUND phase (no fade)
  const checkScale = React.useRef(new Animated.Value(0.6)).current;
  const checkOpacity = React.useRef(new Animated.Value(1)).current; // constant visible
  const titleOpacity = React.useRef(new Animated.Value(1)).current; // constant visible
  const titleTranslateY = React.useRef(new Animated.Value(10)).current;
  const navigated = React.useRef(false);
  const slideX = React.useRef(new Animated.Value(0)).current; // swipe-left transition
  const slideScale = React.useRef(new Animated.Value(1)).current; // slight scale for visual movement

  // Simple confetti burst
  const PARTICLES = 12;
  const particles = React.useRef(
    Array.from({ length: PARTICLES }).map(() => ({
      tx: new Animated.Value(0),
      ty: new Animated.Value(0),
      op: new Animated.Value(1),
      dx: ((Math.random() * 2 - 1) * width) / 6,
      dy: ((Math.random() * 2 - 1) * 120),
      size: Math.floor(Math.random() * 6) + 4,
    }))
  ).current;

  React.useEffect(() => {
    const t1 = setTimeout(() => {
      setPhase('found');
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});

      // Confetti burst
      Animated.stagger(20,
        particles.map(p => Animated.parallel([
          Animated.timing(p.tx, { toValue: p.dx, duration: 600, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
          Animated.timing(p.ty, { toValue: p.dy, duration: 600, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
          Animated.timing(p.op, { toValue: 0, duration: 700, easing: Easing.in(Easing.quad), useNativeDriver: true }),
        ]))
      ).start();

      // Found animations (scale + slide only, no fade)
      Animated.sequence([
        Animated.spring(checkScale, { toValue: 1, friction: 6, tension: 120, useNativeDriver: true }),
        Animated.timing(titleTranslateY, { toValue: 0, duration: 280, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.delay(400),
      ]).start(() => {
        if (!navigated.current) {
          // slide a bit farther and scale slightly for emphasis
          Animated.parallel([
            Animated.timing(slideX, {
              toValue: -width - 120,
              duration: 600,
              easing: Easing.inOut(Easing.cubic),
              useNativeDriver: true,
            }),
            Animated.timing(slideScale, {
              toValue: 0.98,
              duration: 600,
              easing: Easing.inOut(Easing.cubic),
              useNativeDriver: true,
            }),
          ]).start(() => {
            navigated.current = true;
            router.replace('/search');
          });
        }
      });
    }, 1000);

    return () => clearTimeout(t1);
  }, [router, titleTranslateY, particles]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slideWrapper, { transform: [{ translateX: slideX }, { scale: slideScale }] }]}>
        <StatusBar style="light" />

        {phase === 'loading' ? (
          <>
            <ActivityIndicator size="large" color="#fff" accessibilityLabel="Loading" />
            <Text style={styles.loadingText}>Loading...</Text>
          </>
        ) : (
          <>
            <View style={styles.centerWrap}>
              <Animated.View style={[styles.checkCircle, { opacity: checkOpacity, transform: [{ scale: checkScale }] }] }>
                <Text style={styles.checkText}>✓</Text>
              </Animated.View>
              <Animated.Text style={[styles.foundTitle, { opacity: titleOpacity, transform: [{ translateY: titleTranslateY }] }] }>
                We found your match!
              </Animated.Text>
            </View>

            {/* Confetti */}
            {particles.map((p, i) => (
              <Animated.View
                key={i}
                style={[styles.confetti, {
                  opacity: p.op,
                  width: p.size, height: p.size,
                  transform: [{ translateX: p.tx }, { translateY: p.ty }],
                }]}
              />
            ))}
          </>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ORANGE,
  },
  slideWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  centerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
  },
  checkText: {
    fontSize: 56,
    lineHeight: 56,
    color: ORANGE,
    fontWeight: '800',
  },
  foundTitle: {
    marginTop: 16,
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  confetti: {
    position: 'absolute',
    top: '45%',
    left: '50%',
    backgroundColor: 'white',
    borderRadius: 2,
  },
});