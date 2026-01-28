import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import SkillsTag, { type Skill } from '@/components/SkillsTag';

export type Profile = {
  id: string;
  displayName: string;
  location: string;
  bio: string;
  avatarUrl: string;
  skills?: Skill[]; // skill tags
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

        {/* Placeholder for assets component */}
        <View style={styles.assetsPlaceholder}>
          {/* Assets component will go here */}
        </View>

        {/* Skills (optional) */}
        {profile.skills?.length ? (
          <View style={styles.tagsRowCenter}>
            {profile.skills.map((tag) => (
              <SkillsTag key={tag} label={tag} />
            ))}
          </View>
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
    maxWidth: 440, // persist size on larger screens
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
  assetsPlaceholder: {
    height: 140,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e5e5e5',
    backgroundColor: '#fafafa',
  },
  tagsRowCenter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    marginBottom: 12,
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
