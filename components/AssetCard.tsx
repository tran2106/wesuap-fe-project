import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import AssetTag, { type AssetTag as AssetTagType } from '@/components/AssetTag';
import { Ionicons } from '@expo/vector-icons';

export type Asset = {
  id: string;
  title: string;
  description: string; // 1–2 lines
  tag: AssetTagType; // same labels as skills
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

  return (
    <View style={styles.card}>
      {/* Optional Image */}
      <View style={styles.media}>
        {asset.imageUrl ? (
          <Image source={{ uri: asset.imageUrl }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="images-outline" size={36} color="#999" />
          </View>
        )}
      </View>

      {/* Text content */}
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{asset.title}</Text>
          <AssetTag label={asset.tag} />
        </View>
        <Text style={styles.desc} numberOfLines={2}>{asset.description}</Text>

        {/* Footer: Social icons + Portfolio CTA */}
        <View style={styles.footer}>
          <View style={styles.socials}>
            {asset.socials?.twitter ? (
              <TouchableOpacity onPress={() => openUrl(asset.socials?.twitter)} accessibilityRole="button" style={styles.iconBtn}>
                <Ionicons name="logo-twitter" size={18} color="#1DA1F2" />
              </TouchableOpacity>
            ) : null}
            {asset.socials?.instagram ? (
              <TouchableOpacity onPress={() => openUrl(asset.socials?.instagram)} accessibilityRole="button" style={styles.iconBtn}>
                <Ionicons name="logo-instagram" size={18} color="#C13584" />
              </TouchableOpacity>
            ) : null}
            {asset.socials?.github ? (
              <TouchableOpacity onPress={() => openUrl(asset.socials?.github)} accessibilityRole="button" style={styles.iconBtn}>
                <Ionicons name="logo-github" size={18} color="#111" />
              </TouchableOpacity>
            ) : null}
            {asset.socials?.linkedin ? (
              <TouchableOpacity onPress={() => openUrl(asset.socials?.linkedin)} accessibilityRole="button" style={styles.iconBtn}>
                <Ionicons name="logo-linkedin" size={18} color="#0A66C2" />
              </TouchableOpacity>
            ) : null}
            {asset.socials?.website ? (
              <TouchableOpacity onPress={() => openUrl(asset.socials?.website)} accessibilityRole="button" style={styles.iconBtn}>
                <Ionicons name="globe-outline" size={18} color="#333" />
              </TouchableOpacity>
            ) : null}
          </View>

          <TouchableOpacity
            onPress={() => openUrl(asset.portfolioUrl)}
            style={styles.portfolioBtn}
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
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e5e5e5',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  media: {
    width: 88,
    height: 88,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f6f6f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  image: { width: '100%', height: '100%' },
  placeholder: { alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' },
  content: { flex: 1 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 16, fontWeight: '700', color: '#111' },
  desc: { marginTop: 6, fontSize: 13, color: '#333' },
  footer: { flexDirection: 'row', marginTop: 10, alignItems: 'center', justifyContent: 'space-between' },
  socials: { flexDirection: 'row', gap: 10 },
  iconBtn: { padding: 4 },
  portfolioBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#ff7a00',
    borderRadius: 8,
  },
  portfolioText: { color: '#fff', fontSize: 12, fontWeight: '700' },
});
