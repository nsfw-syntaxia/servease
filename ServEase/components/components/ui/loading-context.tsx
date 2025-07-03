"use client";

import { createContext, useContext, useState } from "react";

const LoadingContext = createContext({
  showLoading: () => {},
  hideLoading: () => {},
  isLoading: false,
});

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading, isLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
