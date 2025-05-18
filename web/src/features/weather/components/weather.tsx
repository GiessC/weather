import { useLocalizer } from "@/features/localization/hooks/useLocalizer";

export function Weather() {
  const { temperature, error, isLoading } = useLocalizer();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>{temperature}</p>
    </div>
  );
}