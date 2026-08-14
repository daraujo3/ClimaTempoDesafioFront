interface ClimaTempo {
  name: string;
  region: string;
  country: string;

  temp_c: number;
  humidity: number;
  condition: Condition | null;

  forecastMaxtemp_c: number;
  forecastMintemp_c: number;
}


interface Condition {
  text: string;
  icon: string;
  code: number;
}
