/*
 * toolkit.js — instruments, grouped by band.
 *
 * No percentages. A bar that says "React 87%" is a number nobody can
 * justify, and anyone technical reading a portfolio knows it. These are
 * three honest states instead:
 *
 *   shipping  in production, inside something people have installed
 *   building  what I'm working in right now
 *   learning  actively studying, nothing shipped with it yet
 */

export const levels = {
  shipping: { label: 'Shipping', rank: 3, note: 'In production' },
  building: { label: 'Building', rank: 2, note: 'Current work' },
  learning: { label: 'Learning', rank: 1, note: 'In progress' },
}

export const toolkit = [
  {
    band: 'web',
    heading: 'Web',
    caption: 'Where the journey starts, and still where most of the work happens.',
    items: [
      { name: 'React', level: 'shipping' },
      { name: 'Next.js', level: 'shipping' },
      { name: 'Node.js', level: 'shipping' },
      { name: 'Express', level: 'shipping' },
      { name: 'MongoDB', level: 'shipping' },
      { name: 'Tailwind CSS', level: 'shipping' },
      { name: 'JavaScript', level: 'shipping' },
      { name: 'Socket.io', level: 'building' },
      { name: 'Redux', level: 'building' },
      { name: 'Prisma', level: 'learning' },
    ],
  },
  {
    band: 'mobile',
    heading: 'Mobile',
    caption: 'Released on Google Play. This is the part that taught me to finish things.',
    items: [
      { name: 'React Native', level: 'shipping' },
      { name: 'Expo', level: 'shipping' },
      { name: 'Play Console', level: 'shipping' },
      { name: 'Push notifications', level: 'building' },
      { name: 'Firebase', level: 'building' },
      { name: 'Offline sync', level: 'building' },
    ],
  },
  {
    band: 'game',
    heading: 'Games · 3D',
    caption: 'One title out, plenty of altitude left. This is where I am spending my time now.',
    items: [
      { name: 'Unity', level: 'building' },
      { name: 'C#', level: 'building' },
      { name: 'Object pooling', level: 'building' },
      { name: 'Gaea', level: 'learning' },
      { name: 'Terrain & heightmaps', level: 'learning' },
      { name: 'Shaders', level: 'learning' },
    ],
  },
]
