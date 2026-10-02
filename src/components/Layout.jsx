import React from 'react';
import Background from './Background';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <Background>
      <Header />
      {children}
      <Footer />
    </Background>
  );
}
