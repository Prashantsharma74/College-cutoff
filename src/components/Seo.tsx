import Head from "next/head";

type SEOProps = {
  title: string;
  description: string;
  keywords: string;
};

export default function Seo({ title, description, keywords }: SEOProps) {
  return (
    <Head>
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph (for sharing) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />

      {/* Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
}