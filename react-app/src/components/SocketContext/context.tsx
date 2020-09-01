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
      windLull: 0,
      windAvg: 0,
      windGust: 0,
      windDirection: 0,
      windSampleInterval: 0,
      stationPressure: 0,
      airTemperature: 0,
      relativeHumidity: 0,
      illuminance: 0,
      uv: 0,
      solarRadiation: 0,
      precipAccumulated: 0,
      precipType: 0,
      lightningStrikeAvgDistance: 0,
      lightningStrikeCount: 0,
      battery: 0,
      reportInterval: 0,
    },
  ],
};

const SocketContext = createContext<SocketState>(initialState);

export default SocketContext;
