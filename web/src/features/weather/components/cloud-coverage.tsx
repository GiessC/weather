import { Skeleton } from "@/components/ui/skeleton";
import { useWeather } from "../hooks/useWeather";

export function CloudCoverage() {
  const { weather, isLoading } = useWeather();

  return (
    <div className='flex gap-2'>
      {isLoading ? <Skeleton className='w-[200px] h-[25px]' /> : <p>{weather?.cloudCoverage}% Cloud Coverage</p>}
    </div>
  );
}