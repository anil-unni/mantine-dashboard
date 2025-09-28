import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { GroupProps, ElementProps, Title, Breadcrumbs, Anchor, Text, Group } from '@mantine/core';

interface PageHeaderProps
  extends Omit<GroupProps, 'title'>,
  ElementProps<'header', keyof GroupProps> {
  title: ReactNode;
  description?: string;
  rightSection?: ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export function PageHeader({
  children,
  title,
  description,
  rightSection,
  breadcrumbs,
  className,
  mb = 'xl',
  ...props
}: PageHeaderProps) {
  return (
    <Group component="header" justify="space-between" className={className} mb={mb} {...props}>
      <div>
        <Title component="h2" order={2}>
          {title}
        </Title>

        {description && (
          <Text c="dimmed" fz="sm" mt="xs">
            {description}
          </Text>
        )}

        {breadcrumbs && (
          <Breadcrumbs mt="sm">
            {breadcrumbs.map((breadcrumb) =>
              breadcrumb.href ? (
                <Anchor
                  fz="sm"
                  underline="never"
                  c="inherit"
                  component={NavLink}
                  key={breadcrumb.label}
                  to={breadcrumb.href}
                >
                  {breadcrumb.label}
                </Anchor>
              ) : (
                <Text key={breadcrumb.label} c="dimmed" fz="sm">
                  {breadcrumb.label}
                </Text>
              )
            )}
          </Breadcrumbs>
        )}
      </div>

      {rightSection || children}
    </Group>
  );
}
