"use client";

import { useState, useEffect, useCallback } from "react";

const MAX_FREE_CHECKS = 3;
const LOCAL_STORAGE_KEY = "anonymousApiCheckCount";

interface UseApiCallLimitReturn {
  currentChecks: number;
  isLimitReached: boolean;
  incrementChecks: () => void;
  resetChecks: () => void;
  showLoginPrompt: boolean;
  setShowLoginPrompt: (show: boolean) => void;
}

export function useApiCallLimit(): UseApiCallLimitReturn {
  const [currentChecks, setCurrentChecks] = useState<number>(0);
  const [isLimitReached, setIsLimitReached] = useState<boolean>(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState<boolean>(false);

  useEffect(() => {
    try {
      const storedChecks = localStorage.getItem(LOCAL_STORAGE_KEY);
      const initialChecks = storedChecks ? parseInt(storedChecks, 10) : 0;
      setCurrentChecks(initialChecks);
      setIsLimitReached(initialChecks >= MAX_FREE_CHECKS);
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      // Fallback if localStorage is not available
      setCurrentChecks(0);
      setIsLimitReached(false);
    }
  }, []);

  const incrementChecks = useCallback(() => {
    setCurrentChecks((prevChecks) => {
      const newChecks = prevChecks + 1;
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, newChecks.toString());
      } catch (error) {
        console.error("Error accessing localStorage:", error);
      }
      if (newChecks >= MAX_FREE_CHECKS) {
        setIsLimitReached(true);
        setShowLoginPrompt(true);
      }
      return newChecks;
    });
  }, []);

  const resetChecks = useCallback(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, "0");
    } catch (error)      {
      console.error("Error accessing localStorage:", error);
    }
    setCurrentChecks(0);
    setIsLimitReached(false);
    setShowLoginPrompt(false);
  }, []);

  return {
    currentChecks,
    isLimitReached,
    incrementChecks,
    resetChecks,
    showLoginPrompt,
    setShowLoginPrompt,
  };
} 