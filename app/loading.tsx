import React from 'react';

export default function loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <svg className=" mr-3 h-36 w-36 animate-spin" viewBox="0 0 24 24"></svg>
    </div>
  );
}
