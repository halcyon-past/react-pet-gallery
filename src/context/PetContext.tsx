import React, { createContext, useState, useContext, ReactNode } from 'react';

interface PetContextType {
  selectedPets: string[];
  toggleSelection: (url: string) => void;
  clearSelection: () => void;
  sorting: 'A-Z' | 'Z-A';
  setSorting: (sortOrder: 'A-Z' | 'Z-A') => void;
}

const PetContext = createContext<PetContextType | undefined>(undefined);

export const PetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedPets, setSelectedPets] = useState<string[]>([]);
  const [sorting, setSorting] = useState<'A-Z' | 'Z-A'>('A-Z');

  const toggleSelection = (url: string) => {
    setSelectedPets((prev) => 
      prev.includes(url) ? prev.filter((item) => item !== url) : [...prev, url]
    );
  };

  const clearSelection = () => setSelectedPets([]);

  return (
    <PetContext.Provider value={{ selectedPets, toggleSelection, clearSelection, sorting, setSorting }}>
      {children}
    </PetContext.Provider>
  );
};

export const usePetContext = () => {
  const context = useContext(PetContext);
  if (!context) throw new Error('usePetContext must be used within a PetProvider');
  return context;
};