import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export type Profile = {
  id: string;
  displayName: string;
  location: string;
  bio: string;
  avatarUrl: string;
  headline?: string; // short one-line headline
  skills?: string[]; // skill tags
};

type Props = {
  profile: Profile;
};

export default function ProfileCard({ profile }: Props) {
  return (
    <View style={styles.card}>
      {/* Left: Avatar */}
      <Image source={{ uri: profile.avatarUrl }} style={styles.avatar} />

      {/* Middle: Text content */}
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{profile.displayName}</Text>
            <Text style={styles.location}>{profile.location}</Text>
          </View>
          {/* Right: Send Offer button */}
          <TouchableOpacity style={styles.offerButton} accessibilityRole="button">
            <Text style={styles.offerButtonText}>Send Offer</Text>
          </TouchableOpacity>
        </View>

        {profile.headline ? (
          <Text style={styles.headline} numberOfLines={2}>
            {profile.headline}
          </Text>
        ) : null}

        <Text style={styles.bio} numberOfLines={3}>{profile.bio}</Text>

        {/* Skill tags placeholder */}
        <View style={styles.tagsRow}>
          {profile.skills?.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e5e5e5',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30, // keep circular
    backgroundColor: '#f2f2f2',
    marginRight: 12,
    alignSelf: 'flex-start',
  },
  content: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  name: {
    fontSize: 16, // smaller
    fontWeight: '700',
    color: '#111',
  },
  location: {
    fontSize: 12, // smaller
    color: '#666',
    marginTop: 2,
  },
  offerButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#ff7a00',
    borderRadius: 8,
    marginLeft: 8,
  },
  offerButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  headline: {
    fontSize: 14,
    color: '#222',
    marginBottom: 4,
  },
  bio: {
    fontSize: 13,
    color: '#333',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e0e0e0',
  },
  tagText: {
    fontSize: 12,
    color: '#444',
  },
});
