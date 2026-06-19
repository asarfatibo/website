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
    title: "Politique de Confidentialité | bubbleOut",
    description:
      "Politique de confidentialité de bubbleOut. Comment nous collectons, utilisons et protégeons vos données personnelles conformément au RGPD.",
    alternates: {
      canonical: "/fr/politique-de-confidentialite",
      languages: {
        fr: "/fr/politique-de-confidentialite",
        "x-default": "/fr/politique-de-confidentialite",
      },
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <LegalLayout>
      <h1 className="text-3xl font-bold text-ink md:text-4xl">
        Politique de confidentialité
      </h1>

      <div className="mt-8 space-y-4 text-ink/80">
        <p>
          Nous nous engageons à protéger votre vie privée et à traiter vos données personnelles de
          manière transparente, sécurisée et légale.
        </p>
        <p>
          BUBBLEOUT (ci-après, &laquo;&nbsp;<strong>BUBBLEOUT</strong>&nbsp;&raquo;, ou la &laquo;&nbsp;
          <strong>Société</strong>&nbsp;&raquo;) traitera vos données personnelles lorsque vous visitez
          et utilisez les services fournis sur l&apos;application mobile (ci-après
          l&apos;&laquo;&nbsp;<strong>Application</strong>&nbsp;&raquo;) ou interagissez autrement avec
          nous comme indiqué dans les présentes.
        </p>
        <p>
          Vous trouverez ci-dessous des informations sur le type de données personnelles que nous
          traitons, pourquoi nous le faisons, à quoi servent ces données et comment nous pouvons les
          partager, et quels sont vos droits en tant que Personne concernée.
        </p>
        <p>
          L&apos;Application est éditée par la société BUBBLEOUT SASU, société par actions simplifiée
          unipersonnelle, dont le siège social est situé au 49 RUE DE PONTHIEU, 75008 PARIS immatriculée
          au Registre du Commerce et des Sociétés de Paris sous le numéro 932&nbsp;151&nbsp;814,
          identifiée avec le N° TVA intracommunautaire FR 65932151814. Les coordonnées de BUBBLEOUT sont
          49 RUE DE PONTHIEU, 75008 PARIS et{" "}
          <a href="mailto:hello@bubbleout.fr" className="text-blue hover:underline">
            hello@bubbleout.fr
          </a>
          .
        </p>
        <p>
          Le respect de votre vie privée et de vos données personnelles est une priorité pour la Société
          qui s&apos;engage à traiter vos données conformément à la loi Informatique et Libertés n°
          78-17 du 6 janvier 1978 modifiée, au Règlement Général sur la Protection des Données (UE)
          2016/679 du 27 avril 2016 (ci-après &laquo;&nbsp;<strong>RGPD</strong>&nbsp;&raquo;) et aux
          normes et recommandations y afférentes émises par la Commission Nationale de l&apos;Informatique
          et des Libertés (la &laquo;&nbsp;<strong>CNIL</strong>&nbsp;&raquo;) ou le Comité Européen de
          la Protection des Données ou d&apos;autres autorités compétentes dont les décisions, lignes
          directrices ou normes s&apos;appliquent sur le territoire français (ensemble, le
          &laquo;&nbsp;<strong>Règlement Applicable</strong>&nbsp;&raquo;).
        </p>
        <p>
          La Société est le contrôleur de données pour tous les traitements de vos données personnelles,
          sauf indication contraire dans la présente politique de confidentialité (ci-après
          &laquo;&nbsp;<strong>Politique de confidentialité</strong>&nbsp;&raquo;).
        </p>
        <p>
          Nous n&apos;utilisons vos données personnelles qu&apos;aux fins, pour les motifs légaux et pour
          les périodes de conservation spécifiées ci-dessous.
        </p>
        <p>
          La Société agit en tant que contrôleur de données pour toutes les données collectées par le
          biais de l&apos;Application, par tout autre moyen, ou lorsque vous entrez dans une relation
          contractuelle avec la Société.
        </p>
        <p>
          Pour toute question relative à l&apos;utilisation de vos données personnelles et à vos droits
          connexes, vous pouvez contacter la Société par l&apos;un des moyens suivants&nbsp;:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            par courrier électronique à l&apos;adresse suivante&nbsp;:{" "}
            <a href="mailto:hello@bubbleout.fr" className="text-blue hover:underline">
              hello@bubbleout.fr
            </a>
          </li>
          <li>par courrier postal à l&apos;adresse suivante&nbsp;: 49 RUE DE PONTHIEU, 75008 PARIS</li>
        </ul>

        <p className="font-semibold">Définitions des termes</p>
        <p>
          Au sein de la Politique de confidentialité, les termes suivants sont entendus tels que définis
          ci-dessous&nbsp;:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Application</strong>&nbsp;: l&apos;Application BUBBLEOUT, disponible sur les
            plateformes de téléchargement mobile Google ou Apple.
          </li>
          <li>
            <strong>Utilisateur</strong>&nbsp;: personne inscrite sur l&apos;Application.
          </li>
          <li>
            <strong>Event</strong>&nbsp;: événement créé sur l&apos;Application par un Utilisateur qui
            permet aux autres Utilisateurs d&apos;y participer.
          </li>
          <li>
            <strong>Spotlight</strong>&nbsp;: une interface qui met en avant 10 Utilisateurs ou 10
            Events, filtrés selon les préférences sélectionnées par l&apos;Utilisateur.
          </li>
          <li>
            <strong>Discovery</strong>&nbsp;: en appuyant sur le bouton « Appliquer » de la page
            «&nbsp;Filtrer et Afficher&nbsp;» du Spotlight, notre algorithme sélectionne et affiche dans
            le Spotlight les Utilisateurs ou Events correspondant aux critères choisis, afin de maximiser
            les chances de trouver ce qui intéresse vraiment.
          </li>
          <li>
            <strong>Map</strong>&nbsp;: carte qui permet de trouver des Utilisateurs et des Events à
            proximité.
          </li>
          <li>
            <strong>Passe</strong>&nbsp;: action permettant d&apos;exprimer discrètement son désintérêt
            en sélectionnant une croix. Cette action reste confidentielle et ne déclenche aucune
            notification. Les profils passés ne réapparaîtront plus dans le Spotlight ou la Map de
            l&apos;Utilisateur.
          </li>
          <li>
            <strong>Like</strong>&nbsp;: action symbolisée par un cœur ayant pour but d&apos;exprimer
            son intérêt. Tous les Utilisateurs ont accès à la liste des Likes.
          </li>
          <li>
            <strong>Comment</strong>&nbsp;: action symbolisée par un message texte ayant pour but
            d&apos;exprimer son intérêt de manière plus marqué en envoyant un commentaire à un
            Utilisateur. Tous les Utilisateurs ont accès à la liste des Comments.
          </li>
          <li>
            <strong>Certification de profil</strong>&nbsp;: fonctionnalité obligatoire pour continuer à
            utiliser l&apos;application. Elle permet d&apos;authentifier la photo de profil de
            l&apos;Utilisateur, en attestant auprès des autres Utilisateurs que l&apos;image de son
            visage mise en ligne correspond bien à l&apos;apparence réelle de l&apos;Utilisateur, grâce
            à une vérification par vidéo.
          </li>
          <li>
            <strong>Compatibles</strong>&nbsp;: Lorsque deux Utilisateurs témoignent d&apos;un intérêt
            mutuel, ce qui déclenche une notification permettant d&apos;ouvrir une discussion.
          </li>
          <li>
            <strong>Boost</strong>&nbsp;: fonctionnalité permettant aux Utilisateurs d&apos;augmenter la
            visibilité de leur profil ou de leur Event pendant la durée de l&apos;activation de cette
            option.
          </li>
          <li>
            <strong>Messages et/ou messages vocaux</strong>&nbsp;: seuls les Utilisateurs qui sont
            Compatibles ou qui ont été accepté à un Event peuvent s&apos;envoyer des Messages dans les
            conversations respectives.
          </li>
          <li>
            <strong>Services</strong>&nbsp;: ensemble des prestations, gratuites ou payantes, proposées
            par BUBBLEOUT afin de mettre en relation les Utilisateurs en fonction de leurs préférences
            personnelles et de leur localisation. Cela inclut la création ou la participation à des
            Events, ainsi que la possibilité de se connecter directement avec d&apos;autres Utilisateurs.
          </li>
          <li>
            <strong>BUBBLEOUT Premium</strong>&nbsp;: ensemble de Services payants proposés par
            BUBBLEOUT sous forme d&apos;abonnement mensuel.
          </li>
          <li>
            <strong>Compte</strong>&nbsp;: espace personnel réservé à l&apos;Utilisateur sur
            l&apos;Application, accessible après inscription et connexion. Il permet à l&apos;Utilisateur
            de profiter pleinement des Services proposés par l&apos;Application. Chaque Utilisateur est
            limité à un seul Compte pour garantir l&apos;authenticité des interactions.
          </li>
        </ul>
      </div>

      <section className="mt-10 space-y-4 text-ink/80">
        <h2 className="text-xl font-bold text-ink">2. Responsable de traitement</h2>
        <p>
          Les données collectées sont traitées par la société BUBBLEOUT, immatriculée sous le numéro
          932&nbsp;151&nbsp;814 au Registre du Commerces et des Sociétés de Paris, dont le siège social
          est situé au 49 rue de Ponthieu, 75008 France, et représentée par son Président, Monsieur Alban
          Sarfati.
        </p>
        <p>
          Chez BUBBLEOUT, la protection de vos données personnelles et le respect de votre vie privée
          sont nos priorités. Cette politique de confidentialité, en complément de nos Conditions
          Générales d&apos;Utilisation, et de tout autre document connexe, a pour but de vous expliquer
          comment nous traitons les informations que vous nous communiquez et celles que nous collectons
          lorsque vous utilisez notre Application.
        </p>
        <p>
          Vous pouvez contacter notre Service de protection des données à l&apos;adresse électronique
          suivante&nbsp;:{" "}
          <a href="mailto:dpo@bubbleout.fr" className="text-blue hover:underline">
            dpo@bubbleout.fr
          </a>{" "}
          ou par voie postale&nbsp;: à l&apos;attention du Délégué à la protection des données, BUBBLEOUT
          — 49 rue de Ponthieu 75008 Paris.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-ink/80">
        <h2 className="text-xl font-bold text-ink">3. Les données que nous recueillons</h2>
        <p>
          Pour vous offrir une expérience enrichissante sur BUBBLEOUT, nous devons collecter certaines
          données vous concernant, telles que les informations de base de votre profil et vos préférences
          sociales. Il s&apos;agit d&apos;informations que vous nous envoyez directement ou des données
          que nous collectons automatiquement.
        </p>

        <h3 className="mt-2 text-lg font-semibold text-ink">
          3.1 Qu&apos;est-ce qu&apos;une donnée personnelle&nbsp;?
        </h3>
        <p>
          Les données personnelles sont toutes les informations qui sont directement ou indirectement liées
          à une personne physique (&laquo;&nbsp;<strong>Personne concernée</strong>&nbsp;&raquo;),
          c&apos;est-à-dire tout type d&apos;information qui peut être associé à un individu. Il peut
          s&apos;agir, par exemple, de noms, d&apos;adresses électroniques ou de numéros de téléphone
          s&apos;ils peuvent être associés à une personne physique vivante particulière, mais aussi, par
          exemple, d&apos;une photo sur laquelle la personne peut être reconnue (ci-après
          &laquo;&nbsp;<strong>Données Personnelles</strong>&nbsp;&raquo;).
        </p>

        <h3 className="mt-2 text-lg font-semibold text-ink">
          3.2 Que signifie « traitement » de données à caractère personnel&nbsp;?
        </h3>
        <p>
          En principe, le terme &laquo;&nbsp;<strong>Traitement</strong>&nbsp;&raquo; comprend tous les
          types d&apos;actions qu&apos;il est possible d&apos;entreprendre avec des Données Personnelles.
          La définition est très large et comprend toutes les formes de traitement des données, de la
          collecte, l&apos;enregistrement, la conservation/le stockage et l&apos;adaptation à
          l&apos;utilisation, au partage et même à la suppression des Données Personnelles.
        </p>

        <p className="font-semibold">Données d&apos;inscription</p>
        <p>
          Lorsque vous créez un Compte, vous nous fournissez des informations nécessaires à la
          configuration de votre profil, telles que votre email, mot de passe, prénom, date de naissance,
          genre, une photo et l&apos;identifiant unique de votre appareil. Lorsque vous vous inscrivez
          via Apple ou Google, nous récupérons obligatoirement votre prénom et votre adresse email selon
          votre Apple/Google ID.
        </p>

        <p className="font-semibold">Données de profil</p>
        <p>
          Lorsque vous complétez votre profil, vous avez la possibilité de partager des informations
          supplémentaires, telles que votre bio, vos centres d&apos;intérêt, vos langues parlées, etc.
          Certaines de ces données peuvent être qualifiées de juridiquement « sensibles » en vertu du
          de la Règlementation applicable. Il s&apos;agit notamment des données relatives aux origines
          raciales ou ethniques, les croyances religieuses ou les affiliations politiques. Lorsque vous
          communiquez ces informations, elles sont rendues visibles par les autres Utilisateurs de
          l&apos;Application. La responsabilité de BUBBLEOUT ne saurait être recherchée pour les données
          divulguées et rendues publiques par un Utilisateur sur BUBBLEOUT.
        </p>

        <p className="font-semibold">Données de localisation</p>
        <p>
          Pour vous permettre de découvrir des profils et des Events à proximité, nous devons accéder à
          votre position géographique. En aucun cas, BUBBLEOUT ne révèlera votre position exacte aux
          autres Utilisateurs de l&apos;Application, celle-ci sera affichée de manière approximative,
          avec une marge d&apos;erreur située entre 500 mètres et 1 kilomètre par rapport à la position
          de sa dernière connexion à l&apos;Application.
        </p>
        <p>
          Si lors de votre inscription, vous ne donnez pas votre consentement à la géolocalisation, vous
          ne pourrez pas accéder aux principales fonctionnalités de l&apos;Application. Nous sauvegardons
          uniquement la localisation correspondant à votre dernière connexion pour améliorer
          l&apos;expérience utilisateur. Votre position en temps réel n&apos;est jamais partagée ni
          sauvegardée de manière continue.
        </p>

        <p className="font-semibold">Données de contenu</p>
        <p>
          En utilisant notre Service, vous avez la possibilité de publier divers types de contenu, comme
          des photographies, enregistrements audio, textes, ainsi que d&apos;avoir des conversations avec
          d&apos;autres Utilisateurs.
        </p>

        <p className="font-semibold">Données relatives aux témoignages et à la satisfaction</p>
        <p>
          Ces données sont collectées par BUBBLEOUT lorsque vous répondez à nos sondages et questionnaires
          de satisfaction, livrez vos témoignages. Ces données sont facultatives.
        </p>

        <p className="font-semibold">Données de certification de profil</p>
        <p>
          Dès que vous devenez actif sur l&apos;Application, c&apos;est-à-dire lorsque vous envoyez ou
          recevez un Like ou un Comment pour la première fois, vous devrez procéder à la Certification de
          profil pour continuer à utiliser l&apos;Application en réalisant une vérification par selfie.
          Cette vérification implique votre consentement et consiste en une étape simple&nbsp;: prendre
          un selfie.
        </p>
        <p>
          La vérification de l&apos;authenticité du visage analyse le visage dans votre selfie. Ce selfie
          est enregistré et utilisé pour la comparaison des visages avec vos photos de profil. Nous
          conserverons cette image pendant toute la durée de vie de votre compte. Cette image est
          supprimée à la fermeture du compte.
        </p>

        <p className="font-semibold">Données relatives au marketing</p>
        <p>
          Nous pouvons organiser des promotions, événements ou concours à des fins de marketing. Si vous
          décidez de participer, vous nous fournissez les informations nécessaires pour gérer votre
          inscription et participation ainsi que votre consentement.
        </p>

        <p className="font-semibold">Données relatives aux interactions</p>
        <p>
          Lorsque vous contactez le support client de BUBBLEOUT, signalez un Utilisateur ou un Event,
          etc, nous collectons certaines informations personnelles nécessaires pour traiter votre demande.
          Cela inclut la date, l&apos;heure, et la nature de votre requête, ainsi que les données liées à
          un Utilisateur ou Event signalé, le cas échéant.
        </p>
        <p>
          Nous recueillons également des informations lorsque vous nous envoyez des feedbacks ou lorsque
          vous nous contactez pour des partenariats. Ces données sont facultatives, mais essentielles pour
          améliorer nos Services.
        </p>

        <p className="font-semibold">Données générées ou recueillies automatiquement</p>

        <p className="font-semibold">Données relatives à l&apos;utilisation</p>
        <p>
          Lorsque vous utilisez BUBBLEOUT, des données sont générées en fonction de votre activité, telles
          que les fonctionnalités que vous avez utilisées, vos créations d&apos;Events et vos interactions
          avec d&apos;autres Utilisateurs.
        </p>
        <p>
          Ces informations, telles que votre date d&apos;inscription, votre dernière position géographique
          et vos préférences de recherche, sont essentielles pour le bon fonctionnement des Services
          BUBBLEOUT.
        </p>
        <p>
          Sans ces données, nous ne serions pas en mesure de vous offrir une expérience personnalisée et
          optimale sur notre Application.
        </p>

        <p className="font-semibold">Données relatives aux transactions</p>
        <p>
          BUBBLEOUT ne collecte ni ne stocke aucune donnée bancaire. Les transactions réalisées via les
          plateformes de téléchargement Google ou Apple sont entièrement gérés par ces plateformes. Les
          seules données échangées entre BUBBLEOUT et ces plateformes concernent des aspects techniques,
          comme un numéro de transaction anonyme utilisé pour valider les transactions, la date et
          l&apos;heure de l&apos;achat, etc. BUBBLEOUT conservera un historique de vos achats et
          abonnements, mais aucune donnée relative à vos moyens de paiement ne sera conservée.
        </p>

        <p className="font-semibold">Données relatives à la communication</p>
        <p>
          Les messages texte et vocaux échangés sur BUBBLEOUT sont strictement privés et concernent
          uniquement les Utilisateurs impliqués dans la conversation. Les administrateurs de BUBBLEOUT
          n&apos;ont aucun contrôle sur ces échanges. Ces messages ne sont ni partagés ni communiqués à
          des tiers, sauf en cas de demande judiciaire ou en conformité avec les lois et réglementations
          en vigueur.
        </p>

        <p className="font-semibold">Données techniques</p>
        <p>
          Lorsque vous utilisez BUBBLEOUT, nous collectons des données techniques sur les appareils que
          vous utilisez pour accéder à nos Services. Cela inclut des informations telles que
          l&apos;adresse IP, la version de l&apos;Application, et le token Firebase Cloud Messaging (FCM).
        </p>
      </section>

      <section className="mt-10 space-y-4 text-ink/80">
        <h2 className="text-xl font-bold text-ink">
          4. Quelles données personnelles traitons-nous, à quelles fins et sur quelles bases
          juridiques&nbsp;?
        </h2>
        <p>
          Nous traitons les Données Personnelles afin d&apos;exécuter ou de conclure un accord avec vous
          dans les circonstances suivantes ou encore sur le fondement de l&apos;intérêt légitime ou du
          consentement pour les cookies&nbsp;:
        </p>

        <p className="font-semibold">Pour vous permettre d&apos;utiliser nos Services&nbsp;:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Créer et gérer votre Compte en tant qu&apos;Utilisateur&nbsp;;</li>
          <li>Exploiter et gérer les différentes fonctionnalités&nbsp;;</li>
          <li>Vous recommander d&apos;autres Utilisateurs et vous recommander à eux&nbsp;;</li>
          <li>Vous recommander des Events et recommander vos Events à eux&nbsp;;</li>
          <li>Organiser l&apos;Event Creation Challenge et l&apos;Event Participation Challenge&nbsp;;</li>
          <li>
            Gestion et stockage des communications échangées entre les Utilisateurs (Likes, Comments,
            Messages)&nbsp;;
          </li>
          <li>
            Gestion des abonnements et des Services payants souscrits (Boost, Comment, Premium)&nbsp;;
          </li>
          <li>
            Envoi de messages d&apos;information relatifs aux Services ou à vos interactions avec les
            autres Utilisateurs qui correspondent aux notifications push&nbsp;;
          </li>
          <li>Certifier vos profils&nbsp;;</li>
          <li>Répondre à vos demandes et questions.</li>
        </ul>
        <p>
          La base juridique de notre traitement des Données Personnelles décrites ci-dessus est soit votre
          consentement, soit le fait que le traitement est nécessaire pour conclure ou exécuter un accord
          avec vous.
        </p>

        <p>Nous traiterons les Données Personnelles sur la base de nos intérêts légitimes&nbsp;:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Service clientèle</strong>. Si vous nous demandez un service client via nos canaux
            d&apos;assistance, nous traiterons vos Données Personnelles afin de vous aider sur le sujet
            concerné.
          </li>
          <li>
            <strong>Questions et plaintes</strong>. Si vous nous avez contactés pour des questions ou des
            plaintes concernant nos produits, nous utilisons ces données pour répondre à vos questions,
            enquêter sur les problèmes liés aux produits et prévenir les comportements frauduleux.
          </li>
          <li>
            <strong>Vous nous contactez de votre propre initiative</strong>. Si vous choisissez de nous
            contacter à la suite de notre invitation générale ou de votre propre initiative via l&apos;une
            de nos adresses électroniques générales, vous nous fournissez des Données Personnelles que
            nous utilisons pour répondre et évaluer le contenu de votre courriel.
          </li>
          <li>
            Si cela est nécessaire{" "}
            <strong>pour protéger nos droits ou les droits de tiers</strong>, car nous avons un intérêt
            légitime à établir, exercer et défendre des revendications légales.
          </li>
          <li>
            <strong>
              Aux fins d&apos;améliorer et d&apos;optimiser nos Services et de créer de nouvelles
              fonctionnalités.
            </strong>{" "}
            Cela est le cas pour (i) des études statistiques, (ii) enquêtes de satisfaction, (iii)
            analyses de l&apos;utilisation de l&apos;Application et des Services par les Utilisateurs,
            (iv) pour comprendre comment notre Application et les fonctionnalités sont utilisées.
          </li>
          <li>Si nous vendons ou cédons d&apos;une autre manière des parties de notre entreprise et/ou de nos actifs.</li>
        </ul>

        <p className="font-semibold">Pour mener des campagnes marketing et publicitaires&nbsp;:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Évaluer et mesurer l&apos;efficacité des campagnes publicitaires diffusées sur notre Service&nbsp;;</li>
          <li>L&apos;envoi de newsletters par email&nbsp;;</li>
          <li>
            Analyser et mesurer l&apos;impact des campagnes marketing promouvant notre Service sur des
            plateformes externes&nbsp;;
          </li>
          <li>Vous informer sur les produits et Services qui pourraient vous intéresser.</li>
        </ul>
      </section>

      <section className="mt-10 space-y-4 text-ink/80">
        <h2 className="text-xl font-bold text-ink">
          5. A quelles fins nous utilisons vos données
        </h2>
        <p>
          Le traitement de vos données a pour objectif principal de vous offrir une expérience optimale
          et sécurisée.
        </p>
        <p>
          Le but de l&apos;Application BUBBLEOUT étant de transformer les connexions digitales en
          interactions réelles. Vos données nous aident à analyser et améliorer constamment
          l&apos;Application pour mieux répondre à vos besoins.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-ink/80">
        <h2 className="text-xl font-bold text-ink">
          6. Qui sont les destinataires des données personnelles&nbsp;?
        </h2>
        <p>
          Seules les parties qui ont besoin de traiter les Données Personnelles aux fins mentionnées
          ci-dessus auront accès à vos Données Personnelles notamment si vous ne respectez pas les
          Conditions générales d&apos;Utilisation ou encore que vous publiez des contenus illicites
          conformément à la réglementation nationale de votre territoire.
        </p>
        <p>
          Notre mission est de vous aider à créer des connexions authentiques basées sur vos préférences
          et localisation. Pour ce faire, certaines de vos données sont naturellement visibles par les
          autres Utilisateurs du Service.
        </p>

        <p className="font-semibold">Transfert de données hors UE</p>
        <p>
          Les Données Personnelles des Utilisateurs de BUBBLEOUT sont hébergées dans l&apos;Union
          Européenne. Cependant, pour garantir une expérience utilisateur de qualité, certaines données
          peuvent être transférées à des prestataires situés en dehors de l&apos;UE, notamment pour la
          publicité et le marketing.
        </p>
        <p>
          Ces transferts peuvent concerner des pays qui n&apos;offrent pas le même niveau de protection
          des données que l&apos;UE. Toutefois, BUBBLEOUT met en place des clauses contractuelles types
          validées par la Commission européenne pour garantir la sécurité et la confidentialité des
          données transmises.
        </p>
        <p>
          Si vous souhaitez obtenir plus de détails sur ces transferts, vous pouvez contacter notre Service
          de protection des données à l&apos;adresse suivante&nbsp;:{" "}
          <a href="mailto:dpo@bubbleout.fr" className="text-blue hover:underline">
            dpo@bubbleout.fr
          </a>
          .
        </p>

        <p>
          Plus précisément, les Données Personnelles sont partagées avec les catégories suivantes de
          prestataires de Services&nbsp;:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Les fournisseurs de services</strong>&nbsp;: les plateformes de stockage de
            l&apos;application de BUBBLEOUT (Google ou Apple) ainsi que les sociétés pouvant avoir accès
            à cette occasion.
          </li>
          <li>
            <strong>Prestataires de services/partenaires (prestataires informatiques…)</strong>&nbsp;:
            Ces partenaires et prestataires peuvent accéder à vos Données Personnelles et les traiter
            conformément à notre politique de confidentialité. Ils nous soutiennent dans diverses tâches,
            notamment l&apos;hébergement et la maintenance des données, l&apos;analyse, l&apos;assistance
            client, le marketing, le traitement des paiements, ainsi que les opérations techniques et de
            sécurité nécessaires au bon fonctionnement de l&apos;Application.
          </li>
          <li>
            <strong>Autres Utilisateurs</strong>&nbsp;: Vous partagez des données avec d&apos;autres
            Utilisateurs lorsque vous divulguez volontairement des informations sur le Service pour que
            d&apos;autres personnes puissent les voir (y compris votre profil public).
          </li>
          <li>
            <strong>Partenaires publicitaires</strong>&nbsp;: Dans le cadre des opérations marketing et
            publicitaires hors de l&apos;Application destinées à des non-Utilisateurs, vos données seront
            susceptibles d&apos;être transmises à des réseaux sociaux partenaires pour vous exclure de nos
            campagnes, sauf opposition de votre part.
          </li>
          <li>
            <strong>Autorités chargées de l&apos;application de la loi</strong>&nbsp;: A la demande des
            organismes étatiques, notamment les autorités judiciaires, et pour se conformer à toute
            demande judiciaire ou légale, avec lesquelles nous sommes tenus de partager des données
            conformément à la loi ou suite à une activité criminelle présumée, BUBBLEOUT pourra transmettre
            les Données Personnelles de ses Utilisateurs.
          </li>
          <li>
            <strong>Opérations d&apos;entreprise</strong>&nbsp;: Nous pouvons être amenés à transmettre
            vos données dans le cadre d&apos;opérations d&apos;entreprise telles que notamment, sans que
            cette liste ne soit exhaustive, restructuration, changement de contrôle, fusion, acquisition,
            cession, dissolution.
          </li>
        </ul>
        <p>
          En aucun cas, la Société ne vend ou ne loue vos Données Personnelles à des tiers pour leurs
          propres activités.
        </p>
        <p>
          Pour plus de détail, veuillez consulter la{" "}
          <a
            href={`/${locale}/liste-des-destinataires-de-donnees`}
            className="text-blue hover:underline"
          >
            liste de nos partenaires et prestataires
          </a>
          .
        </p>
      </section>

      <section className="mt-10 space-y-4 text-ink/80">
        <h2 className="text-xl font-bold text-ink">7. Comment exercer vos droits sur vos données</h2>
        <p>
          Nous voulons que vous ayez le contrôle de vos données, c&apos;est pourquoi nous vous rappelons
          que les droits suivants sont à votre disposition sous réserve des conditions de la réglementation
          applicable.
        </p>
        <p>
          Conformément à la loi n° 78-17 du 6 janvier 1978, dite loi Informatique et Libertés et au RGPD,
          chaque utilisateur dispose d&apos;un droit d&apos;<strong>accès</strong>, de{" "}
          <strong>rectification</strong> et, le cas échéant d&apos;un droit à la{" "}
          <strong>portabilité</strong> et à l&apos;<strong>effacement</strong> sur ses Données
          Personnelles, ainsi que d&apos;<strong>opposition</strong> au traitement ou à sa{" "}
          <strong>limitation</strong> et du droit de{" "}
          <strong>définir des directives relatives au sort de ses Données Personnelles après son décès</strong>.
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Droit d&apos;accès&nbsp;:</strong> Vous avez le droit d&apos;accéder aux informations
            vous concernant et de demander une copie de vos données. Ce droit est exercé conformément à
            l&apos;article 15 du RGPD, en veillant à ne pas porter atteinte à la vie privée des tiers.
          </li>
          <li>
            <strong>Droit de rectification&nbsp;:</strong> Vous avez également le droit de rectifier ou de
            mettre à jour vos informations personnelles si elles sont inexactes ou incomplètes,
            conformément à l&apos;article 16 du RGPD. Sachez que vous pouvez modifier certaines de vos
            données directement depuis votre profil dans l&apos;Application.
          </li>
          <li>
            <strong>Droit à la portabilité des données&nbsp;:</strong> Le droit à la portabilité vous
            permet de recevoir vos Données Personnelles dans un format structuré et de les transmettre à
            un autre responsable de traitement, conformément à l&apos;article 20 du RGPD.
          </li>
          <li>
            <strong>Droit d&apos;opposition&nbsp;:</strong> Si vous souhaitez vous opposer à
            l&apos;utilisation de vos données à des fins de prospection ou pour d&apos;autres traitements
            fondés sur notre intérêt légitime, vous pouvez exercer votre droit d&apos;opposition en vertu
            de l&apos;article 21 du RGPD.
          </li>
          <li>
            <strong>Droit à l&apos;effacement&nbsp;:</strong> Le droit à l&apos;effacement vous permet de
            demander la suppression de vos Données Personnelles, sous réserve des exceptions prévues par
            l&apos;article 17 du RGPD. Vous pouvez également supprimer votre Compte directement depuis
            l&apos;Application, ce qui entraînera la suppression de toutes vos données de BUBBLEOUT.
          </li>
          <li>
            <strong>Droit à la restriction du traitement&nbsp;:</strong> Vous avez le droit de limiter
            temporairement l&apos;utilisation de certaines de vos données conformément à l&apos;article
            18 du RGPD.
          </li>
          <li>
            <strong>
              Droit de définir le sort de vos données après votre décès&nbsp;:
            </strong>{" "}
            vous pouvez définir des directives relatives concernant la conservation, l&apos;effacement et
            désigner les personnes auxquelles la Société communiquera vos données après votre décès,
            conformément à l&apos;article 85 de la loi n° 78-17 du 6 janvier 1978 modifiée.
          </li>
        </ul>
        <p>Pour exercer vos droits, sous réserve de prouver votre identité, envoyer&nbsp;:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            Un email à{" "}
            <a href="mailto:dpo@bubbleout.fr" className="text-blue hover:underline">
              dpo@bubbleout.fr
            </a>
            ,
          </li>
          <li>En exerçant vos droits directement depuis l&apos;Application, ou</li>
          <li>
            En envoyant un courrier à l&apos;adresse postale suivante&nbsp;: à l&apos;attention du Délégué
            à la protection des données, BUBBLEOUT — 49 rue de Ponthieu 75008 Paris
          </li>
        </ul>
        <p>
          L&apos;Utilisateur devra préciser dans sa demande ses noms, prénoms, adresse email ou adresse
          postale à laquelle il souhaite que la réponse lui parvienne. Pour des raisons de sécurité et
          afin d&apos;éviter toute demande frauduleuse, cette demande devra être accompagnée d&apos;un
          justificatif d&apos;identité.
        </p>
        <p>
          La Société s&apos;engage à vous répondre dans les meilleurs délais, et en tout état de cause
          dans un délai d&apos;un (1) mois à compter de la réception de votre demande. Si nécessaire, ce
          délai pourra être prolongé de (2) deux mois, compte tenu de la complexité et du nombre de
          demandes qui sont adressées à la Société.
        </p>
        <p>
          Vous aurez toujours la possibilité de déposer une plainte auprès d&apos;une autorité de
          surveillance et/ou de demander un recours juridique. En France, il s&apos;agit de la Commission
          Nationale Informatique et Libertés (la « CNIL »)&nbsp;:{" "}
          <a
            href="https://www.cnil.fr/fr/plaintes"
            className="text-blue hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.cnil.fr/fr/plaintes
          </a>
          .
        </p>
      </section>

      <section className="mt-10 space-y-4 text-ink/80">
        <h2 className="text-xl font-bold text-ink">
          8. Combien de temps conservons-nous vos données&nbsp;?
        </h2>
        <p>
          Lorsque nous traitons des Données Personnelles, c&apos;est sur la base d&apos;un contrat.
        </p>
        <p>
          Nous conservons vos Données Personnelles pendant la durée du contrat et les supprimons lorsque
          le contrat prend fin. Toutefois, les exceptions suivantes s&apos;appliquent&nbsp;:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            Dès que vous supprimez certaines Données Personnelles sur votre Compte sous réserve de nos
            droits de conservation pour une durée plus longue en raison de nos obligations légales.
          </li>
          <li>
            Si nous sommes tenus par la loi de conserver ou de divulguer certaines de vos Données
            Personnelles après la fin du contrat, nous conserverons les données aussi longtemps et dans la
            mesure où la loi l&apos;exige (par exemple, jusqu&apos;à{" "}
            <strong>cinq ans</strong> à compter de la fin de la relation contractuelle en vertu du régime
            général de prescription légale).
          </li>
          <li>
            Si cela est nécessaire pour l&apos;établissement, l&apos;exercice ou la défense de
            revendications légales, nous conserverons les Données Personnelles pertinentes jusqu&apos;à ce
            qu&apos;elles ne soient plus nécessaires à cette fin.
          </li>
        </ul>
        <p>
          Pour <strong>l&apos;utilisation du Service sur l&apos;Application</strong>, nous traiterons vos
          Données Personnelles pendant la durée contractuelle de notre accord et ensuite pendant le délai
          de prescription légal général (5 ans pour des questions de responsabilités).
        </p>
        <p>
          De manière spécifique, si votre Compte reste inactif pendant 24 mois, c&apos;est-à-dire lorsque
          vous n&apos;avez pas utilisé l&apos;Application et que celle-ci n&apos;a pas établi de contact
          avec les serveurs de BUBBLEOUT, il sera automatiquement clôturé. En tout état de cause, un
          Utilisateur Premium n&apos;est pas considéré comme inactif. Les données associées à ce Compte
          seront ensuite conservées pendant la durée de conservation légale avant d&apos;être
          définitivement supprimées ou anonymisées de manière irréversible.
        </p>
        <p>
          En cas de bannissement d&apos;un Utilisateur, les informations relatives à ce Compte seront
          conservées pendant 24 mois en base de données active pour prévenir toute tentative de
          réinscription sur l&apos;Application puis en base d&apos;archive pour la période nécessaire en
          matière de prescription.
        </p>
        <p>
          Lorsque vous supprimez votre Compte sur BUBBLEOUT ou que vous en demandez la suppression auprès
          de notre Service client, votre Compte est immédiatement retiré de l&apos;Application. Cependant,
          vos données seront conservées dans une base d&apos;archives distincte pendant une durée de 5 ans
          avant d&apos;être définitivement supprimées ou anonymisées de manière irréversible, conformément
          à notre obligation légale en tant qu&apos;hébergeur.
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Questions et réclamations concernant les Services</strong>&nbsp;: Nous traiterons les
            Données Personnelles pendant <strong>trois (3) ans</strong> après les avoir reçues, afin
            d&apos;effectuer des analyses statistiques des questions et des plaintes, d&apos;enquêter, de
            suivre, de contrôler et d&apos;améliorer notre Service à la clientèle, de verser des
            indemnités et de prévenir les comportements frauduleux.
          </li>
          <li>
            <strong>Visiteurs de l&apos;Application</strong>&nbsp;: Nous traiterons vos données
            personnelles pendant une durée maximale de treize (<strong>13) mois</strong> après la collecte
            des cookies sur l&apos;Application, sous réserve de votre consentement exprès préalable.
          </li>
          <li>
            <strong>Candidature spontanée à un emploi</strong>&nbsp;: Si vous avez postulé spontanément
            pour un emploi chez nous, nous conserverons vos données personnelles pendant{" "}
            <strong>six (6) mois</strong> à compter de la date de candidature afin de vous contacter si
            un poste approprié se présente.
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-4 text-ink/80">
        <h2 className="text-xl font-bold text-ink">9. Confidentialité relative aux mineurs</h2>
        <p>
          BUBBLEOUT est exclusivement réservé aux personnes âgées de 18 ans ou plus. Nous
          n&apos;autorisons pas l&apos;inscription des mineurs sur notre plateforme. Si un Utilisateur a
          menti sur son âge lors de son inscription, nous encourageons les parents à nous en informer en
          envoyant un courriel à{" "}
          <a href="mailto:dpo@bubbleout.fr" className="text-blue hover:underline">
            dpo@bubbleout.fr
          </a>
          . BUBBLEOUT s&apos;engage à supprimer toutes les Données Personnelles liées à ce mineur dans
          les plus brefs délais. Si vous suspectez qu&apos;un Utilisateur est âgé de moins de 18 ans,
          nous vous invitons à utiliser le mécanisme de signalement disponible sur l&apos;Application.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-ink/80">
        <h2 className="text-xl font-bold text-ink">10. Cookies</h2>
        <p>
          Dans le cadre de notre manière de fournir des Services personnalisés sur notre Application, nous
          utilisons des cookies pour stocker et parfois suivre des informations vous concernant. Un cookie
          est un petit fichier de données qui est envoyé à votre navigateur à partir d&apos;un serveur
          web, est stocké sur votre disque dur et permet un accès plus facile lors de la prochaine visite
          de la même page.
        </p>
        <p>
          Ces outils de suivi de navigation sont utilisés uniquement à des fins strictement nécessaires au
          fonctionnement de l&apos;Application et sont, par conséquent, dispensés de consentement, car ils
          sont nécessaires pour garantir l&apos;accès et le fonctionnement stable de l&apos;Application.
        </p>
        <p>
          A ce jour, BUBBLEOUT n&apos;utilise pas de cookies sur son site Internet. La durée de vie de ces
          cookies est limitée à une période de treize (13) mois, et les données collectées sont conservées
          pour une durée maximale de vingt-cinq (25) mois.
        </p>
        <p>Nous classons les cookies dans les catégories suivantes&nbsp;:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Les cookies de sécurité</strong> — Ces cookies sont utilisés à des fins
            d&apos;authentification ou de sécurité. Ces cookies ne collectent pas d&apos;informations vous
            concernant qui puissent être utilisées pour vous identifier. Ils sont généralement définis en
            réponse à des actions que vous entreprenez et qui correspondent à une demande de Services,
            comme pouvoir vous connecter.
          </li>
          <li>
            <strong>Les cookies de préférence</strong> — également appelés « cookies de fonctionnalité »
            permettent à l&apos;Application de se souvenir des choix que vous avez faits auparavant, de
            la langue que vous préférez ou de votre nom d&apos;utilisateur.
          </li>
          <li>
            <strong>Les cookies analytiques</strong> — également appelés « cookies de performance »
            collectent des informations sur la manière dont vous utilisez l&apos;Application, telles que
            les pages que vous avez visitées et les liens sur lesquels vous avez cliqué. Ces informations
            ne peuvent pas être utilisées pour vous identifier. Toutes les données et informations sont
            agrégées et donc anonymisées.
          </li>
        </ul>
        <p>Aucun cookie marketing n&apos;est utilisé dans l&apos;Application, et nous ne procédons donc à aucun suivi publicitaire ni ciblage.</p>
      </section>

      <section className="mt-10 space-y-4 text-ink/80">
        <h2 className="text-xl font-bold text-ink">
          11. Modifications de la politique de confidentialité
        </h2>
        <p>
          Cette Politique de confidentialité est susceptible d&apos;évoluer au fil du temps. BUBBLEOUT
          s&apos;efforce en permanence de trouver de nouvelles façons innovantes de faciliter vos
          connexions authentiques, tout en veillant à ce que nos pratiques en matière de gestion des
          données soient toujours à jour.
        </p>
        <p>
          En cas de modifications importantes, nous vous en informerons avant leur mise en application par
          tout moyen, y compris le courrier électronique, afin que vous puissiez en prendre connaissance
          en toute tranquillité. Dans le cas où ces changements sont importants/impactent vos obligations,
          la Société vous en informera et demandera votre consentement.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-ink/80">
        <h2 className="text-xl font-bold text-ink">12. Sécurité des données</h2>
        <p>
          Nous prenons des mesures techniques et organisationnelles appropriées, y compris des mesures de
          sécurité et d&apos;intégrité, pour protéger vos Données Personnelles contre la perte et pour
          empêcher les personnes non autorisées d&apos;y accéder. Les mesures de sécurité appropriées que
          nous avons prises comprennent la mise en œuvre de connexions privées sécurisées, la traçabilité,
          la restauration des données perdues et les restrictions d&apos;accès.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-ink/80">
        <h2 className="text-xl font-bold text-ink">13. Autre</h2>
        <p>
          La présente politique de confidentialité est régie par le droit français, sous réserve des
          dispositions de la loi de tout autre pays dans lequel vous pourriez résider.
        </p>
        <p>
          En cas de litige et si un accord amiable ne peut être trouvé, le tribunal compétent sera celui
          déterminé selon les règles de procédure applicables.
        </p>
        <p>
          Nous souhaitons avoir la possibilité de résoudre vos éventuelles plaintes mais vous avez
          également le droit de déposer une plainte auprès de l&apos;organisme de contrôle responsable de
          la protection des données à tout moment. Pour ce faire, vous pouvez contacter l&apos;Autorité
          française de protection de la vie privée. Vous trouverez de plus amples informations sur son
          site web&nbsp;:{" "}
          <a
            href="https://www.cnil.fr/fr/plaintes"
            className="text-blue hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.cnil.fr/fr/plaintes
          </a>
          .
        </p>
        <p>
          Pour toute question relative à la présente Politique de confidentialité, notre traitement de vos
          Données Personnelles ou pour toute demande relative à l&apos;exercice de vos Données
          Personnelles en vertu des lois applicables en matière de protection de la vie privée, vous
          pouvez nous contacter&nbsp;:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            En adressant un e-mail à l&apos;adresse suivante&nbsp;:{" "}
            <a href="mailto:hello@bubbleout.fr" className="text-blue hover:underline">
              hello@bubbleout.fr
            </a>
            .
          </li>
          <li>
            Par courrier à l&apos;adresse postale suivante&nbsp;: à l&apos;attention du Délégué à la
            protection des données, BUBBLEOUT — 49 rue de Ponthieu 75008 Paris – France.
          </li>
        </ul>
      </section>
    </LegalLayout>
  );
}
