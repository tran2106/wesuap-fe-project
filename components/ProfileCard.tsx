import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
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
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.screen}>
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
          <ScrollView style={styles.assetsScroll} contentContainerStyle={styles.assetsContent}>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    alignSelf: 'center',
    width: '92%',
    maxWidth: 480, // allow slightly larger on tablets
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e5e5e5',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    rowGap: 12, // responsive spacing between children
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
    marginBottom: 12,
  },
  bioCenter: {
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
    marginHorizontal: 8,
  },
  socials: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 10,
  },
  iconBtn: { padding: 6 },
  assetsScroll: {
    maxHeight: 300,
    marginTop: 12,
    marginBottom: 12,
  },
  assetsContent: {
    paddingBottom: 6,
  },
  footer: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  offerButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#ff7a00',
    borderRadius: 10,
  },
  offerButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});
