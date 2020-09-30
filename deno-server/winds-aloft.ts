export const fetchWindsAloftData = async (
  latitude: string,
  longitude: string,
) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const d = new Date();
  const queryObj = {
    airport: `${latitude}%2C${longitude}`,
    startSecs: Math.floor(Date.now() / 1000),
    endSecs: Math.floor(Date.now() / 1000) + 3600,
  };
  const queryStr = Object.entries(queryObj)
    .map((pair) => pair.join("="))
    .join("&");
  // console.log(queryStr);
  // const queryStr = `start=latest&airport=${latitude}%2C${longitude}`
  const result = await fetch(
    `https://rucsoundings.noaa.gov/get_soundings.cgi?${queryStr}`,
  );
  const body = new Uint8Array(await result.arrayBuffer());
  // await Deno.writeFile('data.txt', body);
  return body;
};

export const transformWindsAloftData = (
  body: Uint8Array,
  elevation: number = 0,
) => {
  const decodedBody = new TextDecoder().decode(body);
  // console.log(decodedBody);
  const [, op40, , cape1, , , surface, , ...rest] = decodedBody.split(/\n/);
  const [type, hour, day, month, year] = op40.split(/[\s]+/);
  const [, , , , latitude, longitude] = cape1.split(/[\s]+/);
  const soundings = [surface, ...rest];
  return {
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
          height,
          temp,
          dewPt,
          windDir,
          windSpd,
        ] = t.split(/[\s]+/).map((v) => Number(v));
        return {
          linType,
          pressure: pressure / 10,
          height: {
            meters: height - elevation,
            feet: Math.round((height - elevation) * 3.28084),
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
      .filter((o) => o.height.feet < 16000),
  };
};
