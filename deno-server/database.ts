import { config } from "https://deno.land/x/dotenv/mod.ts";
// import { Client } from "https://raw.githubusercontent.com/doppler/deno-postgres/fix-for-deno-1.4.0/mod.ts";
import { Client } from "https://deno.land/x/postgres/mod.ts";
import type { WfData } from "./types.d.ts";

const ENV = config();

const client = new Client(
  ENV.DEVELOPMENT
    ? "postgres://app:app@127.0.0.1/app"
    : Deno.env.toObject()["DATABASE_URL"],
);

await client.connect();

export const getCache = async () => {
  const result = await client.queryArray<[WfData]>(
    "select data from wf_cache where id=1",
  );
  const [data] = result.rows[0];
  return data;
};

export const setCache = async (data: string) => {
  const result = await client.queryArray(
    "update wf_cache set data=$1 where id=1;",
    data,
  );
  return result;
};
