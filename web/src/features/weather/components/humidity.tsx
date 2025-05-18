import { Skeleton } from "@/components/ui/skeleton";
import { useWeather } from "../hooks/useWeather";

export function Humidity() {
  const { weather, isLoading } = useWeather();

  return (
    <div className='flex gap-2'>
      {isLoading ? <Skeleton className='w-[100px] h-[25px]' /> : <p>{weather?.humidity}% humidity</p>}
    </div>
  );
}