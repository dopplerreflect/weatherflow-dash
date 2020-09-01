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
type SocketState = {
  summary: WfSummary;
  obs_st: number[][];
  rapid_wind: number[][];
};
type SetSocketStateProps = {
  setValue: React.Dispatch<React.SetStateAction<SocketState>>;
};
