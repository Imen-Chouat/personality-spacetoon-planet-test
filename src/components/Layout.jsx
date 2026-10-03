import React from 'react';
import Background from './Background';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <Background>
      <Header />
      <div className="w-full flex-grow pt-24 flex flex-col justify-between">
        {children}
      </div>
      <Footer />
    </Background>
  );
}
