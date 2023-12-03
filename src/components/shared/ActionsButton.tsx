// ActionsButton.tsx

import React from 'react';
import { Dropdown, type DropdownChangeEvent } from 'primereact/dropdown';
import { type SelectItemOptionsType } from 'primereact/selectitem';

interface ActionsButtonProps {
  item: any;
  actions: SelectItemOptionsType;
  disabled?: boolean;
}

const ActionsButton: React.FC<ActionsButtonProps> = ({ actions, item, disabled = false }) => {

  const handleActionChange = (e: DropdownChangeEvent) => {
    // Handle the selected action here
    (e.value as (item: any) => void)(item);
  };

  return (
    <div className="p-d-flex p-jc-center p-ai-center">
      <Dropdown
        disabled={disabled}
        options={actions}
        onChange={handleActionChange}
        placeholder="Acciones"
      />
    </div>
  );
};

export default ActionsButton;
