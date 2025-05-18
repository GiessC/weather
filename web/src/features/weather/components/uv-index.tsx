import { Skeleton } from "@/components/ui/skeleton";
import { useWeather } from "../hooks/useWeather";

export function UvIndex() {
  const { weather, isLoading } = useWeather();

  return (
    <div className='flex gap-2'>
      <p className='font-semibold'>UV Index: </p>
      {isLoading ? <Skeleton className='w-[50px] h-[25px]' /> : <p>{weather?.uvIndex}</p>}
    </div>
  );
}