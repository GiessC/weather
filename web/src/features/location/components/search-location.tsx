import pDebounce from 'p-debounce';
import { useContext, useState, type ChangeEvent } from "react";
import { Command, CommandItem, CommandGroup, CommandList, CommandDialog } from "@/components/ui/command";
import { LocationOption, useWeatherApi } from "@/features/weather/api/weather.api";
import { Coordinates, LocationContext } from '../context/location.context';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface LocationSearchProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  mobile?: boolean;
}

function LocationSearch({
  isOpen,
  setIsOpen,
  mobile = false,
}: LocationSearchProps) {
  const { location } = useContext(LocationContext);

  if (mobile) {
    return (
      <>
        <Button
          onClick={() => setIsOpen(true)}
          variant='outline'
          className='w-2/3 text-wrap! h-fit'
        >
          {location.fullName}
        </Button>
        <div role='search'>
          <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
            <SearchCommandBase
              setIsOpen={setIsOpen}
            />
          </CommandDialog>
        </div>
      </>
    );
  }

  return (
    <div role='search'>
      <Command>
        <SearchCommandBase
          setIsOpen={setIsOpen}
        />
      </Command>
    </div>
  );
}

interface SearchCommandBaseProps {
  setIsOpen: (isOpen: boolean) => void;
}

function SearchCommandBase({ setIsOpen }: SearchCommandBaseProps) {
  const [options, setOptions] = useState<LocationOption[]>([]);
  const { location, setLocation } = useContext(LocationContext);
  const { useLocationSearch } = useWeatherApi();
  const { mutateAsync: search, isIdle, isPending } = useLocationSearch();
  const isLoading = isIdle || isPending;

  const debouncedSearch = pDebounce(search, 500);

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    if (value.length === 0) {
      setOptions([]);
      return;
    }
    setOptions(await debouncedSearch(value));
  }

  return (
    <>
      <Input
        className='mt-1'
        onChange={handleChange}
        onFocus={() => setIsOpen(true)}
        aria-label='Search for a location by name'
        placeholder="Ex. San Francisco, CA" />
      <CommandList>
        <CommandGroup>
          {!isLoading && options.length === 0 && (
            <CommandItem>
              No results found
            </CommandItem>
          )}
          {isPending && (
            <CommandItem>
              <div className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </div>
            </CommandItem>
          )}
          {!isLoading && options.map((option) => (
            <CommandItem
              key={option.id}
              value={String(option.id)}
              onSelect={() => {
                const location = new LocationOption(
                  option.id,
                  option.name,
                  option.country,
                  option.region,
                  new Coordinates(option.coords.latitude, option.coords.longitude)
                );
                setLocation(location);
                setIsOpen(false);
              } }
              aria-selected={location?.id === option.id ? "true" : "false"}
              className="cursor-pointer"
            >
              {option.fullName}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </>
  );
}

export function TypeaheadLocationSearch({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { location } = useContext(LocationContext);
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isMobile) {
    return (
      <LocationSearch
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        mobile
      />
    );
  }
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className={className} asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={isOpen}
        >
          {location.fullName}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <LocationSearch
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </PopoverContent>
    </Popover>
  );
}
