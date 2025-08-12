import { useState } from 'react';
import axios from 'axios';

export default function StoryForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [story, setStory] = useState('');
  const [addr, setAddr] = useState('');
  const [tokens, setTokens] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const resp = await axios.post('/api/mint', {
        title, author, story, recipientAddress: addr, tokensToSend: tokens
      });
      setResult(resp.data);
    } catch (err) {
      setResult({ error: err.response?.data?.error || err.message });
    } finally { setLoading(false); }
  }

  return (
    <form onSubmit={submit} className="space-y-4 bg-neutral-800 p-6 rounded-2xl shadow-lg">
      <label className="block">
        <div className="text-sm text-neutral-300">Title</div>
        <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full mt-1 p-3 rounded bg-neutral-900" placeholder="The trade that hurt" />
      </label>
      <label className="block">
        <div className="text-sm text-neutral-300">Author / Handle (optional)</div>
        <input value={author} onChange={e=>setAuthor(e.target.value)} className="w-full mt-1 p-3 rounded bg-neutral-900" placeholder="anon.eth" />
      </label>
      <label>
        <div className="text-sm text-neutral-300">Your story</div>
        <textarea value={story} onChange={e=>setStory(e.target.value)} rows={8} className="w-full mt-1 p-3 rounded bg-neutral-900" placeholder="Explain how you got rekt..." />
      </label>
      <div className="grid grid-cols-2 gap-4">
        <label>
          <div className="text-sm text-neutral-300">Recipient address</div>
          <input value={addr} onChange={e=>setAddr(e.target.value)} className="w-full mt-1 p-3 rounded bg-neutral-900" placeholder="0x..." />
        </label>
        <label>
          <div className="text-sm text-neutral-300">Rekt tokens to send (admin limit applies)</div>
          <input type="number" value={tokens} onChange={e=>setTokens(e.target.value)} className="w-full mt-1 p-3 rounded bg-neutral-900" />
        </label>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm text-neutral-400">By minting you agree to our terms</div>
        <button type="submit" disabled={loading} className="px-4 py-2 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 font-semibold">{loading ? 'Minting...' : 'Mint NFT & Send Tokens'}</button>
      </div>
      {result && <pre className="mt-4 text-xs p-3 bg-neutral-900 rounded">{JSON.stringify(result, null, 2)}</pre>}
    </form>
  );
}
