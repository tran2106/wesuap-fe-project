import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import AssetTag, { type AssetTag as AssetTagLabel } from '@/components/AssetTag';
import AssetCard, { type Asset } from '@/components/AssetCard';
import { Ionicons } from '@expo/vector-icons';

export type Profile = {
  id: string;
  displayName: string;
  location: string;
  bio: string;
  avatarUrl: string;
  skills?: AssetTagLabel[]; // asset/skill tags
  assets?: Asset[]; // assets this profile can teach
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

export default function ProfileCard({ profile }: Props) {
  const { height } = Dimensions.get('window');
  const maxAssetHeight = Math.max(200, height * 0.35); // responsive based on screen height

  return (
    <View style={styles.cardWrapper}>
      <ScrollView 
        style={styles.screen}
        contentContainerStyle={styles.screenContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Top: Centered avatar */}
        <View style={styles.avatarSection}>
          <Image source={{ uri: profile.avatarUrl }} style={styles.avatarLarge} />
          <Text style={styles.nameLarge}>{profile.displayName}</Text>
        </View>

        {/* Location */}
        <Text style={styles.locationCenter}>{profile.location}</Text>

        {/* Bio */}
        <Text style={styles.bioCenter}>{profile.bio}</Text>

        {/* Social icons under bio */}
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

        {/* Render assets as cards */}
        {profile.assets?.length ? (
          <ScrollView 
            style={[styles.assetsScroll, { maxHeight: maxAssetHeight }]} 
            contentContainerStyle={styles.assetsContent}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={true}
          >
            {profile.assets.map((a) => (
              <AssetCard key={a.id} asset={a} />
            ))}
          </ScrollView>
        ) : null}

        {/* Bottom: Send Offer button */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.offerButton} accessibilityRole="button">
            <Text style={styles.offerButtonText}>Send Offer</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 520,
    height: '100%', // fill available space
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
  screen: {
    flex: 1,
  },
  screenContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 24,
    flexGrow: 1,
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
  iconBtn: { padding: 6 },
  assetsScroll: {
    marginTop: 12,
    marginBottom: 12,
  },
  assetsContent: {
    paddingBottom: 6,
  },
  footer: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  offerButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#ff7a00',
    borderRadius: 10,
  },
  offerButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});
