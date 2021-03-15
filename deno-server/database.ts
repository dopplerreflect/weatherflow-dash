import { config } from "https://deno.land/x/dotenv/mod.ts";
// import { Client } from "https://raw.githubusercontent.com/doppler/deno-postgres/fix-for-deno-1.4.0/mod.ts";
import { Client } from "https://deno.land/x/postgres/mod.ts";
import type { WfData } from "./types.d.ts";

const ENV = config();

const client = new Client(
  ENV.DEVELOPMENT ? "postgres://app:app@127.0.0.1/app" : {
    hostname: "ec2-52-21-252-142.compute-1.amazonaws.com",
    user: "bohunepdbrlspm",
    password:
      "5e6f33e963971c692c149d4bf1a6fb022f8a765a3912976e9c7b8bc94a7b3ae8",
    database: "df04919podboae",
    port: "5432",
    //@ts-expect-error
    tls: {
      enforce: false,
    },
  },
  // : Deno.env.toObject()["DATABASE_URL"],
);

Deno.startTls;

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
