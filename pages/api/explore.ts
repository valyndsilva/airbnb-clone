// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  exploreData: Explore;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const exploreResponse = await fetch("https://www.jsonkeeper.com/b/SKW4");
  const exploreData = await exploreResponse.json();
  console.log(exploreData);

  // Get Explore Data
  res.status(200).json(exploreData);
}
