import React from 'react';

/**
 * LoadingOverlay Component
 *
 * This component provides a visual overlay to indicate that content is loading.
 * It's typically used in conjunction with a loading context to show/hide based on application state.
 *
 * @returns {JSX.Element} The loading overlay element.
 */
function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        {/* Simple spinner animation */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
        <p className="text-white text-lg mt-4">Loading...</p>
      </div>
    </div>
  );
}

export default LoadingOverlay;
