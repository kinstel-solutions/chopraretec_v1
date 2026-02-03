import { companyData } from '@/data/company';

export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: companyData.name,
    url: 'https://chopraretec.com',
    logo: 'https://chopraretec.com/logos/GroupNo-text-light-mode-noBG.svg',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: companyData.contact.phone[0], 
      contactType: 'sales',
      areaServed: 'Global',
      availableLanguage: 'English',
    },
    sameAs: [
      companyData.social.linkedin,
      companyData.social.facebook
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: companyData.contact.address.registered,
      addressLocality: 'Lucknow',
      addressRegion: 'Uttar Pradesh',
      postalCode: '226001',
      addressCountry: 'IN',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
