require("dotenv").config();
import fetch from "node-fetch";

export default async function getOrderBook(symbol) {
  const API_KEY = process.env.BINANCE_OPEN_API_ACCESS_KEY;

  const BASE_URL = "https://fapi.binance.com";
  const PATH = "/fapi/v1/depth";
  const PARAMS = `?symbol=${symbol}&limit=5`;

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
    console.log(parseFloat(result.bids[0][0]));
    return parseFloat(result.bids[0][0]);
  } catch (error) {
    console.log("바이낸스 오더북 fetch에러:", error);
    throw error;
  }
}
