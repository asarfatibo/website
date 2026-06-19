import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { LegalLayout } from "@/components/LegalLayout";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  await getDictionary(locale);
  return {
    title: "Liste des destinataires de données | bubbleOut",
    description: "Liste des partenaires et prestataires auxquels bubbleOut peut transmettre vos données personnelles, conformément à notre politique de confidentialité.",
    alternates: {
      canonical: "/fr/liste-des-destinataires-de-donnees",
      languages: {
        fr: "/fr/liste-des-destinataires-de-donnees",
        "x-default": "/fr/liste-des-destinataires-de-donnees",
      },
    },
  };
}

export default async function DataRecipientsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <LegalLayout>
      <h1 className="text-3xl font-bold text-ink md:text-4xl">
        Liste des destinataires de données
      </h1>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-ink/20 bg-white/60">
              <th className="px-4 py-3 text-left font-bold text-ink">Nom</th>
              <th className="px-4 py-3 text-left font-bold text-ink">Finalité</th>
              <th className="px-4 py-3 text-left font-bold text-ink">Région</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-ink/10">
              <td className="px-4 py-3 font-medium text-ink">Amazon Web Services</td>
              <td className="px-4 py-3">
                <p>Modération du contenu</p>
                <p>Hébergement et stockage</p>
              </td>
              <td className="px-4 py-3">Union européenne</td>
            </tr>
            <tr className="border-b border-ink/10 bg-white/40">
              <td className="px-4 py-3 font-medium text-ink">Google Cloud Platform</td>
              <td className="px-4 py-3">Hébergement et stockage</td>
              <td className="px-4 py-3">Union européenne</td>
            </tr>
            <tr className="border-b border-ink/10">
              <td className="px-4 py-3 font-medium text-ink">Google Firebase</td>
              <td className="px-4 py-3">
                <p>Gestion des notifications</p>
                <p>Vérification des emails</p>
              </td>
              <td className="px-4 py-3">États-Unis</td>
            </tr>
            <tr className="border-b border-ink/10 bg-white/40">
              <td className="px-4 py-3 font-medium text-ink">Google Analytics</td>
              <td className="px-4 py-3">Analyse de données</td>
              <td className="px-4 py-3">Union européenne</td>
            </tr>
          </tbody>
        </table>
      </div>
    </LegalLayout>
  );
}
