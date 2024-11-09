import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #f3f4f6;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  animation: ${shimmer} 1.5s infinite linear forwards;
  background: linear-gradient(
    to right,
    #f3f4f6 0%,
    #e5e7eb 50%,
    #f3f4f6 100%
  );
  background-size: 200% 100%;
`;

const ImageSkeleton = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  background-color: #e5e7eb;
`;

const TextSkeleton = styled.div.attrs<{ width: string }>(props => ({
    style: { width: props.width },
  }))<{ width: string }>`
    height: 16px;
    border-radius: 4px;
    background-color: #e5e7eb;
  `;
  

const LoadingCard: React.FC = () => (
  <Card>
    <ImageSkeleton />
    <TextSkeleton width="80%" />
    <TextSkeleton width="60%" />
  </Card>
);

export default LoadingCard;
