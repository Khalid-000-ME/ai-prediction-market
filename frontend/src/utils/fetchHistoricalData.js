import { request, gql } from "graphql-request";

const UNISWAP_API_KEY = process.env.NEXT_PUBLIC_UNISWAP_API_KEY
const UNISWAP_ID = process.env.NEXT_PUBLIC_UNISWAP_ID
const UNISWAP_API = `https://gateway.thegraph.com/api/${UNISWAP_API_KEY}/subgraphs/id/${UNISWAP_ID}`;

export async function getHistoricalData(tokenAddress) {
  const query = gql`
    query getHistoricalPrices($token: String!) {
      token(id: $token) {
        id
        symbol
        name
        tokenDayData(first: 7, orderBy: date, orderDirection: desc) {
          date
          priceUSD
        }
      }
    }
  `;

  try {
    const data = await request(UNISWAP_API, query, { token: tokenAddress.toLowerCase() });
    return data.token ? data.token.tokenDayData : [];
  } catch (error) {
    console.error("Error fetching historical data:", error);
    return [];
  }
}
