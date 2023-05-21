import React, { useState, createContext } from "react";

interface MenuContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MenuContext = createContext<MenuContextType>({} as MenuContextType);

export const MenuProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <MenuContext.Provider value={{isOpen, setIsOpen}}>
      {children}
    </MenuContext.Provider>
  );
};
