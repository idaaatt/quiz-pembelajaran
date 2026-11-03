import { put, list } from '@vercel/blob';
const NAME = 'kingdom-of-green/slides.json';
export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { blobs } = await list({ prefix: NAME, limit: 1 });
      res.setHeader('Cache-Control', 'no-store');
      if (!blobs.length) return res.status(200).json(null);
      const r = await fetch(blobs[0].url + '?t=' + Date.now());
      return res.status(200).json(await r.json());
    }
    if (req.method === 'POST') {
      const pw = process.env.ADMIN_PASSWORD;
      if (!pw || req.headers['x-pw'] !== pw) return res.status(401).json({ error: 'unauthorized' });
      if (req.body && req.body.check) return res.status(200).json({ ok: true });
      if (!Array.isArray(req.body)) return res.status(400).json({ error: 'bad data' });
      await put(NAME, JSON.stringify(req.body), {
        access: 'public', contentType: 'application/json',
        addRandomSuffix: false, allowOverwrite: true
      });
      return res.status(200).json({ ok: true });
    }
    return res.status(405).end();
  } catch (e) {
    return res.status(500).json({ error: String(e) });
  }
}
