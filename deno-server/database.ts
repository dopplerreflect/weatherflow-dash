//@ts-nocheck
import { config } from "./deps.ts";

const ENV = config();

// sql experiment
// import { Client } from "https://deno.land/x/postgres/mod.ts";
// import { Client } from "../../deno-postgres/mod.ts";
import { Client } from "https://raw.githubusercontent.com/doppler/deno-postgres/tempfix/mod.ts";

const client = new Client(
  ENV.DEVELOPMENT
    ? "postgres://app:app@localhost"
    : Deno.env.toObject()["DATABASE_URL"],
);

await client.connect();

export const getCache = async () => {
  const result = await client.query("select * from wf_cache where id=1");
  const [id, data] = result.rows[0];
  return data;
};

export const setCache = async (data: string) => {
  const result = await client.query(
    `update wf_cache set data='${data}' where id=1;`,
  );
  return result;
};
