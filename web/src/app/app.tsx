import { Settings } from "@/components/ui/settings";
import { useLocalizer } from "@/features/localization/hooks/useLocalizer";
import { SearchLocation } from "@/features/location/components/search-location";
import { Footer } from "@/layout/footer";

export function App() {
  const { temperature, error } = useLocalizer();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <SearchLocation />
      <div>
        {temperature}
      </div>
      <Settings />
      <Footer />
    </>
  );
}