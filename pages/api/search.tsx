// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  searchData: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const searchResponse = await fetch("https://www.jsonkeeper.com/b/TMUL");
  const searchData = await searchResponse.json();
  console.log(searchData);

  // Get Search Data
  res.status(200).json(searchData);
}
