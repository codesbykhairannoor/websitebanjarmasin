import fs from 'fs';
import path from 'path';
import Link from 'next/link';

// Read JSON dataset
const datasetPath = path.join(process.cwd(), 'src/data/pseo-dataset.json');
const dataset = JSON.parse(fs.readFileSync(datasetPath, 'utf8'));

export async function generateStaticParams() {
  const locales = ['id', 'en', 'ms', 'zh'];
  const params = [];
  
  for (const lang of locales) {
    for (const record of dataset) {
      params.push({ lang, slug: record.slug });
    }
  }
  
  return params;
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const record = dataset.find(r => r.slug === slug);
  
  if (!record) return { title: 'Not Found' };
  
  return {
    title: `${record.title} | Visit Banjarmasin`,
    description: record.description,
    keywords: `${record.location}, ${record.category}, wisata banjarmasin, kalimantan selatan`,
    alternates: {
      canonical: `https://visitbanjarmasin.id/${lang}/explore/${slug}`
    }
  };
}

export default async function PSEOPage({ params }) {
  const { lang, slug } = await params;
  const record = dataset.find(r => r.slug === slug);
  
  if (!record) {
    return <div className="p-20 text-center">Halaman tidak ditemukan.</div>;
  }

  // Schema.org specifically for this pSEO page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": record.title,
    "description": record.description,
    "author": {
      "@type": "Organization",
      "name": "Visit Banjarmasin"
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-[var(--bg-main)] text-[var(--text-main)] font-body">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-[var(--text-muted)]">
          <Link href={`/${lang}`} className="hover:text-[#F4C038]">Home</Link>
          <span className="mx-2">/</span>
          <span className="capitalize">{record.category}</span>
          <span className="mx-2">/</span>
          <span className="text-[#00A896]">{record.location}</span>
        </nav>

        {/* Hero Title */}
        <header className="space-y-4">
          <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#33C3B3] to-[#F4C038]">
            {record.title}
          </h1>
          <p className="text-lg sm:text-xl text-[var(--text-muted)] leading-relaxed max-w-2xl">
            {record.description}
          </p>
        </header>

        {/* Dynamic Content Block */}
        <section className="bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-3xl p-6 sm:p-10 space-y-6">
          <h2 className="font-heading font-bold text-2xl">Jelajahi {record.location}</h2>
          <p className="text-[var(--text-muted)] leading-relaxed">
            Banjarmasin, khususnya kawasan <strong>{record.location}</strong>, menawarkan berbagai daya tarik wisata dan fasilitas lengkap. 
            Mencari <strong>{record.category}</strong> kini semakin mudah dengan panduan lokal resmi kami.
          </p>
          <p className="text-[var(--text-muted)] leading-relaxed">
            Sebagai "Kota Seribu Sungai", pastikan Anda juga menyempatkan diri mengunjungi Pasar Terapung dan menikmati soto Banjar yang autentik saat Anda berada di {record.location}.
          </p>
          
          <div className="pt-6">
            <Link 
              href={`/${lang}/wisata`} 
              className="inline-flex items-center justify-center px-6 py-3 bg-[#00A896] hover:bg-[#33C3B3] text-white font-bold rounded-xl transition-colors"
            >
              Lihat Semua Destinasi Wisata
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
