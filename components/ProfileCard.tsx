import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Platform } from 'react-native';
import AssetTag, { type AssetTag as AssetTagLabel } from '@/components/AssetTag';
import AssetCard, { type Asset } from '@/components/AssetCard';
import { Ionicons } from '@expo/vector-icons';
import OfferForm from '@/components/OfferForm';

export type Profile = {
  id: string;
  displayName: string;
  location: string;
  bio: string;
  avatarUrl: string;
  skills?: AssetTagLabel[];
  assets?: Asset[];
  socials?: Partial<{
    twitter: string;
    instagram: string;
    github: string;
    linkedin: string;
    website: string;
  }>;
};

type Props = {
  profile: Profile;
};

// Track sent offers globally by profile ID
const sentOffers = new Set<string>();

export default function ProfileCard({ profile }: Props) {
  const { height, width } = Dimensions.get('window');
  const isMobile = width < 768;
  const isWeb = Platform.OS === 'web';
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [offerSent, setOfferSent] = useState(sentOffers.has(profile.id));
  
  const cardHeight = isWeb ? Math.min(height * 0.8, 700) : undefined;

  const handleOfferSubmitted = () => {
    sentOffers.add(profile.id);
    setOfferSent(true);
    // Don't close the modal here - let the user close it manually from the success screen
  };

  return (
    <View style={[styles.cardWrapper, cardHeight ? { height: cardHeight } : { flex: 1 }]}>
      {/* Fixed Profile Section */}
      <View style={styles.fixedSection}>
        <View style={styles.avatarSection}>
          <Image source={{ uri: profile.avatarUrl }} style={styles.avatarLarge} />
          <Text style={styles.nameLarge}>{profile.displayName}</Text>
        </View>

        <Text style={styles.locationCenter}>{profile.location}</Text>
        <Text style={styles.bioCenter}>{profile.bio}</Text>

        {profile.socials ? (
          <View style={styles.socials}>
            {profile.socials.twitter ? (
              <TouchableOpacity accessibilityRole="button" onPress={() => {}} style={styles.iconBtn}>
                <Ionicons name="logo-twitter" size={20} color="#1DA1F2" />
              </TouchableOpacity>
            ) : null}
            {profile.socials.instagram ? (
              <TouchableOpacity accessibilityRole="button" onPress={() => {}} style={styles.iconBtn}>
                <Ionicons name="logo-instagram" size={20} color="#C13584" />
              </TouchableOpacity>
            ) : null}
            {profile.socials.github ? (
              <TouchableOpacity accessibilityRole="button" onPress={() => {}} style={styles.iconBtn}>
                <Ionicons name="logo-github" size={20} color="#111" />
              </TouchableOpacity>
            ) : null}
            {profile.socials.linkedin ? (
              <TouchableOpacity accessibilityRole="button" onPress={() => {}} style={styles.iconBtn}>
                <Ionicons name="logo-linkedin" size={20} color="#0A66C2" />
              </TouchableOpacity>
            ) : null}
            {profile.socials.website ? (
              <TouchableOpacity accessibilityRole="button" onPress={() => {}} style={styles.iconBtn}>
                <Ionicons name="globe-outline" size={20} color="#333" />
              </TouchableOpacity>
            ) : null}
          </View>
        ) : null}
      </View>

      {/* Scrollable Assets Section */}
      {profile.assets?.length ? (
        <ScrollView 
          style={styles.assetsScrollView}
          contentContainerStyle={styles.assetsScrollContent}
          showsVerticalScrollIndicator={true}
          bounces={true}
        >
          <View style={styles.assetsSection}>
            {profile.assets.map((a) => (
              <AssetCard key={a.id} asset={a} />
            ))}
          </View>
        </ScrollView>
      ) : null}

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.offerButton, offerSent && styles.offerButtonSent]} 
          accessibilityRole="button"
          onPress={() => !offerSent && setShowOfferForm(true)}
          disabled={offerSent}
        >
          {offerSent ? (
            <View style={styles.sentContainer}>
              <Ionicons name="checkmark-circle" size={20} color="#fff" />
              <Text style={styles.offerButtonText}>Offer Sent</Text>
            </View>
          ) : (
            <Text style={styles.offerButtonText}>Send Offer</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Offer Form Modal */}
      <OfferForm
        visible={showOfferForm}
        onClose={() => setShowOfferForm(false)}
        onSubmitSuccess={handleOfferSubmitted}
        recipientName={profile.displayName}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 520,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e5e5e5',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    overflow: 'hidden',
  },
  fixedSection: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  screen: {
    flex: 1,
  },
  screenContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 80,
  },
  assetsScrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  assetsScrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarLarge: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#f2f2f2',
    marginBottom: 8,
  },
  nameLarge: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
  },
  locationCenter: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  bioCenter: {
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
    marginHorizontal: 8,
    lineHeight: 20,
  },
  socials: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 12,
    marginBottom: 8,
  },
  iconBtn: { 
    padding: 6 
  },
  assetsSection: {
    marginTop: 12,
    marginBottom: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    elevation: 4,
  },
  offerButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#ff7a00',
    borderRadius: 10,
  },
  offerButtonSent: {
    backgroundColor: '#34C759',
  },
  sentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  offerButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});
