// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteCookie, getCookies } from 'cookies-next'
import { deleteToken } from '../../utils/auth'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	res.redirect('/login')
}
