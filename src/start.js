import getCandle from "./api/getCandle";
import getClosingPrice from "./utils/reverse_closing";
import calculateRsi from "./utils/calculateRsi";
import getTime from "./api/getTime";
import trading from "./utils/trading";
import getOrderBook from "./api/orderBook";
import getBalance from "./api/balance";

export default async function start() {
  const INTERVAL_TYPE = {
    "1m": "1m",
    "3m": "3m",
    "5m": "5m",
    "15m": "15m",
    "30m": "30m",
    "1h": "1h",
    "2h": "2h",
    "4h": "4h",
    "6h": "6h",
    "8h": "8h",
    "12h": "12h",
    "1d": "1d",
    "3d": "3d",
    "1w": "1w",
    "1M": "1M",
  };

  const SYMBOL = "BTCUSDT";
  const INTERVAL = INTERVAL_TYPE["5m"];
  const SET_ROW_RSI = 30;
  const SET_HIGH_RSI = 70;

  //candle값 가져오기
  // const candleData = await cctxCandle();
  const candleData = await getCandle(SYMBOL, INTERVAL);
  // 200개 종가 배열 [과거->최신순]
  const closingPriceArr = getClosingPrice(candleData);
  //rsi값 추출
  const rsiData = calculateRsi(closingPriceArr);
  const { serverTime } = await getTime();
  // 가져온 rsi값으로 매매하기
  const finalResult = await trading({
    symbol: SYMBOL,
    beforeRsi: rsiData.beforeRsi,
    nowRsi: rsiData.nowRsi,
    setRowRsi: SET_ROW_RSI,
    setHighRsi: SET_HIGH_RSI,
    serverTime: serverTime,
  });
  if (finalResult === undefined) {
    setTimeout(start, 1000);
  } else {
    console.log("🎉 트레이딩 완료!");
  }
}
