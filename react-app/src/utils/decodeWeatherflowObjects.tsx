export const decodeRapidWind = (ob: number[]): DecodedRapidWind => {
  const [time, mps, dir] = ob;
  return [{ time, mps, dir }];
};

export const decodeEvtStrike = (evt: number[]): DecodeEvtStrike => {
  const [time, distance, energy] = evt;
  return [time, { distance, energy }];
};

export const decodeObsSt = (obs: number[]): DecodedObsSt => {
  let [
    time,
    windLull,
    windAvg,
    windGust,
    windDirection,
    windSampleInterval,
    stationPressure,
    airTemperature,
    relativeHumidity,
    illuminance,
    uv,
    solarRadiation,
    precipAccumulated,
    precipType,
    lightningStrikeAvgDistance,
    lightningStrikeCount,
    battery,
    reportInterval,
  ] = obs;
  // InfluxDB doesn't like null
  if (windDirection === null) windDirection = 0;

  return {
    time,
    windLull,
    windAvg,
    windGust,
    windDirection,
    windSampleInterval,
    stationPressure,
    airTemperature,
    relativeHumidity,
    illuminance,
    uv,
    solarRadiation,
    precipAccumulated,
    precipType,
    lightningStrikeAvgDistance,
    lightningStrikeCount,
    battery,
    reportInterval,
  };
};

type DecodedRapidWind = [
  {
    time: number;
    mps: number;
    dir: number;
  },
];

type DecodeEvtStrike = [
  number,
  {
    distance: number;
    energy: number;
  },
];

export type DecodedObsSt = {
  time: number;
  windLull: number;
  windAvg: number;
  windGust: number;
  windDirection: number;
  windSampleInterval: number;
  stationPressure: number;
  airTemperature: number;
  relativeHumidity: number;
  illuminance: number;
  uv: number;
  solarRadiation: number;
  precipAccumulated: number;
  precipType: number;
  lightningStrikeAvgDistance: number;
  lightningStrikeCount: number;
  battery: number;
  reportInterval: number;
};
