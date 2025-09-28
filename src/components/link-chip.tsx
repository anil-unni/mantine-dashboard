import { forwardRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Chip, ChipProps } from '@mantine/core';

interface LinkChipProps extends ChipProps {
  href?: string;
  inline?: boolean;
}

export const LinkChip = forwardRef<HTMLInputElement, LinkChipProps>(
  ({ size = 'xs', variant = 'outline', checked = false, inline, href, ...props }, ref) => {
    if (href) {
      return (
        <Chip
          {...props}
          style={{ ...props.style, display: inline ? 'inline-block' : 'block' }}
          wrapperProps={{}}
          size={size}
          variant={variant}
          checked={checked}
          component={NavLink}
          {...({ to: href } as any)}
        />
      );
    }

    return (
      <Chip
        {...props}
        style={{ ...props.style, display: inline ? 'inline-block' : 'block' }}
        wrapperProps={{}}
        size={size}
        variant={variant}
        checked={checked}
      />
    );
  }
);
