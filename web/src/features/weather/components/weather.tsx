import { Visibility } from "./visibility";
import { UvIndex } from "./uv-index";
import { Wind } from "./wind";
import { CloudCoverage } from "./cloud-coverage";
import { Humidity } from "./humidity";
import { Temperature } from "./temperature";
import { Condition } from "./condition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useContext } from "react";
import { LocationContext } from "@/features/location/context/location.context";

export function Weather() {
  const { location } = useContext(LocationContext);

  return (
    <Card className='gap-1'>
      <CardHeader className='justify-center pb-2.5 border-b-1'>
        <CardTitle className="text-2xl">
          {location.name}, {location.region}
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-1 mt-2 px-8'>
        <div className='flex justify-center'>
          <Condition />
        </div>
        <Temperature />
        <Humidity />
        <Wind />
        <CloudCoverage />
        <UvIndex />
        <Visibility />
      </CardContent>
    </Card>
  );
}