import React from 'react';

function About() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="grid md:grid-cols-2 gap-8 p-6 max-w-4xl w-full">
          {/* Text Section */}
          <div className="flex flex-col justify-center">
            <p className="text-cyan-600 text-lg font-semibold mb-4">About Us</p>
            <p className="text-white text-base">
              Welcome to our platform! We strive to provide the best services to our users. 
              Explore, discover, and grow with us.
            </p>
          </div>

          {/* Image Section */}
          <div className="flex justify-center">
            <img
              src="votify-logo.svg"
              alt="logo"
              className="w-48 h-48 object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
