require("dotenv").config();
const ccxt = require("ccxt");

export default async function cctxCandle() {
  try {
    const exchange = new ccxt.binance({
      // 필요한 경우 인증 정보를 설정합니다.
      apiKey: process.env.BINANCE_OPEN_API_ACCESS_KEY,
      secret: process.env.BINANCE_OPEN_API_SECRET_KEY,
    });
    // 마켓 정보를 설정합니다. (예: BTC/USDT)
    const symbol = "BTC/USDT";

    // 타임프레임 설정 (5분)
    const timeframe = "5m";
    const candles = await exchange.fetchOHLCV(symbol, timeframe, undefined, 5);
    console.log(candles);
  } catch (error) {
    console.log("바이낸스 캔들값 fetch에러:", error);
    throw error;
  }
}
