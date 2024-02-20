import getBalance from "../api/balance";
import getBestOrderBook from "../api/bookTicker";
import limitBuy from "../api/limitBuy";
import limitSell from "../api/limitSell";

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

    const availableBuyVolume = availableUSDT / buyPrice;
    const threeDecimalBuyVolume = String(
      Math.floor(availableBuyVolume * 1000) / 1000
    );

    // 자동 시장가 매수 (일단 매수 가능 수량 100%로 매수)
    const limitBuyId = await limitBuy(
      symbol,
      threeDecimalBuyVolume,
      buyPrice,
      serverTime
    );
    const profitPercent = 0.001; //0.1%
    const sellPrice = buyPrice + buyPrice * profitPercent;
    const oneDecimalSellPrice = Math.floor(sellPrice * 10) / 10;
    const limitSellId = await limitSell(
      symbol,
      threeDecimalBuyVolume,
      oneDecimalSellPrice,
      serverTime
    );
    return limitBuyId;
    // const marketBuyId = await MarketBuy(fourDecimalVolume, coinName);
    // 주문내역 (내가 주문한거 오더id넣고 산 코인 1개당 단가, 갯수, 얼마주고 샀는지)
    // const orderId = "C0101000001420278764"; 실제 예시
    // if (limitBuyId) {
    //   const buyDetail = await getOrderDetail(limitBuyId, coinName);
    //   //주문했던 수량
    //   const orderedVolume = buyDetail.contract[0].units;
    //   //주문했던 1개당 코인단가
    //   const orderedUnitPrice = parseFloat(buyDetail.contract[0].price);
    //   console.log("주문했던 코인단가:", orderedUnitPrice);
    //   //매수가 대비 목표 수익률 및 수익목표액(개당 단가) 로직
    //   const PROFIT_PERCENT = 0.0005; //0.05%
    //   const intTargetSellPrice = parseInt(
    //     orderedUnitPrice + orderedUnitPrice * PROFIT_PERCENT
    //   );
    //   const fianlTargetSellPrice = String(
    //     Math.round(intTargetSellPrice / 1000) * 1000
    //   );
    //   // 지정가 매도 (익절)
    //   const limitSellId = await limitSell(
    //     coinName,
    //     orderedVolume,
    //     fianlTargetSellPrice
    //   );
    //   console.log("지정가 매도 ID : ", limitSellId);
    //   console.log("지정가 매도까지 진행된 현재RSI :", nowRsi);

    //   //지정가 매도 ID로 다시 조회한 후 complete냐 아니냐에 따라서 다시 또 앱 구동
    //   // const sellDetail = await getOrderDetail(limitBuyId, coinName);
    //   return limitSellId;
    // }
  }
}
