require("dotenv").config();
import fetch from "node-fetch";
const crypto = require("crypto");

export default async function marketBuy(symbol, qty, serverTime) {
  const API_KEY = process.env.BINANCE_OPEN_API_ACCESS_KEY;
  const API_SECRET = process.env.BINANCE_OPEN_API_SECRET_KEY;
  //   const timestamp = () => new Date().getTime();

  const generateSignature = (queryString) => {
    return crypto
      .createHmac("sha256", API_SECRET)
      .update(queryString)
      .digest("hex");
  };
  // const timestampNow = serverTime;
  const queryString = `symbol=${symbol}&side=BUY&type=MARKET&timeInForce=GTC&quantity=${qty}&timestamp=${serverTime}`;
  const signature = generateSignature(queryString);

  const BASE_URL = "https://fapi.binance.com";
  const PATH = "/fapi/v1/order";
  const PARAMS = `?${queryString}&signature=${signature}`;

  const url = `${BASE_URL}${PATH}${PARAMS}`;
  const options = {
    method: "POST",
    headers: {
      "X-MBX-APIKEY": API_KEY,
    },
  };
  try {
    const res = await fetch(url, options);
    const result = await res.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("바이낸스 시장가 매수 fetch 에러: ", error);
    throw error;
  }
}
