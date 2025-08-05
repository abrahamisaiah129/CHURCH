import { useContext } from 'react';
import { LoadingContext } from '../contexts/LoadingContext'; // Import LoadingContext

// Custom hook to use the loading context easily
export const useLoading = () => {
  return useContext(LoadingContext);
};
