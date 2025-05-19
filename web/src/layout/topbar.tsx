import { Button } from "@/components/ui/button";
import { SettingsTrigger } from "@/features/settings/components/settings-dialog";
import { Settings } from "lucide-react";

export function Topbar() {
  return (
    <div className='sticky flex justify-end items-center pr-4 top-0 h-16 w-full bg-indigo-400 shadow-xl'>
      <SettingsTrigger>
        <Button variant='outline' size='icon'>
          <Settings />
        </Button>
      </SettingsTrigger>
    </div>
  );
}