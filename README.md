# Rekt Story NFT Webapp

A Next.js app to write a "rekt" crypto story, mint it as an ERC-721 on Arbitrum, and send REKT ERC-20 tokens from an admin wallet.

## Quick start

1. `npm install`
2. Copy `.env.example` to `.env.local` and set environment variables (do NOT commit private keys).
3. (Optional) Deploy the Solidity contract using Hardhat: `npx hardhat run --network <network> scripts/deploy.js`
4. `npm run dev`
5. Deploy to Vercel: push to GitHub and connect, or upload the folder directly.

See `/contracts` and `/hardhat` for deployment scripts.
