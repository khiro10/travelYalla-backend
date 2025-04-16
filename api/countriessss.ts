// /api/countries.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const response = await axios.get('https://api.travelpayouts.com/data/en/countries.json');
    res.status(200).json(response.data);
    console.log(req);
    
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
