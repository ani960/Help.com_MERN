import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

// Styled components for the layout
const PageContainer = styled.div`
  padding: 60px 40px;
  background-color: #f4f4f4;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2e7d32;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 40px;
  text-align: center;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const OptionButton = styled(Link)`
  padding: 15px 30px;
  background-color: #2e7d32;
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #1b5e20;
  }
`;

const GoBackButton = styled(Link)`
  padding: 10px 20px;
  background-color: #d32f2f;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  text-decoration: none;
  border-radius: 8px;
  margin-top: 30px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #b71c1c;
  }
`;

export default function BecomeADonor() {
  return (
    <PageContainer>
      <Title>Want to Make a Difference?</Title>
      <Subtitle>
        Choose how you would like to contribute to the community and make a lasting impact.
      </Subtitle>

      <OptionsContainer>
        <OptionButton to="/pages/DonateUs/DonateMoney">Donate Money</OptionButton>
        <OptionButton to="/pages/DonateUs/DonateItem">Donate Item</OptionButton>
        <OptionButton to="/pages/Volunteers">Become a Donor</OptionButton>
      </OptionsContainer>

      <GoBackButton to="/">Go Back to Home</GoBackButton>
    </PageContainer>
  );
}
