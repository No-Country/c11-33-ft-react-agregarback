import React from "react";

const About = () => {
  return (
    <div className=" bg-gray-100/70">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Who we are
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-gray-500">
              We are a community of fitness enthusiasts who aim to help people
              achieve their health and wellness goals. We offer a wide variety
              of training and nutrition programs designed to fit your individual
              needs and goals.
            </p>
          </div>
          <div className="mt-8 lg:mt-0">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our mission
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-gray-500">
              Our mission is to promote a healthy and active lifestyle within
              our community, fostering inclusivity and diversity. We strive to
              provide a safe and welcoming environment where everyone feels
              welcome and supported in their journey towards health and
              wellness.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
