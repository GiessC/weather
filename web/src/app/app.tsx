import { TypeaheadLocationSearch } from "@/features/location/components/search-location";
import { Weather } from "@/features/weather/components/weather";
import { Footer } from "@/layout/footer";
import { Topbar } from "@/layout/topbar";
import { Toaster } from "sonner";

export function App() {
  return (
    <div className='h-full flex flex-col items-center justify-center gap-2'>
      <Topbar />
      <TypeaheadLocationSearch className='mt-8' />
      <Weather />
      <div className='flex-grow' />
      <Footer />
      <Toaster />
    </div>
  );
}