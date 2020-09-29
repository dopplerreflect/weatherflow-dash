import { config } from "https://deno.land/x/dotenv/mod.ts";
import { Client } from "https://raw.githubusercontent.com/doppler/deno-postgres/fix-for-deno-1.4.0/mod.ts";
// import { Client } from "https://deno.land/x/postgres@v0.4.3/mod.ts";
// import { Client } from "../../deno-postgres/mod.ts";

const ENV = config();

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
    "update wf_cache set data=$1 where id=1;",
    data,
  );
  return result;
};
