import React, { useState } from 'react';
import { Download } from 'lucide-react';
import useFetchPets from '../hooks/useFetchPets';
import PetCard from '../components/PetCard';
import LoadingCard from '../components/LoadingCard';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { usePetContext } from '../context/PetContext';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem 0;
`;

const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: #3b82f6;
          color: white;
          &:hover { background: #2563eb; }
          &:disabled { background: #93c5fd; cursor: not-allowed; }
        `;
      case 'danger':
        return `
          background: #ef4444;
          color: white;
          &:hover { background: #dc2626; }
        `;
      default:
        return `
          background: #f3f4f6;
          color: #4b5563;
          &:hover { background: #e5e7eb; }
        `;
    }
  }}
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const StatusBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  color: #6b7280;
  font-size: 0.875rem;
`;

const LoadingContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem 0;
`;

const FloatingDownloadButton = styled(Button)`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #3b82f6;
  color: white;

  @media (min-width: 768px) {
    display: none; // Hide on larger screens
  }
`;

const DownloadIcon = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    position: absolute;
    top: -10px;
    right: -10px;
    background: #ef4444;
    color: white;
    font-size: 0.75rem;
    font-weight: bold;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
`;

const SortSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Gallery: React.FC = () => {
  const { pets, loading } = useFetchPets();
  const { selectedPets, toggleSelection, clearSelection, sorting, setSorting } = usePetContext();
  const [search, setSearch] = useState('');

  const handleSelectAll = () => {
    pets.forEach(pet => {
      if (!selectedPets.includes(pet.url)) {
        toggleSelection(pet.url);
      }
    });
  };

  const handleClearSelection = () => clearSelection();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSorting(e.target.value as 'A-Z' | 'Z-A');
  };

  const handleDownloadSelected = async () => {
    const zip = new JSZip();
    const downloadHistory = JSON.parse(localStorage.getItem("downloadHistory") || "[]");
  
    // Iterate over selected pets and add each image to the zip
    for (const url of selectedPets) {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
  
        // Find pet details and create a filename
        const pet = pets.find((pet) => pet.url === url);
        const petName = pet ? pet.title.replace(/\s+/g, '_') : 'pet_image';
  
        // Add the image to the zip file
        zip.file(`${petName}.jpeg`, blob);
  
        // Update local storage with download details
        downloadHistory.push({ title: pet?.title, url: pet?.url, downloadedAt: new Date().toISOString() });
      } catch (error) {
        console.error('Failed to fetch image:', error);
      }
    }
  
    // Save download history to local storage
    localStorage.setItem("downloadHistory", JSON.stringify(downloadHistory));
  
    // Generate the zip file and trigger download
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    saveAs(zipBlob, 'pets_images.zip');
  };
  

  const filteredPets = pets
    .filter(pet =>
      pet.title.toLowerCase().includes(search.toLowerCase()) ||
      pet.description.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => 
      sorting === 'A-Z' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );

  if (loading) {
    return (
      <LoadingContainer>
        {Array.from({ length: 8 }, (_, index) => (
          <LoadingCard key={index} />
        ))}
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <Controls>
        <SearchInput 
          placeholder="Search pets by name or description..." 
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <ButtonGroup>
          <Button onClick={handleSelectAll}>Select All</Button>
          <Button onClick={handleClearSelection} variant="danger">Clear</Button>
        </ButtonGroup>
        <SortSelect onChange={handleSortChange} value={sorting}>
          <option value="A-Z">Sort A-Z</option>
          <option value="Z-A">Sort Z-A</option>
        </SortSelect>
        <Button 
          onClick={handleDownloadSelected} 
          disabled={selectedPets.length === 0}
          variant="primary"
        >
          Download Selected ({selectedPets.length})
        </Button>
      </Controls>

      <StatusBar>
        <span>Showing {filteredPets.length} pets</span>
        <span>{selectedPets.length} selected</span>
      </StatusBar>

      <GalleryContainer>
        {filteredPets.map((pet) => (
          <PetCard
            key={pet.url}
            title={pet.title}
            description={pet.description}
            imageUrl={pet.url}
            isSelected={selectedPets.includes(pet.url)}
            onToggleSelect={() => toggleSelection(pet.url)}
          />
        ))}
      </GalleryContainer>

      {selectedPets.length > 0 && (
        <FloatingDownloadButton onClick={handleDownloadSelected} variant="primary">
          <DownloadIcon>
            <Download size={24} />
            <span>{selectedPets.length}</span>
          </DownloadIcon>
        </FloatingDownloadButton>
      )}
    </Container>
  );
};

export default Gallery;
