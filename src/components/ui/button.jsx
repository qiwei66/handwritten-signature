import React from 'react';
import { Slot } from '@radix-ui/react-slot';

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background ${
        variant === 'default'
          ? 'bg-blue-500 text-white hover:bg-blue-600'
          : variant === 'outline'
          ? 'border border-input hover:bg-accent hover:text-accent-foreground'
          : variant === 'ghost'
          ? 'hover:bg-accent hover:text-accent-foreground'
          : 'bg-blue-500 text-white hover:bg-blue-600'
      } ${
        size === 'sm'
          ? 'h-9 rounded-md px-3'
          : size === 'lg'
          ? 'h-11 rounded-md px-8'
          : 'h-10 py-2 px-4'
      } ${className}`}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = 'Button';

export { Button };
