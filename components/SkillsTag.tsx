import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export type Skill =
  | 'Affiliated Marketing'
  | 'Art'
  | 'Art & Design'
  | 'Automobile'
  | 'Beauty'
  | 'Bikes'
  | 'Books'
  | 'Brand Strategy'
  | 'Business Growth & Finance'
  | 'Career Boost & Mentorship'
  | 'Cleaning'
  | 'Clothes'
  | 'Coffee'
  | 'Coffee Chat'
  | 'Concert Tickets'
  | 'Content Creation'
  | 'Data Entry'
  | 'Delivery'
  | 'Design & Creative Skills'
  | 'DIY'
  | 'Drawing'
  | 'Education'
  | 'Electronics'
  | 'Entertainment'
  | 'Event Planning'
  | 'Eyelashes'
  | 'Fashion'
  | 'Fitness & Wellness'
  | 'Food and Beverages'
  | 'Furniture'
  | 'Furniture Assembly'
  | 'Games & Toys'
  | 'Groceries'
  | 'Grocery Shopper'
  | 'Hair'
  | 'Hair & Beauty'
  | 'Handyman Services'
  | 'Home'
  | 'Home & Living'
  | 'Laundry'
  | 'Marketing'
  | 'Marketing & Sales'
  | 'Mentorship'
  | 'Moving / Packing Boxes'
  | 'Music Lessons'
  | 'Nails'
  | 'Networking'
  | 'Online Courses'
  | 'Other'
  | 'Painting'
  | 'Personal Wellbeing & Lifestyle'
  | 'Pets'
  | 'Photography'
  | 'Professional Development'
  | 'Professional Services'
  | 'Rides'
  | 'Social Connections'
  | 'Sports'
  | 'Tattoos'
  | 'Tech Support & Development'
  | 'Toys'
  | 'Transportation'
  | 'Travel'
  | 'Tutoring'
  | 'Web Design'
  | 'Web Development'
  | 'Wellness'
  | 'Yoga';

