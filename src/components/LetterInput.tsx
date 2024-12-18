import React, { useRef, useEffect } from 'react';

interface LetterInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  focused: boolean;
  disabled?: boolean;
}

export function LetterInput({ value, onChange, onKeyDown, focused, disabled }: LetterInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focused]);

  return (
    <input
      ref={inputRef}
      type="text"
      maxLength={1}
      value={value}
      onChange={(e) => onChange(e.target.value.toUpperCase())}
      onKeyDown={onKeyDown}
      disabled={disabled}
      className="w-12 h-12 text-center text-xl font-bold border-2 rounded-lg 
                 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                 disabled:bg-gray-100 disabled:text-gray-500
                 uppercase glass-effect text-white"
    />
  );
}