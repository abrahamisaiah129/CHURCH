import React, { useState } from 'react';
import { LoadingContext } from './LoadingContextObject'; // UPDATED: Import context from its own dedicated file

// Create a provider component for the Loading Context
export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
