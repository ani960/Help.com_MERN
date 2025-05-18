import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const FooterWrapper = styled.footer`
  background: linear-gradient(135deg, #1f4e79 0%, #2b9a8e 100%); /* Deep Blue to Teal Gradient */
  color: #ffffff;
  padding: 5rem 0 3rem;
  box-shadow: 0px -5px 15px rgba(0, 0, 0, 0.1);
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1150px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 300px;
  margin-bottom: 2rem;
`;

const FooterTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
  text-transform: uppercase;
  color: #fff;
`;

const FooterText = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: #ddd;
`;

const FooterLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  display: block;
  margin-bottom: 0.8rem;
  transition: all 0.3s ease;

  &:hover {
    color: #ffeb3b; /* Golden Yellow */
    transform: translateX(5px);
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const SocialIcon = styled.a`
  color: #fff;
  font-size: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: #ffeb3b; /* Golden Yellow */
    transform: scale(1.2);
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const ContactIcon = styled.span`
  margin-right: 1rem;
  color: #ffeb3b;
  font-size: 1.3rem;
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2.5rem;
  margin-top: 3rem;
  border-top: 2px solid rgba(255, 255, 255, 0.2);
  font-size: 1rem;
  color: #ddd;
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterContent>
        <FooterSection>
          <FooterTitle>About GiveHope</FooterTitle>
          <FooterText>
            
          GiveHope empowers communities through kindness and social welfare, 
          creating a lasting impact for those in need.
          </FooterText>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/about">About Us</FooterLink>
          <FooterLink to="/pages/DonateUs/DonateItem">Donate</FooterLink>
          <FooterLink to="/pages/Volunteers">Volunteer</FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Contact Us</FooterTitle>
          <ContactItem>
            <ContactIcon><FaEnvelope /></ContactIcon>
            info@help.org
          </ContactItem>
          <ContactItem>
            <ContactIcon><FaPhone /></ContactIcon>
            +92 3409450362
          </ContactItem>
          <SocialIcons>
            <SocialIcon href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </SocialIcon>
            <SocialIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </SocialIcon>
            <SocialIcon href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </SocialIcon>
            <SocialIcon href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn />
            </SocialIcon>
          </SocialIcons>
        </FooterSection>
      </FooterContent>
      <Copyright>
        © {new Date().getFullYear()} GiveHope. All rights reserved.
      </Copyright>
    </FooterWrapper>
  );
}



