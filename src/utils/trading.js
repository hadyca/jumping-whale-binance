import getBalance from "../api/balance";
import getBestOrderBook from "../api/bookTicker";
import limitBuy from "../api/limitBuy";
import limitSell from "../api/limitSell";
import marketBuy from "../api/marketBuy";

export default async function trading({
  symbol,
  beforeRsi,
  nowRsi,
  setRowRsi,
  setHighRsi,
  serverTime,
}) {
  console.log(
    `🚀 트레이딩 감시 중...직전 RSI:${beforeRsi}, 현재 RSI:${nowRsi}`
  );
  if (
    (beforeRsi < setRowRsi && nowRsi > setRowRsi) ||
    (beforeRsi < setHighRsi && nowRsi > setHighRsi)
  ) {
    // 매수1호가 가져오기
    const buyPrice = await getBestOrderBook(symbol);

    //내가 가진 USDT (1배수 기준임, 레버리지 할거면 레버리지 수만큼 곱하면됨)
    const availableUSDT = await getBalance(serverTime);
    const leverage = 10;
    const availableBuyVolume = (availableUSDT * leverage) / buyPrice;
    const threeDecimalBuyVolume = String(
      Math.floor(availableBuyVolume * 1000) / 1000
    );
    // 지정가 매수
    // const limitBuyId = await limitBuy(
    //   symbol,
    //   threeDecimalBuyVolume,
    //   buyPrice,
    //   serverTime
    // );
    const limitBuyId = await marketBuy(
      symbol,
      threeDecimalBuyVolume,
      serverTime
    );

    if (limitBuyId) {
      const profitPercent = 0.003; //0.3%
      const sellPrice = buyPrice + buyPrice * profitPercent;
      const oneDecimalSellPrice = Math.floor(sellPrice * 10) / 10;
      const limitSellId = await limitSell(
        symbol,
        threeDecimalBuyVolume,
        oneDecimalSellPrice,
        serverTime
      );
    } else {
      await trading({
        symbol,
        beforeRsi,
        nowRsi,
        setRowRsi,
        setHighRsi,
        serverTime,
      });
    }
    return limitBuyId;
  }
}
