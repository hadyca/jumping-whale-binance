require("dotenv").config();
import fetch from "node-fetch";
const crypto = require("crypto");

export default async function getAccount(req, res) {
  try {
    const API_KEY = process.env.BINANCE_OPEN_API_ACCESS_KEY;
    const API_SECRET = process.env.BINANCE_OPEN_API_SECRET_KEY;
    const timestamp = () => new Date().getTime();

    const generateSignature = (queryString) => {
      return crypto
        .createHmac("sha256", API_SECRET)
        .update(queryString)
        .digest("hex");
    };
    try {
      const timestampNow = timestamp();
      const queryString = `timestamp=${timestampNow}`;
      const signature = generateSignature(queryString);

      const url = `https://fapi.binance.com/fapi/v2/account?${queryString}&signature=${signature}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-MBX-APIKEY": API_KEY,
        },
      });

      const result = await response.json();
      return res.send(result);
    } catch (error) {
      console.error("Error fetching futures account:", error);
    }

    // const endpoint = "https://fapi.binance.com/fapi/v2/account";
    // const params = {
    //   timestamp,
    // };
    // let queryString = Object.keys(params)
    //   .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    //   .join("$");
    // const signature = crypto
    //   .createHmac("sha256", apiSecret)
    //   .update(queryString)
    //   .digest("hex");

    // queryString += "&signature=" + signature;

    // const url = endpoint + "?" + signature;

    // const result = await fetch(url, {
    //   method: "GET",
    //   headers: {
    //     "X-MBX-APIKEY": apiKey,
    //   },
    // });
    // const resultData = await result.json();
    // console.log(resultData);
  } catch (error) {
    console.log("바이낸스 account fetch에러:", error);
    throw error;
  }
}
