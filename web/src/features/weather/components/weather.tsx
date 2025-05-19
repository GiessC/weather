import { Visibility } from "./visibility";
import { UvIndex } from "./uv-index";
import { Wind } from "./wind";
import { CloudCoverage } from "./cloud-coverage";
import { Humidity } from "./humidity";
import { Temperature } from "./temperature";
import { Condition } from "./condition";

export function Weather() {
  return (
    <div className='flex flex-col gap-2 items-center px-6'>
      <Condition />
      <Temperature />
      <Humidity />
      <Wind />
      <CloudCoverage />
      <UvIndex />
      <Visibility />
    </div>
  );
}