import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  const handleChange = (event: MediaQueryListEvent) => {
    setMatches(event.matches);
  };

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    setMatches(mediaQueryList.matches);
    mediaQueryList.addEventListener("change", handleChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}