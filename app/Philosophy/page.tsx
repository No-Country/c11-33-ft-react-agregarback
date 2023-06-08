import React from "react";

const Philosophy = () => {
  return (
    <div className="min-h-screen bg-gray-100/70">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our philosophy
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-gray-500">
              At our website, we believe in the importance of physical and
              mental wellbeing. We strive to provide our users with the tools
              they need to achieve a healthy and balanced lifestyle.
            </p>
            <h3 className="mt-6 text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Commitment to quality
            </h3>
            <p className="mt-3 max-w-3xl text-lg text-gray-500">
              We are committed to offering products and services of the highest
              quality, using the latest technologies and the best materials
              available.
            </p>
          </div>
          <div className="mt-8 lg:mt-0">
            <h3 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Customer focus
            </h3>
            <p className="mt-3 max-w-3xl text-lg text-gray-500">
              Our users are our top priority. We strive to listen and respond to
              their needs, and provide exceptional customer service at all
              times.
            </p>
            <h3 className="mt-6 text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Positive impact on the community
            </h3>
            <p className="mt-3 max-w-3xl text-lg text-gray-500">
              We believe in the importance of making a positive difference in
              the community. We are committed to supporting charitable causes
              and projects that promote the physical and mental wellbeing of
              people.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Philosophy;
