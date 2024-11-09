import React from 'react';
import { Menu, X, Dog } from 'lucide-react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(229, 231, 235, 0.8);

  @media (prefers-color-scheme: dark) {
    background: rgba(17, 24, 39, 0.9);
    border-bottom: 1px solid rgba(55, 65, 81, 0.8);
  }
`;

const HeaderContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }
  
  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoText = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  background: linear-gradient(to right, #2563eb, #06b6d4);
  -webkit-background-clip: text;
  color: transparent;
`;

const DesktopNav = styled.nav`
  display: none;
  align-items: center;
  gap: 2rem;
  
  @media (min-width: 768px) {
    display: flex;
  }
`;

const NavLink = styled.a<{ $isActive?: boolean }>`
  padding: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.2s ease;
  position: relative;
  color: ${props => props.$isActive ? '#2563eb' : '#64748b'};

  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #2563eb;
    transform: scaleX(${props => props.$isActive ? 1 : 0});
    transition: transform 0.2s ease;
  }

  &:hover {
    color: #2563eb;
    &:before {
      transform: scaleX(1);
    }
  }

  @media (prefers-color-scheme: dark) {
    color: ${props => props.$isActive ? '#60a5fa' : '#94a3b8'};
    
    &:before {
      background-color: #60a5fa;
    }
    
    &:hover {
      color: #60a5fa;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  color: #64748b;
  border: none;
  cursor: pointer;
  background: transparent;
  transition: color 0.2s ease;

  @media (min-width: 768px) {
    display: none;
  }

  &:hover {
    color: #2563eb;
  }

  @media (prefers-color-scheme: dark) {
    color: #94a3b8;
    &:hover {
      color: #60a5fa;
    }
  }
`;

const MobileMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  transform: translateY(${props => props.$isOpen ? '0' : '-100%'});
  opacity: ${props => props.$isOpen ? '1' : '0'};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  background: rgba(255, 255, 255,0.9);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(229, 231, 235, 0.8);
  padding: 0.5rem 0;

  @media (min-width: 768px) {
    display: none;
  }

  @media (prefers-color-scheme: dark) {
    background: rgba(40,46,60,0.9);
    border-bottom: 1px solid rgba(55, 65, 81, 0.8);
  }
`;

const MobileNavContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const MobileNavItem = styled.div`
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(229, 231, 235, 0.5);
  
  &:last-child {
    border-bottom: none;
  }

  @media (prefers-color-scheme: dark) {
    border-bottom: 1px solid rgba(55, 65, 81, 0.5);
  }
`;

const MobileNavLink = styled(NavLink)`
  display: block;
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  text-align: center;
  
  &:before {
    bottom: -2px;
  }
`;

const StyledDog = styled(Dog)`
  width: 2rem;
  height: 2rem;
  color: #2563eb;

  @media (prefers-color-scheme: dark) {
    color: #60a5fa;
  }
`;

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  return (
    <HeaderContainer>
      <HeaderContent>
        <HeaderWrapper>
          <LogoContainer>
            <StyledDog />
            <LogoText>Pet Gallery</LogoText>
          </LogoContainer>

          <DesktopNav>
            <NavLink href="/" $isActive={location.pathname === '/'}>
              Gallery
            </NavLink>
            <NavLink href="/downloads" $isActive={location.pathname === '/downloads'}>
              Downloads
            </NavLink>
            <NavLink href="/about" $isActive={location.pathname === '/about'}>
              About
            </NavLink>
          </DesktopNav>

          <MobileMenuButton onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </MobileMenuButton>
        </HeaderWrapper>
      </HeaderContent>

      <MobileMenu $isOpen={isOpen}>
        <MobileNavContainer>
          <MobileNavItem>
            <MobileNavLink href="/" $isActive={location.pathname === '/'}>
              Gallery
            </MobileNavLink>
          </MobileNavItem>
          <MobileNavItem>
            <MobileNavLink href="/downloads" $isActive={location.pathname === '/downloads'}>
              Downloads
            </MobileNavLink>
          </MobileNavItem>
          <MobileNavItem>
            <MobileNavLink href="/about" $isActive={location.pathname === '/about'}>
              About
            </MobileNavLink>
          </MobileNavItem>
        </MobileNavContainer>
      </MobileMenu>
    </HeaderContainer>
  );
};

export default Header;