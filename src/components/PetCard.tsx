import React from 'react';
import styled from 'styled-components';

interface PetCardProps {
  title: string;
  description: string;
  imageUrl: string;
  isSelected: boolean;
  onToggleSelect: () => void;
}

const Card = styled.div<{ isSelected: boolean }>`
  position: relative;
  border: 2px solid ${({ isSelected }) => (isSelected ? '#3b82f6' : '#e5e7eb')};
  border-radius: 12px;
  padding: 0;
  overflow: hidden;
  cursor: pointer;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%; /* 1:1 Aspect Ratio */
  overflow: hidden;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ContentContainer = styled.div`
  padding: 1.25rem;
`;

const Title = styled.h2`
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
`;

const Description = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.5;
`;

const SelectButton = styled.button<{ isSelected: boolean }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: ${({ isSelected }) => (isSelected ? '#3b82f6' : 'white')};
  border: 2px solid ${({ isSelected }) => (isSelected ? '#3b82f6' : '#e5e7eb')};
  color: ${({ isSelected }) => (isSelected ? 'white' : '#6b7280')};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 1;

  &:hover {
    background: ${({ isSelected }) => (isSelected ? '#2563eb' : '#f3f4f6')};
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const HeartIcon = styled.svg<{ isSelected: boolean }>`
  fill: ${({ isSelected }) => (isSelected ? 'white' : 'none')};
  stroke: ${({ isSelected }) => (isSelected ? 'white' : 'currentColor')};
  stroke-width: 2;
`;

const PetCard: React.FC<PetCardProps> = ({
  title,
  description,
  imageUrl,
  isSelected,
  onToggleSelect,
}) => (
  <Card isSelected={isSelected} onClick={onToggleSelect}>
    <ImageContainer>
      <Image src={imageUrl} alt={title} />
    </ImageContainer>
    <SelectButton
      isSelected={isSelected}
      onClick={(e) => {
        e.stopPropagation();
        onToggleSelect();
      }}
    >
      <HeartIcon
        isSelected={isSelected}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </HeartIcon>
    </SelectButton>
    <ContentContainer>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </ContentContainer>
  </Card>
);

export default PetCard;