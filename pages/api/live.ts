// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  liveData: Live;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const liveResponse = await fetch("https://www.jsonkeeper.com/b/92GA");
  const liveData = await liveResponse.json();

  // Get Live Data
  res.status(200).json(liveData);
}
