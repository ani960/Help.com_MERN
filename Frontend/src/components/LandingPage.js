import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import heroImage from "../Assests/heroImage.jpg";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { transform: translateX(-100px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  font-family: "Inter", sans-serif;
  background: linear-gradient(135deg, #fff5f2 0%, #fff 100%);
  padding: 2rem 5%;
`;

const HeroSection = styled.section`
  min-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  position: relative;

  @media (max-width: 968px) {
    flex-direction: column;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  max-width: 600px;
  animation: ${slideIn} 1s ease-out;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 1rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 968px) {
    justify-content: center;
  }
`;

const Button = styled(Link)`
  padding: 0.875rem 1.75rem;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  ${(props) =>
    props.primary
      ? `background-color: #2e7d32;
         color: white;
         &:hover {
           background-color: #1b5e20;
           transform: translateY(-2px);
         }`
      : `background-color: white;
         color: #2e7d32;
         border: 2px solid #2e7d32;
         &:hover {
           background-color: #f5f5f5;
           transform: translateY(-2px);
         }`}
`;

const HeroImageContainer = styled.div`
  animation: ${fadeIn} 1s ease-out 0.5s both;
  @media (max-width: 968px) {
    display: none;
  }
`;

const HeroImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
`;

export default function LandingPage() {
  return (
    <PageContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>Empowering Communities Through Help & Hope</HeroTitle>
          <HeroSubtitle>
            Join our platform to make a real difference in your community. Connect with opportunities, 
            track your impact, and be part of positive change.
          </HeroSubtitle>
          <ButtonContainer>
            <Button to="/pages/DonateUs/DonateItem" primary>
              Donate Now
            </Button>
            <Button to="/pages/Volunteers">Become a Volunteer</Button>
          </ButtonContainer>
        </HeroContent>
        <HeroImageContainer>
          <HeroImage src={heroImage} alt="Volunteers working together" />
        </HeroImageContainer>
      </HeroSection>
    </PageContainer>
  );
}
