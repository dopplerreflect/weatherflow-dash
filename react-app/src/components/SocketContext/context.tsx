import { createContext } from "react";

export const initialState = {
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
  obs_st: [[]],
  rapid_wind: [[]],
};

const SocketContext = createContext<SocketState>(initialState);

export default SocketContext;
