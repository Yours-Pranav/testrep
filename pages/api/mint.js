import { getAdminSigner } from '../../lib/ethersClient';
import { ERC20_ABI, ERC721_ABI } from '../../lib/abis';
import { NFTStorage } from 'nft.storage';

import { ethers } from 'ethers';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { title, author, story, recipientAddress, tokensToSend } = req.body;
    if (!title || !story || !recipientAddress) return res.status(400).json({ error: 'missing fields' });

    const admin = getAdminSigner();

    // 1) Upload metadata to nft.storage if key present
    let tokenURI = null;
    const key = process.env.NFT_STORAGE_KEY;
    if (key) {
      const client = new NFTStorage({ token: key });
      const metadata = await client.store({
        name: title,
        description: story,
        image: null,
        properties: { author }
      });
      tokenURI = metadata.url; // ipnft://...
    } else {
      const json = { name: title, description: story, properties: { author } };
      tokenURI = 'data:application/json,' + encodeURIComponent(JSON.stringify(json));
    }

    // 2) Mint NFT by calling NFT contract
    const nftAddr = process.env.NFT_CONTRACT_ADDRESS;
    if (!nftAddr) return res.status(500).json({ error: 'NFT_CONTRACT_ADDRESS not set' });
    const nftContract = new ethers.Contract(nftAddr, ERC721_ABI, admin);
    const tx = await nftContract.mintTo(recipientAddress, tokenURI);
    const receipt = await tx.wait();

    // 3) Transfer REKT tokens
    let tokenTxHash = null;
    const rektAddr = process.env.REKT_TOKEN_ADDRESS;
    if (rektAddr && Number(tokensToSend) > 0) {
      const max = Number(process.env.MAX_REKT_PER_MINT || 100);
      const toSend = Math.min(Number(tokensToSend), max);
      const tokenContract = new ethers.Contract(rektAddr, ERC20_ABI, admin);
      const decimals = 18;
      const amt = ethers.parseUnits(String(toSend), decimals);
      const ttx = await tokenContract.transfer(recipientAddress, amt);
      const ttxRec = await ttx.wait();
      tokenTxHash = ttxRec.transactionHash || ttxRec.hash || null;
    }

    return res.status(200).json({ success: true, mintReceipt: receipt, tokenTxHash });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || String(err) });
  }
}
