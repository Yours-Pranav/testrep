import Head from 'next/head';
import Layout from '../components/Layout';
import StoryForm from '../components/StoryForm';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Rekt Stories — Mint your loss</title>
      </Head>
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-4xl font-extrabold">Rekt Stories</h1>
        <p className="mt-2 text-gray-400">Write how you got rekt in crypto, mint it as an NFT on Arbitrum, and claim some Rekt tokens.</p>
        <div className="mt-6">
          <StoryForm />
        </div>
      </main>
    </Layout>
  );
}