const COLOR_MAP: Record<string, { bg: string; fg: string; border: string }> = {
  'Affiliated Marketing': { bg: '#FFF3E0', fg: '#E65100', border: '#FFCC80' },
  Art: { bg: '#FCE4EC', fg: '#AD1457', border: '#F48FB1' },
  'Art & Design': { bg: '#E3F2FD', fg: '#0D47A1', border: '#90CAF9' },
  Automobile: { bg: '#E0F2F1', fg: '#004D40', border: '#80CBC4' },
  Beauty: { bg: '#FFFDE7', fg: '#827717', border: '#FFF59D' },
  Bikes: { bg: '#E8F5E9', fg: '#1B5E20', border: '#A5D6A7' },
  Books: { bg: '#EDE7F6', fg: '#311B92', border: '#B39DDB' },
  'Brand Strategy': { bg: '#F3E5F5', fg: '#4A148C', border: '#CE93D8' },
  'Business Growth & Finance': { bg: '#E0F7FA', fg: '#006064', border: '#80DEEA' },
  'Career Boost & Mentorship': { bg: '#FFF3E0', fg: '#E65100', border: '#FFCC80' },
  Cleaning: { bg: '#E1F5FE', fg: '#01579B', border: '#81D4FA' },
  Clothes: { bg: '#F1F8E9', fg: '#33691E', border: '#C5E1A5' },
  Coffee: { bg: '#EFEBE9', fg: '#4E342E', border: '#BCAAA4' },
  'Coffee Chat': { bg: '#EFEBE9', fg: '#3E2723', border: '#D7CCC8' },
  'Concert Tickets': { bg: '#F3E5F5', fg: '#4A148C', border: '#CE93D8' },
  'Content Creation': { bg: '#E8EAF6', fg: '#1A237E', border: '#9FA8DA' },
  'Data Entry': { bg: '#EDE7F6', fg: '#311B92', border: '#B39DDB' },
  Delivery: { bg: '#FFFDE7', fg: '#827717', border: '#FFF59D' },
  'Design & Creative Skills': { bg: '#E3F2FD', fg: '#0D47A1', border: '#90CAF9' },
  DIY: { bg: '#F1F8E9', fg: '#2E7D32', border: '#AED581' },
  Drawing: { bg: '#FCE4EC', fg: '#880E4F', border: '#F48FB1' },
  Education: { bg: '#E8F5E9', fg: '#1B5E20', border: '#A5D6A7' },
  Electronics: { bg: '#E0F7FA', fg: '#006064', border: '#80DEEA' },
  Entertainment: { bg: '#EDE7F6', fg: '#4A148C', border: '#B39DDB' },
  'Event Planning': { bg: '#FFF3E0', fg: '#E65100', border: '#FFCC80' },
  Eyelashes: { bg: '#FCE4EC', fg: '#AD1457', border: '#F48FB1' },
  Fashion: { bg: '#FFF3E0', fg: '#E65100', border: '#FFCC80' },
  'Fitness & Wellness': { bg: '#E0F2F1', fg: '#004D40', border: '#80CBC4' },
  'Food and Beverages': { bg: '#FFFDE7', fg: '#827717', border: '#FFF59D' },
  Furniture: { bg: '#E8EAF6', fg: '#1A237E', border: '#9FA8DA' },
  'Furniture Assembly': { bg: '#F1F8E9', fg: '#2E7D32', border: '#AED581' },
  'Games & Toys': { bg: '#E3F2FD', fg: '#0D47A1', border: '#90CAF9' },
  Groceries: { bg: '#E0F7FA', fg: '#006064', border: '#80DEEA' },
  'Grocery Shopper': { bg: '#E0F7FA', fg: '#004D40', border: '#80DEEA' },
  Hair: { bg: '#FCE4EC', fg: '#880E4F', border: '#F48FB1' },
  'Hair & Beauty': { bg: '#FCE4EC', fg: '#AD1457', border: '#F48FB1' },
  'Handyman Services': { bg: '#F1F8E9', fg: '#33691E', border: '#C5E1A5' },
  Home: { bg: '#E8F5E9', fg: '#1B5E20', border: '#A5D6A7' },
  'Home & Living': { bg: '#E8F5E9', fg: '#2E7D32', border: '#A5D6A7' },
  Laundry: { bg: '#E1F5FE', fg: '#01579B', border: '#81D4FA' },
  Marketing: { bg: '#F3E5F5', fg: '#4A148C', border: '#CE93D8' },
  'Marketing & Sales': { bg: '#F3E5F5', fg: '#6A1B9A', border: '#CE93D8' },
  Mentorship: { bg: '#E8EAF6', fg: '#283593', border: '#9FA8DA' },
  'Moving / Packing Boxes': { bg: '#FFFDE7', fg: '#827717', border: '#FFF59D' },
  'Music Lessons': { bg: '#EDE7F6', fg: '#311B92', border: '#B39DDB' },
  Nails: { bg: '#FCE4EC', fg: '#880E4F', border: '#F48FB1' },
  Networking: { bg: '#E8EAF6', fg: '#1A237E', border: '#9FA8DA' },
  'Online Courses': { bg: '#E3F2FD', fg: '#0D47A1', border: '#90CAF9' },
  Other: { bg: '#ECEFF1', fg: '#37474F', border: '#CFD8DC' },
  Painting: { bg: '#FCE4EC', fg: '#AD1457', border: '#F48FB1' },
  'Personal Wellbeing & Lifestyle': { bg: '#E0F2F1', fg: '#004D40', border: '#80CBC4' },
  Pets: { bg: '#E8F5E9', fg: '#2E7D32', border: '#A5D6A7' },
  Photography: { bg: '#E3F2FD', fg: '#0D47A1', border: '#90CAF9' },
  'Professional Development': { bg: '#E8EAF6', fg: '#283593', border: '#9FA8DA' },
  'Professional Services': { bg: '#E8EAF6', fg: '#1A237E', border: '#9FA8DA' },
  Rides: { bg: '#E1F5FE', fg: '#01579B', border: '#81D4FA' },
  'Social Connections': { bg: '#EDE7F6', fg: '#4A148C', border: '#B39DDB' },
  Sports: { bg: '#E3F2FD', fg: '#0D47A1', border: '#90CAF9' },
  Tattoos: { bg: '#FCE4EC', fg: '#AD1457', border: '#F48FB1' },
  'Tech Support & Development': { bg: '#E8EAF6', fg: '#1A237E', border: '#9FA8DA' },
  Toys: { bg: '#E3F2FD', fg: '#0D47A1', border: '#90CAF9' },
  Transportation: { bg: '#E1F5FE', fg: '#01579B', border: '#81D4FA' },
  Travel: { bg: '#E0F7FA', fg: '#006064', border: '#80DEEA' },
  Tutoring: { bg: '#E8F5E9', fg: '#1B5E20', border: '#A5D6A7' },
  'Web Design': { bg: '#E8EAF6', fg: '#1A237E', border: '#9FA8DA' },
  'Web Development': { bg: '#E3F2FD', fg: '#0D47A1', border: '#90CAF9' },
  Wellness: { bg: '#E0F2F1', fg: '#004D40', border: '#80CBC4' },
  Yoga: { bg: '#E8F5E9', fg: '#1B5E20', border: '#A5D6A7' },
};

export default function SkillsTag({ label }: { label: Skill }) {
  const colors = COLOR_MAP[label] ?? { bg: '#ECEFF1', fg: '#37474F', border: '#CFD8DC' };
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
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
  },
});
