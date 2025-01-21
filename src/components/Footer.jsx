import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p>&copy; {new Date().getFullYear()} ShoeBuy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
