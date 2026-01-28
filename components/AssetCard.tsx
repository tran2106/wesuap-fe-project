import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import AssetTag, { type AssetTag as AssetTagType } from '@/components/AssetTag';
import { Ionicons } from '@expo/vector-icons';

export type Asset = {
  id: string;
  title: string;
  description: string; // 1–2 lines
  // support multiple tags, will render up to 3
  tags?: AssetTagType[]; // same labels as skills
  portfolioUrl: string; // CTA link
  imageUrl?: string; // optional
  socials?: Partial<{
    twitter: string;
    instagram: string;
    github: string;
    linkedin: string;
    website: string;
  }>;
};

type Props = { asset: Asset };

export default function AssetCard({ asset }: Props) {
  const openUrl = (url?: string) => {
    if (url) Linking.openURL(url).catch(() => {});
  };

  const compactTags = (asset.tags ?? []).slice(0, 3);

  return (
    <View style={styles.card}>
      {/* Optional Image */}
      <View style={styles.media}>
        {asset.imageUrl ? (
          <Image source={{ uri: asset.imageUrl }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="images-outline" size={28} color="#999" />
          </View>
        )}
      </View>

      {/* Text content */}
      <View style={styles.content}>
        {/* Top row: Title + View Portfolio */}
        <View style={styles.topRow}>
          <Text style={styles.title} numberOfLines={1}>{asset.title}</Text>
        </View>

        {/* Compact tags under title */}
        {compactTags.length ? (
          <View style={styles.tagsRow}>
            {compactTags.map((t) => (
              <View key={t} style={styles.tagWrapper}>
                <AssetTag label={t} />
              </View>
            ))}
          </View>
        ) : null}

        {/* Description */}
        <Text style={styles.desc} numberOfLines={2}>{asset.description}</Text>

        {/* Footer: Portfolio CTA only (social icons removed) */}
        <View style={styles.footer}>
          {/* View Portfolio under content */}
          <TouchableOpacity
            onPress={() => openUrl(asset.portfolioUrl)}
            style={[styles.portfolioBtn, { marginTop: 8 }]}
            accessibilityRole="button"
          >
            <Text style={styles.portfolioText}>View Portfolio →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginVertical: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e5e5e5',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  media: {
    width: 96,
    height: 96,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f6f6f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  image: { width: '100%', height: '100%' },
  placeholder: { alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' },
  content: { flex: 1 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 16.5, fontWeight: '700', color: '#111', flex: 1, marginRight: 12 },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 8,
  },
  tagWrapper: {
    marginRight: 6,
    flexShrink: 1,
  },
  desc: { marginTop: 8, fontSize: 13.5, color: '#333' },
  footer: { marginTop: 6 },
  iconBtn: { padding: 4 },
  portfolioBtn: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    backgroundColor: '#eef1f4',
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#d6d9dc',
  },
  portfolioText: { color: '#333', fontSize: 10, fontWeight: '600' },
});
