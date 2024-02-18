import fetch from "node-fetch";

export default async function getTime(symbol, interval) {
  const BASE_URL = "https://fapi.binance.com";
  const PATH = "/fapi/v1/time";

  const url = `${BASE_URL}${PATH}`;
  const options = {
    method: "GET",
  };
  try {
    const res = await fetch(url, options);
    const result = await res.json();
    return result;
  } catch (error) {
    console.log("바이낸스 타임 fetch에러:", error);
    return await getTime(symbol, interval);
  }
}
