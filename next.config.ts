import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/.well-known/apple-app-site-association",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
    ];
  },
  async redirects() {
    // Legacy URLs from the old Hostinger site (still indexed / linked).
    return [
      { source: "/mission", destination: "/fr/a-propos", permanent: true },
      { source: "/en/mission", destination: "/en/a-propos", permanent: true },
      { source: "/security", destination: "/fr/securite", permanent: true },
      { source: "/en/security", destination: "/en/securite", permanent: true },
      { source: "/conseils-de-securite", destination: "/fr/securite", permanent: true },
      { source: "/fr/s%C3%A9curit%C3%A9", destination: "/fr/securite", permanent: true },
      { source: "/en/s%C3%A9curit%C3%A9", destination: "/en/securite", permanent: true },
      { source: "/terms-and-conditions", destination: "/fr/conditions-d-utilisations", permanent: true },
      { source: "/en/terms-and-conditions", destination: "/en/conditions-d-utilisations", permanent: true },
      { source: "/privacy-policy", destination: "/fr/politique-de-confidentialite", permanent: true },
      { source: "/en/privacy-policy", destination: "/en/politique-de-confidentialite", permanent: true },
      { source: "/data-recipients", destination: "/fr/liste-des-destinataires-de-donnees", permanent: true },
      { source: "/en/data-recipients", destination: "/en/liste-des-destinataires-de-donnees", permanent: true },
      { source: "/child-safety", destination: "/fr/protection-des-mineurs", permanent: true },
      { source: "/en/child-safety", destination: "/en/protection-des-mineurs", permanent: true },
      { source: "/contact", destination: "/fr/contactez-nous", permanent: true },
      { source: "/en/contact", destination: "/en/contactez-nous", permanent: true },
      { source: "/feedback", destination: "/fr/nous-ecrire", permanent: true },
      { source: "/en/feedback", destination: "/en/nous-ecrire", permanent: true },
      { source: "/faq", destination: "/fr/faq", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.bubbleout.fr",
        port: "4003",
        pathname: "/public/**",
      },
    ],
  },
};

export default nextConfig;
