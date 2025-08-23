import { ElementType } from 'react';
import {
  PiStarDuotone,
  PiNewspaperDuotone,
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
    header: 'Management',
    section: [
      {
        name: 'News',
        icon: PiNewspaperDuotone,
        href: paths.dashboard.management.news.root,
        dropdownItems: [
          {
            name: 'List',
            href: paths.dashboard.management.news.list,
          },
          {
            name: 'Create',
            href: paths.dashboard.management.news.create,
          },
        ],
      },
    ],
  },  
];
