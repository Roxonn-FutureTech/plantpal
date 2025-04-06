import React from 'react';

interface ButtonProps {
  /**
   * The content to be displayed inside the button
   */
  children: React.ReactNode;
  
  /**
   * The variant style of the button
   */
  variant?: 'primary' | 'secondary' | 'outline';
  
  /**
   * Optional click handler
   */
  onClick?: () => void;
  
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
  
  /**
   * The size of the button
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
  size = 'medium',
  className = '',
}) => {
  const baseStyles = 'rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantStyles = {
    primary: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
    outline: 'border-2 border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500'
  };
  
  const sizeStyles = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button; 