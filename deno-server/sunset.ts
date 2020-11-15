import { config } from "https://deno.land/x/dotenv/mod.ts";
import { Context } from "https://deno.land/x/oak@v6.2.0/context.ts";

const ENV = config();
const WINDS_ALOFT_QUERY_DATA = ENV.WINDS_ALOFT_QUERY_DATA ||
  Deno.env.get("WINDS_ALOFT_QUERY_DATA") ||
  JSON.stringify({ latitude: null, longitude: null, elevation: null });
const { latitude, longitude } = JSON.parse(WINDS_ALOFT_QUERY_DATA);

const fetchSunsetData = async () => {
  const result = await fetch(
    `https://api.sunrise-sunset.org/json?formatted=0&lat=${latitude}&lng=${longitude}`,
  );

  const json = result.json();

  return json;
};

export const handleSunsetRequest = async (ctx: Context) => {
  try {
    const json = await fetchSunsetData();
    ctx.response.type = "application/json";
    ctx.response.headers.append(
      "access-control-allow-origin",
      "http://localhost:1234",
    );
    ctx.response.body = json;
  } catch (err) {
    console.log(err);
  }
};
