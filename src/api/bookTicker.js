require("dotenv").config();
import fetch from "node-fetch";

export default async function getBestOrderBook(symbol) {
  const API_KEY = process.env.BINANCE_OPEN_API_ACCESS_KEY;

  const BASE_URL = "https://fapi.binance.com";
  const PATH = "/fapi/v1/ticker/bookTicker";
  const PARAMS = `?symbol=${symbol}`;

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
    return parseFloat(result.bidPrice);
  } catch (error) {
    console.log("바이낸스 베스트오더북 fetch에러:", error);
    throw error;
  }
}
