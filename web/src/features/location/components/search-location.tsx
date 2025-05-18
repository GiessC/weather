import pDebounce from 'p-debounce';
import { useContext, useState, type ChangeEvent } from "react";
import { Command, CommandEmpty, CommandItem, CommandGroup, CommandList } from "@/components/ui/command";
import { useWeatherApi, type LocationOption } from "@/features/weather/api/weather.api";
import { Input } from '@/components/ui/input';
import { LocationContext } from '../context/LocationContext';

export function TypeaheadLocationSearch() {
  const [query, setQuery] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<LocationOption[]>([]);
  const { location, setLocation } = useContext(LocationContext);
  const { useLocationSearch } = useWeatherApi();
  const { mutateAsync: search, isIdle, isPending } = useLocationSearch();
  const isLoading = isIdle || isPending;

  const debouncedSearch = pDebounce(search, 1_000);

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setQuery(value);
    if (value.length < 3) {
      setIsOpen(false);
      return;
    }
    setOptions(await debouncedSearch(value));
    setIsOpen(true);
  }

  return (
    <div role='search'>
      <Command>
        <Input
          value={query}
          onChange={handleChange}
          onFocus={() => setIsOpen(true)}
          aria-label='Search for a location by name'
          placeholder="Search for a location (Ex. San Francisco, CA)"
        />
        {isOpen && (
          <CommandList>
            {!isLoading && (
              <CommandEmpty>
                No locations found.
              </CommandEmpty>
            )}
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.id}
                  value={option.id}
                  onSelect={() => {
                    setQuery(option.name);
                    setLocation({
                      id: option.id,
                      coords: option.coords,
                    });
                    setIsOpen(false);
                  }}
                  aria-selected={location?.id === option.id ? "true" : "false"}
                  className="cursor-pointer"
                >
                  {option.fullName}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        )}
      </Command>
    </div>
  );
}
