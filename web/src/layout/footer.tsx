import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useWeather } from "@/features/weather/hooks/useWeather"
import Constants from "@/utils/const";
import { formatWithTime } from "@/utils/dayjs";
import { navigate } from "@/utils/navigation";

function goTo(url: string) {
  return () => navigate(url);
}

export function Footer() {
  const { weather, isLoading } = useWeather();

  return (
    <footer className='w-full absolute mt-8 bottom-4 items-center'>
      <p className="text-sm text-muted-foreground text-center">
        {isLoading ? <Skeleton className='m-auto w-[300px] h-[25px]' /> : <>Last updated at {formatWithTime(weather?.lastUpdated)}</>}
      </p>
      <p className="text-sm text-muted-foreground text-center">
        Brought to you by <Button variant='link' className='px-0' onClick={goTo(Constants.MY_URL)}>Collin Giess</Button> and the <Button className='px-0' variant='link' onClick={goTo(Constants.WEATHER_API_URL)}>Weather API</Button>
      </p>
    </footer>
  )
}