"use client";
import { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";

const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage("color-theme", "light");
  const [isMounted, setIsMounted] = useState(false); // Track if the component has mounted

  useEffect(() => {
    setIsMounted(true); // Set to true after the component has mounted
  }, []);

  useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.body.classList;

    if (isMounted) {
      colorMode === "dark"
        ? bodyClass.add(className)
        : bodyClass.remove(className);
    }
  }, [colorMode, isMounted]);

  return [colorMode, setColorMode, isMounted];
};

export default useColorMode;
