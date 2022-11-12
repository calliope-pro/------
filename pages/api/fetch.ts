import type { NextApiRequest, NextApiResponse } from 'next';
import { Deta } from 'deta';

const deta = Deta(process.env.DETA_PJ_KEY);
const db_post = deta.Base('post_Ipb0');
const db_calendar = deta.Base('calendar_Ipb0');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const posts = (await db_post.fetch()).items as {
      title: string;
      key: string;
    }[];
    const dates = (await db_calendar.fetch()).items as {
      key: string;
      date: string;
    }[];
    return res.status(200).json({ posts, dates });
  }
}
