import { Settings } from "@/components/ui/settings";
import { TypeaheadLocationSearch } from "@/features/location/components/search-location";
import { Weather } from "@/features/weather/components/weather";
import { Footer } from "@/layout/footer";

export function App() {
  return (
    <>
      <TypeaheadLocationSearch />
      <Weather />
      <Settings />
      <Footer />
    </>
  );
}