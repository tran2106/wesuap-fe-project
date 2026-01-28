import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export type Profile = {
  id: string;
  displayName: string;
  location: string;
  bio: string;
  avatarUrl: string;
};

type Props = {
  profile: Profile;
};

export default function ProfileCard({ profile }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: profile.avatarUrl }} style={styles.avatar} />
      <View style={styles.content}>
        <Text style={styles.name}>{profile.displayName}</Text>
        <Text style={styles.location}>{profile.location}</Text>
        <Text style={styles.bio}>{profile.bio}</Text>
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
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f2f2f2',
    marginRight: 12,
  },
  content: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  bio: {
    marginTop: 6,
    fontSize: 14,
    color: '#333',
  },
});
