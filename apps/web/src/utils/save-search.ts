import createLocalStorage from "../hooks/create-local-storage";

export default function saveSearch(term: string) {
  const [currentSearches, setCurrentSearches] = createLocalStorage<string[]>(
    "searches",
    []
  );

  currentSearches.length >= 5 && currentSearches.pop();

  currentSearches.unshift(term);

  const newSearches = [...new Set(currentSearches)];

  setCurrentSearches(newSearches);

  return newSearches;
}
