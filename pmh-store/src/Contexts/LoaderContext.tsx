import React, { createContext, useContext, useState, ReactNode } from "react";
import Loading from "../Components/Load/Lod";

interface LoadingContextType {
  loading: boolean;
  setLoadingState: (isLoading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);

  const setLoadingState = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  return (
    <LoadingContext.Provider value={{ loading, setLoadingState }}>
      {children}
      {loading && <Loading />}
    </LoadingContext.Provider>
  );
};
