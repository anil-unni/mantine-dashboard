import {
  PiGearSixDuotone,
  PiSignOut,
  PiUserSwitchDuotone,
} from 'react-icons/pi';
import { Avatar, AvatarProps, ElementProps, Menu } from '@mantine/core';
import { useAuth, useGetAccountInfo, useLogout } from '@/hooks';

type CurrentUserProps = Omit<AvatarProps, 'src' | 'alt'> & ElementProps<'div', keyof AvatarProps>;

export function CurrentUser(props: CurrentUserProps) {
  const { mutate: logout } = useLogout();
  const { setIsAuthenticated } = useAuth();
  const { data: user } = useGetAccountInfo();

  const handleLogout = () => {
    logout({ variables: null }, { onSuccess: () => setIsAuthenticated(false) });
  };

  return (
    <Menu>
      <Menu.Target>
        <Avatar
          src={user?.avatarUrl}
          alt={user?.displayName ?? 'Current user'}
          {...props}
          style={{ cursor: 'pointer', ...props.style }}
        >
          CU
        </Avatar>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Account</Menu.Label>
        <Menu.Item leftSection={<PiGearSixDuotone size="1rem" />}>Profile Settings</Menu.Item>
        <Menu.Item leftSection={<PiUserSwitchDuotone size="1rem" />}>Switch Account</Menu.Item>

        <Menu.Divider />

        <Menu.Item leftSection={<PiSignOut size="1rem" />} onClick={handleLogout}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
