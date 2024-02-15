import fetch from "node-fetch";

export default async function getCandle(symbol, interval) {
  const BASE_URL = "https://fapi.binance.com";
  const PATH = "/fapi/v1/klines";
  const PARAMS = `?symbol=${symbol}&interval=${interval}&limit=200`;
  try {
    const candleData = await fetch(`${BASE_URL}${PATH}${PARAMS}`);
    const result = await candleData.json();
    return result;
  } catch (error) {
    console.log("바이낸스 캔들값 fetch에러:", error);
    return await getCandle(symbol, interval);
  }
}
