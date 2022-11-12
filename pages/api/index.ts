import type { NextApiRequest, NextApiResponse } from 'next';
import { Deta } from 'deta';

const deta = Deta(process.env.DETA_PJ_KEY);
const db_post = deta.Base('post_Ipb0')
const db_calendar = deta.Base('calendar_Ipb0')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await db_post.insert({title: 'タイトル'}, 'INIT__KEY')
    await db_calendar.insert({date: '○月○日'}, 'INIT__KEY')
    return res.status(200).send('OK');
  }
}
