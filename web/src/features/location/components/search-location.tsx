import pDebounce from 'p-debounce';
import { useContext, useState, type ChangeEvent } from "react";
import { Command, CommandEmpty, CommandItem, CommandGroup, CommandList } from "@/components/ui/command";
import { LocationOption, useWeatherApi } from "@/features/weather/api/weather.api";
import { Input } from '@/components/ui/input';
import { Coordinates, LocationContext } from '../context/location.context';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

export function TypeaheadLocationSearch() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<LocationOption[]>([]);
  const { location, setLocation } = useContext(LocationContext);
  const { useLocationSearch } = useWeatherApi();
  const { mutateAsync: search, isIdle, isPending } = useLocationSearch();
  const isLoading = isIdle || isPending;

  const debouncedSearch = pDebounce(search, 1_000);

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    if (value.length < 3) {
      return;
    }
    setOptions(await debouncedSearch(value));
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={isOpen}
        >
          {location.fullName}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div role='search'>
          <Command>
            <Input
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
                      value={String(option.id)}
                      onSelect={() => {
                        const location = new LocationOption(
                          option.id,
                          option.name,
                          option.country,
                          option.region,
                          new Coordinates(option.coords.latitude, option.coords.longitude),
                        );
                        setLocation(location);
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
      </PopoverContent>
    </Popover>
  );
}
