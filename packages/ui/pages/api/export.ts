import type { NextApiRequest, NextApiResponse } from 'next'

export const Export = (
  req: NextApiRequest, 
  res:NextApiResponse
) => {
  res.json({test: 'TEST!!'})
}
export default Export