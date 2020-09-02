export const decodeRapidWind = (ob: number[]): DecodedRapidWind => {
  const [time, mps, dir] = ob;
  return { time, mps, dir };
};

export const decodeObsSt = (obs: number[]): DecodedObsSt => {
  let [
    time,
    wind_lull,
    wind_avg,
    wind_gust,
    wind_direction,
    wind_sample_interval,
    station_pressure,
    air_temperature,
    relative_humidity,
    illuminance,
    uv,
    solar_radiation,
    rain_accumulation,
    precipitation_type,
    average_strike_distance,
    strike_count,
    battery,
    report_interval,
    local_day_rain_accumulation,
    rain_accumulation_final,
    local_day_rain_accumulation_final,
    precipitation_analysis_type,
  ] = obs;
  // InfluxDB doesn't like null
  if (wind_direction === null) wind_direction = 0;

  return {
    time,
    wind_lull,
    wind_avg,
    wind_gust,
    wind_direction,
    wind_sample_interval,
    station_pressure,
    air_temperature,
    relative_humidity,
    illuminance,
    uv,
    solar_radiation,
    rain_accumulation,
    precipitation_type,
    average_strike_distance,
    strike_count,
    battery,
    report_interval,
    local_day_rain_accumulation,
    rain_accumulation_final,
    local_day_rain_accumulation_final,
    precipitation_analysis_type,
  };
};
