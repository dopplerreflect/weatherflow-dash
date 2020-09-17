import { createContext } from "react";

export const initialState: SocketState = {
  summary: {
    pressure_trend: "steady",
    strike_count_1h: 0,
    strike_count_3h: 0,
    precip_total_1h: 0,
    strike_last_dist: 0,
    strike_last_epoch: 0,
    precip_accum_local_yesterday: 0,
    precip_accum_local_yesterday_final: 0,
    precip_analysis_type_yesterday: 0,
    feels_like: 0,
    heat_index: 0,
    wind_chill: 0,
    pulse_adj_ob_time: 0,
    pulse_adj_ob_wind_avg: 0,
    pulse_adj_ob_temp: 0,
  },
  rapid_wind: [{ time: 0, dir: 0, mps: 0 }],
  obs_st: [
    {
      time: 0,
      wind_lull: 0,
      wind_avg: 0,
      wind_gust: 0,
      wind_direction: 0,
      wind_sample_interval: 0,
      station_pressure: 0,
      air_temperature: 0,
      relative_humidity: 0,
      illuminance: 0,
      uv: 0,
      solar_radiation: 0,
      rain_accumulation: 0,
      precipitation_type: 0,
      average_strike_distance: 0,
      strike_count: 0,
      battery: 0,
      report_interval: 0,
      local_day_rain_accumulation: 0,
      rain_accumulation_final: 0,
      local_day_rain_accumulation_final: 0,
      precipitation_analysis_type: 0,
    },
  ],
};

const SocketContext = createContext<SocketState>(initialState);

export default SocketContext;
