/*
 * profile.js — who this sheet belongs to.
 * Coordinates are Bahawalpur, Pakistan. They appear in the sheet margin
 * because a survey plate always states where it was surveyed.
 */

export const profile = {
  name: 'Hussnain Ahmad',
  role: 'Web, mobile and 3D game development',

  // Sheet margin data
  station: 'Bahawalpur, Pakistan',
  latitude: '29.3956° N',
  longitude: '71.6836° E',
  sheet: 'SHEET 01 / EDITION 2026',

  // The one line that has to land
  thesis: 'I build things and then I actually ship them.',

  intro:
    'Computer Science at The Islamia University of Bahawalpur. I started on the web with the MERN stack, moved to React Native and put my work on Google Play, and I am now climbing into 3D — Unity and Gaea, one endless runner down.',

  // Field notes: the human bits, kept short and kept in the margin where
  // they belong rather than padding out the hero.
  fieldNotes: [
    'Writes books when not writing code.',
    'Plays the kind of games I now want to build.',
    'Working toward postgraduate study in Sweden.',
  ],

  cv: '/Cv.pdf',
  email: 'workwithhussnainahmad@gmail.com',

  links: [
    { label: 'GitHub', handle: 'MrHussnainAhmad', href: 'https://github.com/MrHussnainAhmad' },
    {
      label: 'LinkedIn',
      handle: 'hussnain-ahmad-sahi',
      href: 'https://www.linkedin.com/in/hussnain-ahmad-sahi-b2b037396/',
    },
    {
      label: 'Instagram',
      handle: 'hussnain.ahmad.sahi',
      href: 'https://www.instagram.com/hussnain.ahmad.sahi/',
    },
  ],
}

/*
 * The elevation ramp. Every colour on this site comes from here, and
 * each band means one discipline. Do not add a fourth band without
 * deciding what it means.
 */
export const bands = {
  web: {
    id: 'web',
    label: 'Web',
    color: '#778C5A',
    tailwind: 'moss',
    elevationLabel: 'Sea level',
    note: 'Where it started. MERN, then Next.js.',
  },
  mobile: {
    id: 'mobile',
    label: 'Mobile',
    color: '#D39A3A',
    tailwind: 'amber',
    elevationLabel: 'Mid-slope',
    note: 'React Native, released on Google Play.',
  },
  game: {
    id: 'game',
    label: 'Games',
    color: '#A8452A',
    tailwind: 'rust',
    elevationLabel: 'Summit',
    note: 'Unity 3D and Gaea. Currently climbing.',
  },
}

export const bandOrder = ['web', 'mobile', 'game']
