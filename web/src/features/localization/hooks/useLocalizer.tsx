export function useLocalizer() {
  function celciusToFahrenheit(celcius?: number): number | undefined {
    if (celcius === undefined) {
      return;
    }
    return (celcius * 9) / 5 + 32;
  }

  function milesToKilometers(miles?: number): number | undefined {
    if (miles === undefined) {
      return;
    }
    return miles * 1.60934;
  }

  return {
    celciusToFahrenheit,
    milesToKilometers
  };
}
