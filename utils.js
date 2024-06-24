export function kelvinToCelsius(kelvin) {
  kelvin = parseFloat(kelvin);
  const celcius = kelvin - 273.15;
  return String(celcius.toFixed(2));
}
