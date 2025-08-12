import { ethers } from 'ethers';

export function getProvider() {
  const url = process.env.RPC_URL;
  if (!url) throw new Error('RPC_URL not set');
  return new ethers.JsonRpcProvider(url);
}

export function getAdminSigner() {
  const pk = process.env.ADMIN_PRIVATE_KEY;
  if (!pk) throw new Error('ADMIN_PRIVATE_KEY not set in env');
  const provider = getProvider();
  return new ethers.Wallet(pk, provider);
}
