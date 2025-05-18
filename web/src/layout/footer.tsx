import { useWeather } from "@/features/weather/hooks/useWeather"
import { formatWithTime } from "@/utils/dayjs";

export function Footer() {
  const { weather } = useWeather();

  return (
    <footer className='w-full fixed bottom-4 items-center'>
      <p className="text-sm text-muted-foreground text-center">
        Last updated at {formatWithTime(weather?.lastUpdated)}
      </p>
    </footer>
  )
}