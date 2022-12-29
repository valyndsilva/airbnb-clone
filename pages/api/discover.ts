// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
type Data = {
  discoverData: Discover;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const discoverResponse = await fetch("https://www.jsonkeeper.com/b/NLWV");
  const discoverData = await discoverResponse.json();

  //Get Discover Data
  res.status(200).json(discoverData);
}
