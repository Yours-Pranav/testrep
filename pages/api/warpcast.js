import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const key = process.env.WARPSERVER_API_KEY;
    if (!key) return res.status(500).json({ error: 'WARPSERVER_API_KEY not set' });

    const body = req.body;
    const resp = await axios.post('https://api.neynar.com/v2/farcaster/cast', body, {
      headers: { 'x-api-key': key }
    });
    return res.status(200).json(resp.data);
  } catch (err) {
    console.error(err.response?.data || err);
    return res.status(500).json({ error: err.message || String(err) });
  }
}
