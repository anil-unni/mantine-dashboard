import { Spotlight, SpotlightActionData } from '@mantine/spotlight';
import { PiMagnifyingGlassBold as SearchIcon } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { menu } from '@/layouts/dashboard/sidebar/menu-sections';

function generateActionsFromMenu(): SpotlightActionData[] {
  const navigate = useNavigate();
  const actions: SpotlightActionData[] = [];

  menu.forEach((menuGroup) => {
    menuGroup.section.forEach((item) => {
      // Add main menu item
      actions.push({
        id: item.href,
        label: item.name,
        description: `Navigate to ${item.name}`,
        onClick: () => navigate(item.href),
        leftSection: <item.icon size="1.5rem" />,
      });

      // Add dropdown items if they exist
      if (item.dropdownItems) {
        item.dropdownItems.forEach((dropdownItem) => {
          actions.push({
            id: dropdownItem.href,
            label: `${item.name} - ${dropdownItem.name}`,
            description: `Navigate to ${dropdownItem.name}`,
            onClick: () => navigate(dropdownItem.href),
            leftSection: <item.icon size="1.5rem" />,
          });
        });
      }
    });
  });

  return actions;
}

export function SearchMenu() {
  const actions = generateActionsFromMenu();

  return (
    <Spotlight
      actions={actions}
      nothingFound="Nothing found..."
      highlightQuery
      searchProps={{
        leftSection: <SearchIcon />,
        placeholder: 'Search feature',
      }}
    />
  );
}
