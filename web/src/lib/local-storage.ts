export function useLocalStorage() {
  function getItem<T>(
    key: string,
    map: (value: Partial<T>) => T = (value) => value as T
  ): T | null {
    const item = localStorage.getItem(key);
    if (item) {
      return map(JSON.parse(item));
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
