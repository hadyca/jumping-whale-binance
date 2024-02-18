require("dotenv").config();
import fetch from "node-fetch";

export default async function getCandle(symbol, interval) {
  const API_KEY = process.env.BINANCE_OPEN_API_ACCESS_KEY;

  const BASE_URL = "https://fapi.binance.com";
  const PATH = "/fapi/v1/klines";
  const PARAMS = `?symbol=${symbol}&interval=${interval}&limit=200`;

  const url = `${BASE_URL}${PATH}${PARAMS}`;
  const options = {
    method: "GET",
    headers: {
      "X-MBX-APIKEY": API_KEY,
    },
  };
  try {
    const res = await fetch(url, options);
    const result = await res.json();
    return result;
  } catch (error) {
    console.log("바이낸스 캔들값 fetch에러:", error);
    return await getCandle(symbol, interval);
  }
}
