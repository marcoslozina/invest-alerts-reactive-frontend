import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

export default function Button({ label, className = '', ...rest }: Props) {
  return (
    <button
      className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${className}`}
      {...rest}
    >
      {label}
    </button>
  );
}
