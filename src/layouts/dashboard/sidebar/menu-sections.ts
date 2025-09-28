import { ElementType } from 'react';
import {
  PiStarDuotone,
  PiNewspaperDuotone,
  PiPlusDuotone,
  PiListDuotone,
  PiGearDuotone,
} from 'react-icons/pi';
import { paths } from '@/routes/paths';

interface MenuItem {
  header: string;
  section: {
    name: string;
    href: string;
    icon: ElementType;
    dropdownItems?: {
      name: string;
      href: string;
      badge?: string;
    }[];
  }[];
}

export const menu: MenuItem[] = [
  {
    header: 'Overview',
    section: [
      {
        name: 'Welcome',
        href: paths.dashboard.home,
        icon: PiStarDuotone,
      },
    ],
  },
  {
    header: 'Content Management',
    section: [
      {
        name: 'News & Updates',
        href: paths.dashboard.news.root,
        icon: PiNewspaperDuotone,
        dropdownItems: [
          {
            name: 'All News',
            href: paths.dashboard.news.list,
          },
          {
            name: 'Create News',
            href: paths.dashboard.news.create,
          },
          {
            name: 'News Page',
            href: paths.dashboard.news.page,
          },
        ],
      },
    ],
  },
];
