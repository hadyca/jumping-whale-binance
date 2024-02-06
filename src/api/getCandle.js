import fetch from "node-fetch";

export default async function getCandle(req, res) {
  try {
    const candleData = await fetch(
      "https://fapi.binance.com/fapi/v1/klines?symbol=BTCUSDT&interval=5m&limit=200"
    );
    const result = await candleData.json();
    return res.send(result);
  } catch (error) {
    console.log("바이낸스 캔들값 fetch에러:", error);
    throw error;
  }
}
