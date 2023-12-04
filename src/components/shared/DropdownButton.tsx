// DropdownButton.tsx
import { Button } from 'primereact/button';
import React, { useState } from 'react';

interface Link {
  text: string;
  action: React.MouseEventHandler<HTMLAnchorElement>;
}

interface DropdownButtonProps {
  children?: React.ReactNode;
  links: Link[];
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ children, links }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative inline-block">
      <Button severity="secondary"
        onClick={toggleDropdown}
      >
        {children}
      </Button>
      {isDropdownOpen && (
        <div className="absolute top-full left-0 bg-white shadow-md mt-2 py-2 rounded w-full z-20">
          {links.map((link, index) => (
            <a
              key={index}
              onClick={link.action}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              {link.text}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
