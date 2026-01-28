import type { Profile } from '@/components/ProfileCard';
import type { Asset } from '@/components/AssetCard';
import type { AssetTag as AssetTagLabel } from '@/components/AssetTag';

export const profiles: Profile[] = [
  {
    id: 'p1',
    displayName: 'Alex Johnson',
    location: 'New York, NY',
    bio: 'Frontend dev. Lover of React Native and coffee.',
    avatarUrl: 'https://i.pravatar.cc/160?img=1',
    skills: ['Web Development', 'Tech Support & Development', 'Coffee'] as AssetTagLabel[],
    socials: {
      github: 'https://github.com/alex',
      twitter: 'https://twitter.com/alex',
      website: 'https://alex.dev',
    },
    assets: [
      {
        id: 'a1',
        title: 'React Native Coaching',
        description: 'Hands-on sessions to build and ship RN apps.',
        tags: ['Web Development', 'Tech Support & Development', 'Online Courses'],
        portfolioUrl: 'https://example.com/alex-portfolio',
      },
      {
        id: 'a2',
        title: 'TypeScript Fundamentals',
        description: 'Learn typing patterns for scalable JS code.',
        tags: ['Online Courses', 'Professional Development'],
        portfolioUrl: 'https://example.com/ts-course',
      },
    ] as Asset[],
  },
  {
    id: 'p2',
    displayName: 'Maya Lee',
    location: 'San Francisco, CA',
    bio: 'Product designer. Building delightful mobile experiences.',
    avatarUrl: 'https://i.pravatar.cc/160?img=5',
    skills: ['Art & Design', 'Web Design', 'Marketing & Sales'] as AssetTagLabel[],
    socials: {
      instagram: 'https://instagram.com/maya',
      website: 'https://maya.design',
    },
    assets: [
      {
        id: 'm1',
        title: 'Mobile UI Kit',
        description: 'Pixel-perfect components for iOS/Android.',
        tags: ['Art & Design', 'Web Design', 'Content Creation'],
        portfolioUrl: 'https://example.com/maya-ui',
        imageUrl: 'https://picsum.photos/300/300?random=10',
      },
      {
        id: 'm2',
        title: 'Design Systems 101',
        description: 'Build scalable design systems for teams.',
        tags: ['Professional Development', 'Online Courses'],
        portfolioUrl: 'https://example.com/design-systems',
      },
    ] as Asset[],
  },
  {
    id: 'p3',
    displayName: 'Samir Patel',
    location: 'Austin, TX',
    bio: 'Full-stack engineer. Open source contributor.',
    avatarUrl: 'https://i.pravatar.cc/160?img=8',
    skills: ['Data', 'Professional Development', 'Networking'] as AssetTagLabel[],
    socials: {
      linkedin: 'https://linkedin.com/in/samir',
      github: 'https://github.com/samir',
    },
    assets: [
      {
        id: 's1',
        title: 'Data Viz Workshop',
        description: 'Make compelling charts with D3 and React.',
        tags: ['Professional Development', 'Online Courses', 'Networking'],
        portfolioUrl: 'https://example.com/samir-dataviz',
      },
      {
        id: 's2',
        title: 'Node.js API Coaching',
        description: 'Design and build robust REST APIs.',
        tags: ['Tech Support & Development', 'Web Development'],
        portfolioUrl: 'https://example.com/node-api',
      },
      {
        id: 's3',
        title: 'Career Mentorship',
        description: 'Guidance for junior devs navigating tech.',
        tags: ['Career Boost & Mentorship', 'Professional Development'],
        portfolioUrl: 'https://example.com/mentorship',
      },
    ] as Asset[],
  },
];
