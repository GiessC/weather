export function useLocalStorage() {
  function getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  }

  function setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  return { getItem, setItem, removeItem };
}
