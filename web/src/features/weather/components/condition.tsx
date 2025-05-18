import { Skeleton } from "@/components/ui/skeleton";
import { useWeather } from "../hooks/useWeather";

export function Condition() {
  const { weather, isLoading } = useWeather();

  if (isLoading) {
    return (
      <div className='flex items-center gap-2'>
        <Skeleton className='w-[75px] h-[75px]' />
        <Skeleton className='w-[100px] h-[25px]' />
      </div>
    );
  }

  return (
    <div className='flex items-center'>
      <img src={weather?.condition?.icon} alt={weather?.condition?.text} />
      <p>{weather?.condition?.text}</p>
    </div>
  );
}