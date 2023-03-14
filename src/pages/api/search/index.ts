import type { NextApiRequest, NextApiResponse } from 'next';

type HandlreData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlreData>
) {
  return res.status(400).json({ message: 'You must specify a search term' });
}
