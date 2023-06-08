import React from "react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-100/70">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Privacy Policy
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-gray-500">
              At our website, we respect and protect the privacy of our users.
              Below is our privacy policy and how we collect, use, and protect
              your personal information.
            </p>
            <h3 className="mt-6 text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Collection of personal information
            </h3>
            <p className="mt-3 max-w-3xl text-lg text-gray-500">
              We collect personal information when you register for a
              membership, sign up for our training or nutrition programs, or
              participate in surveys or promotions. The information we collect
              may include your name, email address, mailing address, phone
              number, and date of birth.
            </p>
          </div>
          <div className="mt-8 lg:mt-0">
            <h3 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Use of personal information
            </h3>
            <p className="mt-3 max-w-3xl text-lg text-gray-500">
              We use the personal information collected to provide you with our
              services and products, personalize your experience on our website,
              improve our programs and services, and communicate with you about
              promotions and special offers.
            </p>
            <h3 className="mt-6 text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Sharing of personal information
            </h3>
            <p className="mt-3 max-w-3xl text-lg text-gray-500">
              We do not sell or rent your personal information to third parties.
              We only share your personal information with service providers who
              need access to it to provide you with our services and products.
              We may also share your personal information when required by law
              or to protect our rights and property.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
