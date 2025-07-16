// src/pages/Contact.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactPage = () => {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 py-12 px-4 flex items-start justify-center">
      <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-md space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Contact Us</h1>

        <p className="text-gray-700 text-lg">
          I love to hear from you! Reach out with any feedback, suggestions, or questions.
        </p>

        <div className="space-y-4 text-gray-700 text-base">
          <p>
            📧 <span className="font-semibold">Email:</span>{' '}
            <a
              href="mailto:priteshshortly@gmail.com"
              className="text-blue-600 hover:underline"
            >
              priteshmishra2125@gmail.com
            </a>
          </p>
          <p>
            💬 <span className="font-semibold">GitHub:</span>{' '}
            <a
              href="https://github.com/impriteshmishra"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              github.com/impriteshmishra
            </a>
          </p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
    
  );
};

export default ContactPage;
