import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const DownloadItem = styled.div`
  background: #f3f4f6;
  padding: 1rem;
  margin: 0.5rem 0;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ClearButton = styled.button`
  background: #ef4444;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.2s ease;

  &:hover {
    background: #dc2626;
  }
`;

const Downloads: React.FC = () => {
  const [downloads, setDownloads] = useState<{ title: string, url: string, downloadedAt: string }[]>([]);

  useEffect(() => {
    const savedDownloads = JSON.parse(localStorage.getItem("downloadHistory") || "[]");
    setDownloads(savedDownloads);
  }, []);

  const handleClearHistory = () => {
    localStorage.removeItem("downloadHistory");
    setDownloads([]);
  };

  return (
    <Container>
      <h2>Downloaded Pets</h2>
      {downloads.length > 0 ? (
        <>
          {downloads.map((download, index) => (
            <DownloadItem key={index}>
              <div>
                <h3>{download.title}</h3>
                <p>Downloaded on: {new Date(download.downloadedAt).toLocaleString()}</p>
              </div>
              <img src={download.url} alt={download.title} width="60" height="60" style={{ borderRadius: '8px' }} />
            </DownloadItem>
          ))}
          <ClearButton onClick={handleClearHistory}>Clear History</ClearButton>
        </>
      ) : (
        <p>No downloads to show.</p>
      )}
    </Container>
  );
};

export default Downloads;
