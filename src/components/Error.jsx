import React from 'react';

const Error = ({ error }) => {
  const isApiLimit = error?.status === 429 || error?.originalStatus === 429;
  const message = isApiLimit
    ? {
        title: 'API limit reached!',
        desc: 'The monthly API limit has been reached. Please try again later.',
      }
    : {
        title: 'Oops! Something went wrong.',
        desc: error?.message || String(error),
      };

  return (
    <div className="w-full flex flex-col justify-center items-center bg-white/5 rounded-lg shadow-lg p-8 mt-10">
      <svg className="w-16 h-16 text-white mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="16" r="1" fill="currentColor" />
      </svg>
      <h1 className="font-extrabold text-3xl text-white mb-2 drop-shadow-lg">{message.title}</h1>
      <p className="text-white text-lg opacity-90">{message.desc}</p>
    </div>
  );
};

export default Error;
