import { Settings } from "@/components/ui/settings";
import { useLocalizer } from "@/features/localization/hooks/useLocalizer";

export function App() {
  const { temperature, error } = useLocalizer();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Weather App</h1>
      <div>
        {temperature}
      </div>
      <Settings />
    </div>
  );
}