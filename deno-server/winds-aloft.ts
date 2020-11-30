import { config } from "https://deno.land/x/dotenv/mod.ts";
import type { RouterContext } from "https://deno.land/x/oak@v6.2.0/mod.ts";

const ENV = config();
const WINDS_ALOFT_QUERY_DATA = ENV.WINDS_ALOFT_QUERY_DATA ||
  Deno.env.get("WINDS_ALOFT_QUERY_DATA") ||
  JSON.stringify({ latitude: null, longitude: null, elevation: null });
let { latitude, longitude, elevation } = JSON.parse(WINDS_ALOFT_QUERY_DATA);

const fetchWindsAloftData = async (latitude: number, longitude: number) => {
  const queryObj = {
    airport: `${latitude}%2C${longitude}`,
    startSecs: Math.floor(Date.now() / 1000),
    endSecs: Math.floor(Date.now() / 1000) + 3600,
  };

  const queryStr = Object.entries(queryObj)
    .map((pair) => pair.join("="))
    .join("&");

  const result = await fetch(
    `https://rucsoundings.noaa.gov/get_soundings.cgi?${queryStr}`,
  );

  const body = new Uint8Array(await result.arrayBuffer());

  return body;
};

const transformWindsAloftData = (
  body: Uint8Array,
  elevation: number,
) => {
  const decodedBody = new TextDecoder().decode(body);
  const [header, op40, , cape1, , , surface, , ...rest] = decodedBody.split(
    /\n/,
  );
  const [type, hour, day, month, year] = op40.split(/[\s]+/);
  const [, , , , latitude, longitude] = cape1.split(/[\s]+/);
  const soundings = [surface, ...rest];

  return {
    header,
    op40,
    type,
    hour: Number(hour),
    month,
    day: Number(day),
    year: Number(year),
    latitude: Number(latitude),
    longitude: Number(longitude),
    elevation,
    soundings: soundings
      .map((t) => {
        let [
          ,
          linType,
          pressure,
          altitudeMSL,
          temp,
          dewPt,
          windDir,
          windSpd,
        ] = t.split(/[\s]+/).map((v) => Number(v));
        return {
          linType,
          pressure: pressure / 10,
          altitude: {
            metersAGL: Math.round(altitudeMSL - elevation),
            feetAGL: Math.round((altitudeMSL - elevation) * 3.28084),
            metersMSL: altitudeMSL,
            feetMSL: Math.round(altitudeMSL * 3.28084),
          },
          temp: {
            c: temp / 10,
            f: Number(((temp / 10) * 1.8 + 32).toFixed(1)),
          },
          dewPt: {
            c: dewPt / 10,
            f: Number(((dewPt / 10) * 1.8 + 32).toFixed(1)),
          },
          windDir,
          windSpd: {
            kts: windSpd,
            mph: Math.round(windSpd * 1.15078),
          },
        };
      })
      .filter((o) => o.altitude.feetAGL < 16000),
  };
};

export const handleWindsAloftRequest = async (ctx: RouterContext) => {
  if (ctx.params.latitude) {
    latitude = ctx.params.latitude;
    longitude = ctx.params.longitude;
    elevation = ctx.params.elevation;
  }
  try {
    const body = await fetchWindsAloftData(latitude, longitude);
    ctx.response.type = "application/json";
    ctx.response.headers.append(
      "access-control-allow-origin",
      "*",
    );
    ctx.response.body = transformWindsAloftData(body, elevation);
  } catch (err) {
    console.error("Error fetching winds aloft:", err);
  }
};
