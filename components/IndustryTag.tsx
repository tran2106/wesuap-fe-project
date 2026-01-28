import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export type Industry =
  | 'Engineering'
  | 'Design'
  | 'Product'
  | 'Marketing'
  | 'Finance'
  | 'Operations'
  | 'Data';

const COLOR_MAP: Record<Industry, { bg: string; fg: string; border: string }> = {
  Engineering: { bg: '#E3F2FD', fg: '#0D47A1', border: '#90CAF9' },
  Design: { bg: '#FFF3E0', fg: '#E65100', border: '#FFCC80' },
  Product: { bg: '#E8F5E9', fg: '#1B5E20', border: '#A5D6A7' },
  Marketing: { bg: '#F3E5F5', fg: '#4A148C', border: '#CE93D8' },
  Finance: { bg: '#E0F2F1', fg: '#004D40', border: '#80CBC4' },
  Operations: { bg: '#FFFDE7', fg: '#827717', border: '#FFF59D' },
  Data: { bg: '#EDE7F6', fg: '#311B92', border: '#B39DDB' },
};

export default function IndustryTag({ label }: { label: Industry }) {
  const colors = COLOR_MAP[label];
  return (
    <View
      accessibilityRole="text"
      style={[styles.tag, { backgroundColor: colors.bg, borderColor: colors.border }]}
    >
      <Text style={[styles.text, { color: colors.fg }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});
