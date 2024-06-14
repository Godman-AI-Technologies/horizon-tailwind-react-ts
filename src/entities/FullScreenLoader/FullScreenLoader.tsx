import React from "react";

const FullScreenLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="border-t-transparent h-16 w-16 animate-spin rounded-full border-4 border-blue-500"></div>
    </div>
  );
};

export default FullScreenLoader;
