import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Github, Linkedin, Mail, Globe } from 'lucide-react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const AboutContainer = styled.div`
  min-height: calc(100vh - 80px); // Adjust based on your header height
  background: linear-gradient(135deg, #f6f8fc 0%, #ffffff 100%);
  padding: 4rem 2rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  animation: ${fadeIn} 0.6s ease-out;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const HeroSection = styled.div`
  @media (max-width: 968px) {
    text-align: center;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  color: #1a1c20;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  background: linear-gradient(135deg, #2d3436 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #4b5563;
  line-height: 1.7;
  margin-bottom: 2rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  color: #1a1c20;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  font-size: 0.95rem;
  color: #6b7280;
  line-height: 1.5;
`;

const AuthorSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
`;

const AuthorImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background: linear-gradient(135deg, #61dafb 0%, #3b82f6 100%);
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
`;

const AuthorName = styled.h2`
  font-size: 1.8rem;
  color: #1a1c20;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const AuthorRole = styled.p`
  font-size: 1.1rem;
  color: #6b7280;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const TechStack = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const TechBadge = styled.span`
  padding: 0.5rem 1rem;
  background: #f3f4f6;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #4b5563;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  justify-content: center;

  a {
    color: #3b82f6;
    transition: color 0.3s;

    &:hover {
      color: #2d3436;
    }
  }
`;

const About: React.FC = () => (
  <AboutContainer>
    <ContentWrapper>
      <HeroSection>
        <Title>Welcome to Pet Gallery</Title>
        <Subtitle>
          Discover and download adorable pet photos with our interactive gallery experience.
        </Subtitle>
        
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>🔍</FeatureIcon>
            <FeatureTitle>Smart Search</FeatureTitle>
            <FeatureDescription>
              Easily find pets by name or description with our intelligent search system.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>⭐</FeatureIcon>
            <FeatureTitle>Easy Selection</FeatureTitle>
            <FeatureDescription>
              Select multiple pets at once and manage your favorites with simple controls.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>⬇️</FeatureIcon>
            <FeatureTitle>Quick Download</FeatureTitle>
            <FeatureDescription>
              Download your selected pet photos instantly with just one click.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🎨</FeatureIcon>
            <FeatureTitle>Modern Design</FeatureTitle>
            <FeatureDescription>
              Enjoy a beautiful and responsive interface that works on all devices.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </HeroSection>

      <AuthorSection>
        <AuthorImage>👨‍💻</AuthorImage>
        <AuthorName>Aritro Saha</AuthorName>
        <AuthorRole>Frontend Developer</AuthorRole>
        <Subtitle>
          Created as a demonstration project for the Eulerity Frontend Developer position, 
          showcasing modern web development practices and user-centric design.
        </Subtitle>
        <TechStack>
          <TechBadge>React</TechBadge>
          <TechBadge>TypeScript</TechBadge>
          <TechBadge>Styled Components</TechBadge>
          <TechBadge>REST API</TechBadge>
        </TechStack>
        <SocialLinks>
          <a href="https://github.com/halcyon-past" target="_blank" rel="noopener noreferrer">
            <Github size={24} />
          </a>
          <a href="https://www.linkedin.com/in/aritro-saha/" target="_blank" rel="noopener noreferrer">
            <Linkedin size={24} />
          </a>
          <a href="https://aritro.tech/" target="_blank" rel="noopener noreferrer">
            <Globe size={24} />
          </a>
          <a href="mailto:aritrosaha2025@gmail.com">
            <Mail size={24} />
          </a>
        </SocialLinks>
      </AuthorSection>
    </ContentWrapper>
  </AboutContainer>
);

export default About;
