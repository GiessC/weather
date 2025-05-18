import { useLocalizer } from "@/features/localization/hooks/useLocalizer";

export function Weather() {
  const {
    temperature,
    condition,
    cloudCoverage,
    humidity,
    uvIndex,
    visibility,
    wind,
    error,
    isLoading
  } = useLocalizer();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>{temperature}</p>
      <div className='flex items-center'>
        <img src={condition?.icon} alt={condition?.text} />
        <p>{condition?.text}</p>
      </div>
      <p>{humidity}</p>
      <p>{wind}</p>
      <p>{cloudCoverage}</p>
      <p>{uvIndex}</p>
      <p>{visibility}</p>
    </div>
  );
}