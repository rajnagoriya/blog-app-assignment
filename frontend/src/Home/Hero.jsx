import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="relative bg-gray-900  text-white h-screen flex items-center justify-center">
      <div className="relative z-10 text-center px-6 md:px-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to  SciAstra
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Discover articles, guides, and insights on various topics that will
          inspire and inform you.
        </p>
        <Link to={"/courses"}>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out">
          Explore Now
        </button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
