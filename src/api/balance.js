require("dotenv").config();
import fetch from "node-fetch";
const crypto = require("crypto");

export default async function getBalance(serverTime) {
  const API_KEY = process.env.BINANCE_OPEN_API_ACCESS_KEY;
  const API_SECRET = process.env.BINANCE_OPEN_API_SECRET_KEY;
  //   const timestamp = () => new Date().getTime();

  const generateSignature = (queryString) => {
    return crypto
      .createHmac("sha256", API_SECRET)
      .update(queryString)
      .digest("hex");
  };
  //   const timestampNow = timestamp();
  const queryString = `timestamp=${serverTime}`;
  const signature = generateSignature(queryString);

  const BASE_URL = "https://fapi.binance.com";
  const PATH = "/fapi/v2/balance";
  const PARAMS = `?${queryString}&signature=${signature}`;

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
    const filteredUSDT = result.filter((item) => item.asset === "USDT");
    const availableUSDT = filteredUSDT[0].availableBalance;
    return parseInt(availableUSDT);
  } catch (error) {
    console.log("바이낸스 발란스 fetch에러:", error);
    throw error;
  }
}
