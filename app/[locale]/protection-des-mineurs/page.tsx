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
    title: "Protection des mineurs | bubbleOut",
    description: "Engagement de bubbleOut pour la protection des mineurs et la prévention de l'exploitation. Politique de tolérance zéro, modération IA et système de signalement.",
    alternates: {
      canonical: "/fr/protection-des-mineurs",
      languages: {
        fr: "/fr/protection-des-mineurs",
        "x-default": "/fr/protection-des-mineurs",
      },
    },
  };
}

export default async function ChildSafetyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <LegalLayout>
      <h1 className="text-3xl font-bold text-ink md:text-4xl">
        Engagement pour la protection des mineurs
      </h1>

      <div className="mt-10 space-y-6">
        <p>
          Chez <em>bubbleOut</em>, la sécurité de nos utilisateurs est notre priorité absolue. En tant
          que plateforme sociale destinée aux adultes, nous nous engageons à prévenir toute forme
          d&apos;exploitation, d&apos;abus ou de comportement nuisible – en particulier envers les mineurs.
        </p>

        <section>
          <h2 className="text-xl font-bold text-ink">
            1. Prévention de l&apos;exploitation et des abus sexuels sur mineurs
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              L&apos;utilisation de <em>bubbleOut</em> est formellement interdite aux personnes âgées de
              moins de 18 ans.
            </li>
            <li>
              Nous appliquons une politique de tolérance zéro à l&apos;égard de tout contenu impliquant
              ou exploitant des mineurs, qu&apos;il s&apos;agisse d&apos;images, de propos, de comportements ou de
              tout élément susceptible d&apos;encourager ou de faciliter de telles pratiques.
            </li>
            <li>
              Tous les contenus visuels et textuels publiés sur la plateforme (à l&apos;exception des
              messages privés envoyés via la messagerie) font l&apos;objet d&apos;une modération automatisée
              par intelligence artificielle, permettant la détection et la suppression immédiate des
              contenus illicites ou inappropriés.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink">
            2. Protection des utilisateurs, modération du contenu et mécanismes de signalement
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              L&apos;application intègre un système de signalement accessible à tout moment, permettant
              aux utilisateurs de notifier tout comportement ou contenu inapproprié.
            </li>
            <li>
              Chaque signalement fait l&apos;objet d&apos;un examen rapide par notre équipe de modération,
              qui applique les mesures nécessaires, notamment la suspension ou la suppression du
              compte concerné.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink">
            3. Contact pour signaler un problème de sécurité
          </h2>
          <p className="mt-3">
            Si vous suspectez qu&apos;un utilisateur est mineur ou qu&apos;il adopte un comportement
            inapproprié, nous vous invitons à :
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              le signaler directement via le bouton prévu à cet effet dans l&apos;application ;
            </li>
            <li>
              ou à nous contacter à l&apos;adresse suivante :{" "}
              <a href="mailto:dpo@bubbleout.fr" className="text-blue hover:underline">
                dpo@bubbleout.fr
              </a>
              .
            </li>
          </ul>
          <p className="mt-4">
            Nous nous engageons à traiter avec la plus grande diligence toute alerte liée à la
            sécurité, en particulier celles impliquant des mineurs.
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}
