// import React from 'react';

// type ButtonProps = {
//   label: string;
//   onClick: () => void;
//   type?: 'button' | 'submit' | 'reset'; // Use the correct type
//   className?: string;
//   disabled?: boolean;
// };

// const Button: React.FC<ButtonProps> = ({
//   label,
//   onClick,
//   type = 'button',
//   className = '',
//   disabled = false,
// }) => {
//   return (
//     <button
//       type={type} // This ensures TypeScript understands that type is one of the allowed values
//       className={`btn ${className}`}
//       onClick={onClick}
//       disabled={disabled}
//     >
//       {label}
//     </button>
//   );
// };

// export default Button;
