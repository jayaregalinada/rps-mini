import { useState } from 'react';
import { cn } from '../utils/cn';

function Button({
  className,
  children,
  onClick,
  withFlashing = false,
  type = 'button',
  ...props
}) {
  const [flashingButton, setFlashingButton] = useState(false);

  const handleClick = (event) => {
    onClick?.(event);

    if (withFlashing) {
      setFlashingButton(false);
      setTimeout(() => {
        setFlashingButton(true);
      }, 10);
    }
  };

  return (
    <button
      className={cn(
        'relative px-6 py-2 bg-[#FBE8B8] text-gray-900 text-sm border-8 border-gray-900 shadow-[4px_4px_0_0_black] hover:shadow-[2px_2px_0_0_black] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all cursor-pointer',
        className,
        flashingButton && 'animate-flash'
      )}
      onClick={handleClick}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
