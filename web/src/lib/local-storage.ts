export function useLocalStorage() {
  const getItem = <T>(key: string): T | null => {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  };

  const setItem = <T>(key: string, value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const removeItem = (key: string): void => {
    localStorage.removeItem(key);
  };

  return { getItem, setItem, removeItem };
}
