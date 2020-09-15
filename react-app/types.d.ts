type Props = {
  children: React.ReactNode;
};
type WfSummary = {
  pressure_trend: string;
  strike_count_1h: number;
  strike_count_3h: number;
  precip_total_1h: number;
  strike_last_dist: number;
  strike_last_epoch: number;
  precip_accum_local_yesterday: number;
  precip_accum_local_yesterday_final: number;
  precip_analysis_type_yesterday: number;
  feels_like: number;
  heat_index: number;
  wind_chill: number;
  pulse_adj_ob_time: number;
  pulse_adj_ob_wind_avg: number;
  pulse_adj_ob_temp: number;
};
type DecodedRapidWind = {
  time: number;
  mps: number;
  dir: number;
};
type DecodedObsSt = {
  time: number;
  wind_lull: number;
  wind_avg: number;
  wind_gust: number;
  wind_direction: number;
  wind_sample_interval: number;
  station_pressure: number;
  air_temperature: number;
  relative_humidity: number;
  illuminance: number;
  uv: number;
  solar_radiation: number;
  rain_accumulation: number;
  precipitation_type: number;
  average_strike_distance: number;
  strike_count: number;
  battery: number;
  report_interval: number;
  local_day_rain_accumulation: number;
  rain_accumulation_final: number;
  local_day_rain_accumulation_final: number;
  precipitation_analysis_type: number;
};
type SocketState = {
  summary: WfSummary;
  obs_st: DecodedObsSt[];
  rapid_wind: DecodedRapidWind[];
};
type SetSocketStateProps = {
  setValue: React.Dispatch<React.SetStateAction<SocketState>>;
};

type RAPWindsAloftProps = {
  lat: number;
  lng: number;
  elev?: number;
};

type Sounding = {
  linType: number;
  pressure: number;
  height: {
    meters: number;
    feet: number;
  };
  temp: {
    c: number;
    f: number;
  };
  dewPt: {
    c: number;
    f: number;
  };
  windDir: number;
  windSpd: {
    kts: number;
    mph: number;
  };
};

type RAPWindsAloftData = {
  latitude: number;
  longitude: number;
  soundings: Sounding[];
};
