import { useEffect, useState } from 'react';


const useDebounce = <T>(value: T, delay: number = 200): T => {
  // State to hold the debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set a timeout to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to clear the timeout if the component unmounts or the value/delay changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Effect dependencies

  return debouncedValue;
};

export default useDebounce;
