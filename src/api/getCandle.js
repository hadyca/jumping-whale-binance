// import fetch from "node-fetch";

export default async function getCandle(symbol, interval) {
  try {
    const candleData = await fetch(
      `https://fapi.binance.com/fapi/v1/klines?symbol=${symbol}&interval=${interval}&limit=200`
    );
    const result = await candleData.json();
    return result;
  } catch (error) {
    console.log("바이낸스 캔들값 fetch에러:", error);
    throw error;
  }
}
