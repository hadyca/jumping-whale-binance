export default function getClosingPrice(candleData) {
  //종가만 뽑아옴, 최종적 배열은, 종가만 뽑아내서 가장 최근값이 맨 뒤로감
  const closingPriceArr = candleData.map((v) => parseFloat(v[4]));

  return closingPriceArr;
}
