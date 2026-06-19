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
    title: "Conditions Générales d'Utilisation | bubbleOut",
    description:
      "Conditions générales d'utilisation de l'application bubbleOut. Droits et obligations, modalités de paiement, données personnelles et règlement des litiges.",
    alternates: {
      canonical: "/fr/conditions-d-utilisations",
      languages: {
        fr: "/fr/conditions-d-utilisations",
        "x-default": "/fr/conditions-d-utilisations",
      },
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <LegalLayout>
      <h1 className="text-3xl font-bold text-ink md:text-4xl">
        Conditions Générales d&apos;Utilisation
      </h1>
      <p className="mt-4 text-sm text-ink/60">
        <strong>Entrée en vigueur le 16/11/2024.</strong>{" "}
        <a
          href="https://assets.zyrosite.com/Yyv3vy8O6BuZv6J6/bubbleout_fr_terms_and_conditions-YZ9VzkNMpET4N6EB.pdf"
          className="text-blue hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Télécharger le PDF
        </a>
      </p>

      <div className="mt-8 space-y-4 text-ink/80">
        <p>
          Les présentes Conditions Générales d&apos;Utilisation (ci-après &laquo;&nbsp;
          <strong>CGU</strong>&nbsp;&raquo;) s&apos;appliquent aux utilisateurs de
          l&apos;application mobile BUBBLEOUT (ci-après &laquo;&nbsp;<strong>BUBBLEOUT</strong>
          &nbsp;&raquo; ou &laquo;&nbsp;<strong>Application</strong>&nbsp;&raquo; ou &laquo;&nbsp;
          <strong>Services</strong>&nbsp;&raquo;), définis comme des personnes physiques majeures
          ayant tout au moins la capacité juridique de contracter et qui utilise les services à une
          fin non-professionnelle (ci-après &laquo;&nbsp;<strong>Utilisateurs</strong>&nbsp;&raquo;).
        </p>
        <p>
          L&apos;Application est un service développé et commercialisé par la société{" "}
          <strong>BUBBLEOUT SASU</strong>, société par actions simplifiée unipersonnelle, dont le
          siège social est situé au 49 RUE DE PONTHIEU, 75008 PARIS immatriculée au Registre du
          Commerce et des Sociétés de Paris sous le numéro 932&nbsp;151&nbsp;814, identifiée avec le
          N° TVA intracommunautaire FR 65932151814. Les coordonnées de BUBBLEOUT sont 49 RUE DE
          PONTHIEU, 75008 PARIS et{" "}
          <a href="mailto:hello@bubbleout.fr" className="text-blue hover:underline">
            hello@bubbleout.fr
          </a>
          .
        </p>
        <p>
          Pour l&apos;application des présentes, il est convenu que l&apos;Utilisateur et BUBBLEOUT
          seront collectivement dénommés les &laquo;&nbsp;<strong>Parties</strong>&nbsp;&raquo; et
          individuellement dénommés &laquo;&nbsp;<strong>Partie</strong>&nbsp;&raquo;.
        </p>
      </div>

      <section className="mt-10 space-y-4 text-ink/80">
        <h2 className="text-xl font-bold text-ink">Définitions des termes</h2>
        <p>
          Au sein des présentes Conditions Générales d&apos;Utilisation, les termes suivants sont
          entendus tels que définis ci-dessous&nbsp;:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Application</strong>&nbsp;: l&apos;application BUBBLEOUT, disponible sur
            l&apos;App Store d&apos;Apple et le Play Store de Google
          </li>
          <li>
            <strong>BUBBLEOUT</strong>&nbsp;: BUBBLEOUT, Société par action simplifiée unipersonnelle,
            enregistrée au RCS Paris sous le matricule 932&nbsp;151&nbsp;814, et propriétaire et seule
            exploitante de l&apos;Application et de la marque BUBBLEOUT.
          </li>
          <li>
            <strong>CGU</strong>&nbsp;: les présentes Conditions générales d&apos;utilisation.
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
            le Spotlight les Utilisateurs ou Events correspondant aux critères choisis, afin de
            maximiser les chances de trouver ce qui intéresse vraiment.
          </li>
          <li>
            <strong>Map</strong>&nbsp;: carte qui permet de trouver des Utilisateurs et des Events à
            proximité.
          </li>
          <li>
            <strong>Passe</strong>&nbsp;: action symbolisée par une croix permettant d&apos;exprimer
            discrètement son désintérêt. Cette action reste confidentielle et ne déclenche aucune
            notification. Les profils passés ne réapparaîtront plus dans le Spotlight ou la Map de
            l&apos;utilisateur.
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
            <strong>Certification de profil</strong>&nbsp;: fonctionnalité obligatoire pour continuer
            à utiliser l&apos;Application. Elle permet d&apos;authentifier la photo de profil de
            l&apos;Utilisateur, en attestant auprès des autres Utilisateurs que l&apos;image de son
            visage mise en ligne correspond bien à l&apos;apparence réelle de l&apos;Utilisateur, grâce
            à une vérification par vidéo.
          </li>
          <li>
            <strong>Compatibles</strong>&nbsp;: Lorsque deux Utilisateurs témoignent d&apos;un intérêt
            mutuel et déclenche une notification qui permet d&apos;ouvrir une discussion.
          </li>
          <li>
            <strong>Boost</strong>&nbsp;: fonctionnalité permettant aux Utilisateurs d&apos;augmenter
            la visibilité de leur profil ou de leur Event pendant la durée de l&apos;activation de cette
            option.
          </li>
          <li>
            <strong>Messages et/ou messages vocaux</strong>&nbsp;: seuls les Utilisateurs qui sont
            Compatibles ou qui ont été accepté à un Event peuvent s&apos;envoyer des Messages dans les
            conversations respectives.
          </li>
          <li>
            <strong>Services</strong>&nbsp;: ensemble des prestations, gratuites ou payantes, proposées
            par BUBBLEOUT afin de mettre en relation les Utilisateurs en fonction de leurs intérêts
            partagés, de leurs préférences personnelles et de leur localisation. Cela inclut la création
            ou la participation à des Events, ainsi que la possibilité de se connecter directement avec
            d&apos;autres Utilisateurs.
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
      </section>

      <section className="mt-10 space-y-4 text-ink/80">
        <h2 className="text-xl font-bold text-ink">1. Services et fonctionnalités</h2>
        <p>
          Après création d&apos;un Compte Utilisateur, l&apos;Application permet de découvrir et de
          rencontrer d&apos;autre Utilisateurs partageant des centres d&apos;intérêt, préférences, et
          qui se trouvent à proximité.
        </p>
        <p>
          L&apos;Application propose à l&apos;Utilisateur des profils et Events sélectionnés en
          fonction de ses préférences de recherche. Chaque Utilisateur est libre d&apos;entrer en
          contact, de créer des liens avec d&apos;autres Utilisateurs et de participer aux Events qui
          ont été créés sur l&apos;Application, dans le respect des présentes CGU et de la législation
          en vigueur.
        </p>
        <p>
          Les Services proposés par BUBBLEOUT ne doivent pas être considérés comme des services de
          conseil ou de courtage matrimonial. Leur objectif est de faciliter les rencontres et les
          interactions, virtuelles ou réelles, entre les Utilisateurs qui partagent des intérêts mutuels.
        </p>
        <p>L&apos;Application est disponible sur les plateformes de téléchargement de Apple et Google.</p>
        <p>
          Les Services traiteront de données à caractère personnelle de l&apos;Utilisateur comme énoncé
          à l&apos;article 9 des CGU.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-ink/80">
        <h2 className="text-xl font-bold text-ink">2. Conclusion des présentes</h2>
        <p>
          Si un Utilisateur décide d&apos;utiliser l&apos;Application, ce dernier devra se connecter
          afin d&apos;utiliser l&apos;Application et donc fournir des informations au moment de
          l&apos;inscription. Ces informations doivent être exactes. Lors de la création d&apos;un
          Compte, et avant de pouvoir le valider, l&apos;Utilisateur sera invité à prendre connaissance
          des CGU et de la Politique de confidentialité. En créant un compte ou en se connectant à son
          compte l&apos;Utilisateur est présumé connaître et accepter, sans réserve, l&apos;ensemble des
          stipulations des CGU qui lui sont opposables dès cet instant.
        </p>
        <p>
          Les CGU applicables seront celles en vigueur au moment de l&apos;inscription sur
          l&apos;Application ou celle présente connexion sur l&apos;Application par l&apos;Utilisateur.
          Ces dernières sont consultables et téléchargeables sur un support durable au format PDF.
        </p>
        <p>
          Les Utilisateurs sont invités à les télécharger s&apos;ils le souhaitent et reconnaissent
          qu&apos;ils doivent avoir pris connaissance des présentes CGU et de la Politique de
          confidentialité en utilisant l&apos;Application.
        </p>
        <p>
          Pour accéder à toutes les fonctionnalités de l&apos;Application, l&apos;Utilisateur doit créer
          un Compte et souscrire aux Services payants.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-ink/80">
        <h2 className="text-xl font-bold text-ink">3. Prix</h2>
        <h3 className="mt-2 text-lg font-semibold text-ink">3.1. Services payants</h3>
        <p className="font-semibold">Abonnement Premium</p>
        <p>Chaque Utilisateur de BUBBLEOUT peut souscrire à un abonnement à tout moment.</p>
        <p>
          Les Utilisateurs abonnés bénéficient, en plus des fonctionnalités gratuites, de Services
          supplémentaires exclusivement réservés aux abonnés. L&apos;offre d&apos;abonnement donnent
          accès à des fonctionnalités Premium de BUBBLEOUT pour une durée mensuelle.
        </p>
        <p>
          Lors du renouvellement automatique et à réception du paiement via la plateforme
          d&apos;abonnement, BUBBLEOUT valide l&apos;achat et met à jour le Compte de l&apos;Utilisateur.
        </p>
        <p>
          Conformément à l&apos;article D.&nbsp;215-1 du Code de la consommation, l&apos;Utilisateur
          pourra résilier son abonnement en moins de trois clics en se rendant dans les paramètres de
          l&apos;Application puis en cliquant sur « Abonnement » et en accédant au bouton « Résilier
          Premium ». En tout état de cause, BUBLLEOUT indique que tout mois commencé sera dû entièrement
          par l&apos;Utilisateur.
        </p>
        <p className="font-semibold">Achat de Comments</p>
        <p>
          Les Comments peuvent être achetés à l&apos;unité, selon les conditions tarifaires indiquées
          sur les plateformes de téléchargement (Google ou Apple).
        </p>
        <p className="font-semibold">Achat de Boosts</p>
        <p>
          Les Boosts, que ce soit pour booster son profil ou un Event, peuvent être achetés à
          l&apos;unité, selon les conditions tarifaires indiquées dans les plateformes de téléchargement
          mobile (Apple ou Google).
        </p>

        <h3 className="mt-2 text-lg font-semibold text-ink">3.2. Services gratuits</h3>
        <p>
          Certains Services BUBBLEOUT sont disponibles depuis l&apos;Application à titre gratuit (hors
          coûts de connexion et frais de télécommunication) pour l&apos;Utilisateur, notamment&nbsp;:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Envoyer un nombre limité de Likes par jour&nbsp;;</li>
          <li>Créer un nombre limité d&apos;Event par mois&nbsp;;</li>
          <li>Envoyer un Comment par semaine&nbsp;;</li>
          <li>Utiliser la fonction Discovery un nombre limité de fois par jour&nbsp;;</li>
          <li>Découvrir les Event et les Utilisateurs à proximité sur la Map&nbsp;;</li>
          <li>Découvrir les Event et les Utilisateurs à proximité dans le Spotlight&nbsp;;</li>
          <li>Visualiser les profils d&apos;autres Utilisateurs&nbsp;;</li>
          <li>Envoyer des Messages&nbsp;;</li>
          <li>Choisir sa visibilité sur la Map et le Spotlight&nbsp;;</li>
          <li>Donner un feedback après avoir participé ou organisé un Event&nbsp;;</li>
          <li>
            Connaître son nombre de Likes reçus et de Comment, sans que ces chiffres ne soient visibles
            par les autres Utilisateurs&nbsp;;
          </li>
          <li>Envoyer des feedbacks.</li>
        </ul>

        <h3 className="mt-2 text-lg font-semibold text-ink">3.3. Rencontres réelles</h3>
        <p>
          <strong>BUBBLEOUT</strong> permet aux Utilisateurs d&apos;organiser des rencontres réelles
          dans le cadre des Events créés via l&apos;Application, que ce soit en groupe ou en
          tête-à-tête. Cependant, il incombe entièrement aux Utilisateurs de vérifier l&apos;identité
          des personnes avec qui ils souhaitent participer à ces Events. BUBBLEOUT n&apos;intervient pas
          dans l&apos;organisation de ces rencontres qui sont de votre responsabilité et n&apos;a aucune
          implication en cas d&apos;incidents ou d&apos;actes, de quelque nature qu&apos;ils soient, qui
          pourraient survenir entre Utilisateurs lors de ces Events.
        </p>
        <p>
          Par précaution, BUBBLEOUT a instauré des recommandations de sécurité pour protéger les
          Utilisateurs et assurer un environnement sécuritaire conformément à l&apos;article 5 des CGU
          et à nos{" "}
          <a href="/security" className="text-blue hover:underline">
            conseils de sécurité
          </a>
          .
        </p>
        <p>
          En participant aux Events organisés sur BUBBLEOUT, les Utilisateurs acceptent que des photos
          et vidéos puissent être capturées et utilisées par BUBBLEOUT sur ses plateformes de réseaux
          sociaux et autres canaux marketing. Bien que BUBBLEOUT s&apos;efforce de respecter les
          demandes de retrait d&apos;images ou de vidéos, ces requêtes seront examinées en fonction de
          leur urgence, sans garantie de traitement immédiat, sauf en cas de situation d&apos;urgence.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-ink/80">
        <h2 className="text-xl font-bold text-ink">3. Modalité de paiement</h2>
        <p>Tous les prix sont affichés en TTC.</p>
        <p>
          Le paiement de l&apos;abonnement à BUBBLEOUT est dû dans son intégralité dès la conclusion
          dudit contrat.
        </p>
        <p>
          Le règlement s&apos;effectue via le Compte de la plateforme de téléchargement mobile de
          l&apos;Utilisateur, en fonction de l&apos;interface utilisée. Le traitement et la gestion du
          paiement sont pris en charge exclusivement par la plateforme de téléchargement mobile (Apple
          ou Google).
        </p>
        <p>
          BUBBLEOUT n&apos;a aucun contrôle sur le processus de paiement, le changement de devise ou
          les transferts de fonds, ni sur les éventuels frais associés à ces opérations. Ainsi, toute
          demande liée au paiement doit être adressée directement à votre Store (Apple ou Google).
        </p>
        <p>
          De plus, BUBBLEOUT n&apos;est pas en mesure d&apos;effectuer des remboursements. Nous ne
          collectons aucune donnée bancaire, celles-ci étant traitées directement par Apple ou Google,
          échappant ainsi à notre contrôle.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-ink/80">
        <h2 className="text-xl font-bold text-ink">4. Engagement des utilisateurs</h2>
        <p>L&apos;Utilisateur s&apos;engage notamment à&nbsp;:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Garder son mot de passe secret&nbsp;;</li>
          <li>
            Prouver qu&apos;il est une personne physique majeure, BUBBLEOUT se réservant le droit de
            demander à l&apos;Utilisateur d&apos;en apporter la preuve en cas de doute&nbsp;;
          </li>
          <li>Ne pas partager son Compte avec d&apos;autres personnes non identifiées&nbsp;;</li>
          <li>À ne pas usurper l&apos;identité d&apos;autrui ni fournir des informations erronées&nbsp;;</li>
          <li>
            À ne rien faire qui soit illégal, trompeur ou frauduleux, ni agir dans un but illicite ou
            interdit&nbsp;;
          </li>
          <li>À ne pas violer (ni aider ou inciter autrui à violer) les présentes CGU&nbsp;;</li>
          <li>
            À ne rien faire qui interfère avec le fonctionnement prévu des Services ou qui nuise à ces
            derniers&nbsp;;
          </li>
          <li>
            A ne pas vendre, donner en licence, acheter aucun Compte ou aucune donnée obtenus de nous
            ou de nos Services&nbsp;;
          </li>
          <li>
            À ne pas publier les informations privées ou confidentielles d&apos;une autre personne sans
            autorisation ou faire quelque chose qui enfreint les droits d&apos;une autre personne, y
            compris les droits de propriété intellectuelle&nbsp;;
          </li>
          <li>
            À ne pas modifier, traduire, créer des œuvres dérivées ou faire de l&apos;ingénierie inverse
            sur nos Services&nbsp;;
          </li>
          <li>
            Faire preuve de respect lors de la communication avec les représentants de notre service
            clientèle ou d&apos;autres employés&nbsp;;
          </li>
          <li>Ne pas créer plus d&apos;un Compte sur notre Application&nbsp;;</li>
          <li>
            À accorder à BUBBLEOUT une licence d&apos;utilisation de ses contenus dans le cadre du
            fonctionnement des Services.
          </li>
          <li>
            Lorsque l&apos;Utilisateur souhaite partager, publier ou importer du contenu protégé par
            des droits de propriété intellectuelle (comme des photos) sur les Services, l&apos;Utilisateur
            doit accorder à BUBBLEOUT une licence non exclusive, gratuite, transférable, sous-licenciable
            et mondiale pour héberger, utiliser, distribuer, modifier, exécuter, copier, diffuser ou
            afficher publiquement, traduire et créer des œuvres dérivées de votre contenu.
          </li>
          <li>Cette licence prend fin lorsque votre contenu est supprimé de nos systèmes.</li>
          <li>
            A donner l&apos;autorisation à BUBBLEOUT d&apos;afficher le nom de l&apos;Utilisateur, sa
            photo de profil ainsi que les informations relatives à ses actions et ses relations sans
            qu&apos;aucune compensation de lui soit versée.
          </li>
          <li>
            A informer, si l&apos;Utilisateur publie du contenu relatif à une marque ou un produit en
            échange d&apos;une contrepartie financière ou d&apos;une autre incitation, que ce contenu
            est sponsorisé.
          </li>
        </ul>
        <p>
          Si, à tout moment, l&apos;Utilisateur cesse de satisfaire à ces exigences, toute autorisation
          d&apos;accès à notre Application est automatiquement révoquée et BUBBLEOUT pourra résilier
          votre Compte sous réserve de vous avoir laisser l&apos;opportunité de vous défendre.
        </p>
        <p className="font-semibold">L&apos;Utilisateur s&apos;engage à&nbsp;:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            Respecter ces CGU et tous les règlements, règles et lois applicables au niveau national ou
            international&nbsp;;
          </li>
          <li>Utiliser l&apos;Application uniquement à des fins légales dans les conditions définies ci-après&nbsp;;</li>
          <li>
            Traiter les autres Utilisateurs de manière courtoise et respectueuse, tant sur
            l&apos;Application que lors des Events&nbsp;;
          </li>
          <li>
            Maintenir un mot de passe fort et prendre des mesures raisonnables pour protéger la sécurité
            de vos informations de connexion&nbsp;;
          </li>
          <li>
            Vous présentez avec respect et authenticité en ajoutant au moins une photo qui montre votre
            visage&nbsp;;
          </li>
          <li>Respecter les lois et règlements en vigueur&nbsp;;</li>
          <li>
            Respecter les limites et les souhaits des autres Utilisateurs. Si quelqu&apos;un exprime son
            désintérêt, vous devez arrêter immédiatement toute tentative de contact&nbsp;;
          </li>
          <li>
            Encourager un environnement inclusif en reconnaissant et en respectant la diversité des
            Utilisateurs de BUBBLEOUT&nbsp;;
          </li>
          <li>
            Créer uniquement des Events bienveillants, respectueux, et conformes à la législation en
            vigueur, excluant tout contenu ou activité illégale, offensante, discriminatoire ou
            susceptible de nuire à autrui.
          </li>
        </ul>
        <p className="font-semibold">Et l&apos;Utilisateur s&apos;engage à ne pas&nbsp;:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            Faire de fausses déclarations sur son identité, son âge, ses postes actuels ou antérieurs,
            ses qualifications ou ses affiliations avec une personne ou une entité&nbsp;;
          </li>
          <li>Faire des avances insistantes envers les autres Utilisateurs&nbsp;;</li>
          <li>Avoir une attitude sexuellement insistante&nbsp;;</li>
          <li>Propager des énergies négatives ou adopter un ton inapproprié&nbsp;;</li>
          <li>Mettre en ligne des informations confidentielles sur autrui ou d&apos;autres Utilisateurs&nbsp;;</li>
          <li>
            Utiliser les Services d&apos;une manière qui endommage l&apos;Application ou empêche leur
            utilisation par d&apos;autres Utilisateurs&nbsp;;
          </li>
          <li>
            Utiliser notre Application d&apos;une manière qui interfère, perturbe ou affecte négativement
            la plateforme, les serveurs ou les réseaux de l&apos;Application&nbsp;;
          </li>
          <li>
            Harceler, persécuter, traquer, intimider, agresser, diffamer, porter atteinte ou autrement
            maltraiter toute personne&nbsp;;
          </li>
          <li>
            Publier ou partager du Contenu interdit ou illicite comme énoncé à l&apos;article 11 du
            présent Contrat&nbsp;;
          </li>
          <li>
            Solliciter des mots de passe ou des informations personnelles à des fins commerciales ou
            illégales, ni diffuser les informations personnelles d&apos;autrui sans leur
            consentement&nbsp;;
          </li>
          <li>
            Demander de l&apos;argent ou d&apos;autres articles de valeur à un autre Utilisateur, que ce
            soit sous forme de cadeau, de prêt, ou de rémunération&nbsp;;
          </li>
          <li>Utiliser ou usurper le Compte d&apos;un autre Utilisateur&nbsp;;</li>
          <li>Participer à des activités frauduleuses, pyramides financières, ou pratiques similaires&nbsp;;</li>
          <li>Poster des liens externes à l&apos;Application&nbsp;;</li>
          <li>
            Proposer de se retrouver sur une autre plateforme d&apos;échange telles que WhatsApp,
            Discord, Messenger, etc.&nbsp;;
          </li>
          <li>
            Utiliser les services à des fins politiques, y compris le financement de campagnes ou
            l&apos;influence sur des élections, sauf pour exprimer vos propres opinions politiques
            personnelles&nbsp;;
          </li>
          <li>
            Falsifier des informations ou masquer l&apos;origine de tout contenu transmis à travers les
            services&nbsp;;
          </li>
          <li>
            Utiliser des méthodes automatisées pour accéder, extraire, ou indexer les données des
            services, ou contourner la structure de navigation ou la présentation du service&nbsp;;
          </li>
          <li>
            Encourager ou promouvoir toute activité contraire aux présentes Conditions Générales
            d&apos;Utilisation&nbsp;;
          </li>
          <li>
            Créer un nouveau Compte après la suspension ou la résiliation de votre Compte, sans
            autorisation expresse de BUBBLEOUT.
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-4 text-ink/80">
        <h2 className="text-xl font-bold text-ink">5. Niveau de service et sécurité</h2>
        <p>
          A titre liminaire, BUBBLEOUT ne garantit aucun niveau minimal de service conformément à
          l&apos;article L.&nbsp;224-25-5 du Code de la consommation.
        </p>
        <p>De plus, BUBBLEOUT assure la sécurité de ses Services en prévoyant&nbsp;:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            Un environnement applicatif maintenu en tenant Compte des recommandations d&apos;application
            de correctifs par les éditeurs&nbsp;;
          </li>
          <li>Un contrôle rigoureux des entrées Utilisateurs&nbsp;;</li>
          <li>Une sécurisation des accès aux fonctions d&apos;administration&nbsp;;</li>
          <li>Une installation du minimum de fonctions nécessaires lors de l&apos;installation&nbsp;;</li>
          <li>Un principe du « moindre privilège »&nbsp;;</li>
          <li>Une utilisation de mots de passe dans le code interdite&nbsp;;</li>
          <li>Une mise en œuvre d&apos;une gestion efficace des erreurs&nbsp;;</li>
          <li>
            Un chiffrage des flux d&apos;administration par des procédés fiables (SSH, SSL, Ipsec,
            etc.), garantissant la confidentialité et l&apos;intégrité des données.
          </li>
        </ul>
        <p>
          Si BUBBLEOUT détecte un incident de sécurité ou est informé par un Utilisateur, cette dernière
          prendra les mesures nécessaires afin de limiter les incidences de cet incident sur les Services.
        </p>
        <p>
          BUBBLEOUT ne garantit pas le stockage continu du contenu publié par l&apos;Utilisateur.
          BUBBLEOUT n&apos;est pas un service de stockage. Vous acceptez qu&apos;aucune obligation de
          stocker, de maintenir ou de vous fournir une copie des informations ou du contenu que vous ou
          d&apos;autres personnes nous ont transmis n&apos;incombe à BUBBLEOUT, sauf dans la mesure où la
          loi applicable l&apos;impose et tel que décrit dans la Politique de confidentialité.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-ink/80">
        <h2 className="text-xl font-bold text-ink">6. Garanties légales</h2>
        <p>
          Les Services bénéficient de la garantie légale de conformité pour les contenus numériques
          (telle que définie aux articles L.224-25-12 et suivants du Code de la consommation) et de la
          garantie contre les vices cachés (telle que définie aux articles 1641 et suivants du Code
          civil), permettant à l&apos;Utilisateur de (i) demander la mise en conformité du contenu
          numérique ou, à défaut, (ii) de ne plus utiliser les Services.
        </p>
        <p>
          Le consommateur a droit à la mise en œuvre de la garantie légale de conformité en cas
          d&apos;apparition d&apos;un défaut de conformité durant la fourniture du contenu numérique ou
          du service numérique.
        </p>
        <p>
          La garantie légale de conformité emporte obligation de fournir toutes les mises à jour
          nécessaires au maintien de la conformité du contenu numérique ou du service numérique durant
          la fourniture du contenu numérique ou du service numérique.
        </p>
        <p>
          La garantie légale de conformité donne au consommateur droit à la mise en conformité du
          contenu numérique ou du service numérique sans retard injustifié suivant sa demande, sans frais
          et sans inconvénient majeur pour lui.
        </p>
        <p>
          Le consommateur peut obtenir une réduction du prix en conservant le contenu numérique ou le
          service numérique, ou il peut mettre fin au contrat en se faisant rembourser intégralement
          contre renoncement au contenu numérique ou au service numérique, si&nbsp;:
        </p>
        <ol className="list-decimal space-y-1 pl-6">
          <li>Le professionnel refuse de mettre le contenu numérique ou le service numérique en conformité&nbsp;;</li>
          <li>La mise en conformité du contenu numérique ou du service numérique est retardée de manière injustifiée&nbsp;;</li>
          <li>La mise en conformité du contenu numérique ou du service numérique ne peut intervenir sans frais imposés au consommateur&nbsp;;</li>
          <li>La mise en conformité du contenu numérique ou du service numérique occasionne un inconvénient majeur pour le consommateur&nbsp;;</li>
          <li>La non-conformité du contenu numérique ou du service numérique persiste en dépit de la tentative de mise en conformité du professionnel restée infructueuse.</li>
        </ol>
        <p>
          Ces droits résultent de l&apos;application des{" "}
          <a
            href="https://www.legifrance.gouv.fr/affichCodeArticle.do?cidTexte=LEGITEXT000006069565&idArticle=LEGIARTI000044132839&dateTexte=&categorieLien=cid"
            className="text-blue hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            articles L.&nbsp;224-25-1 à L.&nbsp;224-25-31 du code de la consommation
          </a>
          .
        </p>
        <p>
          Le consommateur bénéficie également de la garantie légale des vices cachés en application des{" "}
          <a
            href="https://www.legifrance.gouv.fr/affichCodeArticle.do?cidTexte=LEGITEXT000006070721&idArticle=LEGIARTI000006441924&dateTexte=&categorieLien=cid"
            className="text-blue hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            articles 1641 à 1649 du code civil
          </a>
          , pendant une durée de deux ans à compter de la découverte du défaut.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-ink/80">
        <h2 className="text-xl font-bold text-ink">
          7. Durée et rupture anticipée / résiliation du contrat
        </h2>
        <h3 className="mt-2 text-lg font-semibold text-ink">7.1. Durée du contrat et des abonnements</h3>
        <p>
          Les présentes CGU sont conclues pour une durée indéterminée du moment que l&apos;Utilisateur
          utilise les Services et qu&apos;il n&apos;a pas supprimé son Compte.
        </p>
        <p>
          BUBLLEOUT se réserve la faculté de mettre à jour et modifier à tout moment les CGU, notamment
          pour s&apos;adapter à l&apos;évolution législative ou règlementaire.
        </p>
        <p>
          BUBLLEOUT communiquera tout projet de modification des CGU à l&apos;Utilisateur titulaire
          d&apos;un Compte sur support durable par courriel, au plus tard deux (2) mois avant la date
          d&apos;application proposée pour son entrée en vigueur. L&apos;Utilisateur est réputé avoir
          accepté la modification des CGU s&apos;il n&apos;a pas notifié à BUBLLEOUT, avant la date
          d&apos;entrée en vigueur proposée de cette modification, qu&apos;il ne l&apos;acceptait pas.
        </p>
        <p>
          Si l&apos;Utilisateur refuse la modification des CGU, il peut supprimer son Compte et ne plus
          utiliser les Services.
        </p>
        <p>
          L&apos;Utilisateur peut également souscrire à des formules d&apos;abonnements et ces
          abonnements sont par défaut renouvelés automatiquement tous les mois pour un mois
          supplémentaire, sauf si l&apos;Utilisateur désactive cette option sur la plateforme mobile sur
          laquelle l&apos;abonnement a été souscrit.
        </p>
        <p>
          En cas de non-respect des présentes CGU par un Utilisateur, BUBBLEOUT se réserve le droit de
          mettre fin au contrat immédiatement après avoir informé l&apos;Utilisateur.
        </p>
        <p>
          En tout état de cause, aucun remboursement ne serait effectué si l&apos;Utilisateur avait
          souscrit à un abonnement actif ou avait acheté des Comments ou des Boosts.
        </p>

        <h3 className="mt-2 text-lg font-semibold text-ink">7.2. Droit de rétractation</h3>
        <p>
          Conformément à l&apos;article L.&nbsp;221-28 du Code de la Consommation, le droit de
          rétractation prévu à l&apos;article L.&nbsp;221-18 du Code de la consommation, n&apos;est pas
          applicable &laquo;&nbsp;
          <em>
            13° De fourniture d&apos;un contenu numérique non fourni sur un support matériel dont
            l&apos;exécution a commencé après accord préalable exprès du consommateur et renoncement
            exprès à son droit de rétractation
          </em>
          &nbsp;&raquo;.
        </p>
        <p>
          L&apos;Utilisateur reconnaît expressément, conformément aux présentes, qu&apos;il ne
          bénéficiera pas du droit de rétractation pour la fourniture d&apos;un contenu numérique
          indépendant de tout support matériel avant l&apos;expiration du délai de rétractation et, dans
          cette hypothèse, l&apos;Utilisateur renonce à l&apos;exercice de son droit de rétractation.
        </p>
        <p>Ce renoncement sera aussi indiqué par email lors de toute souscription à un abonnement.</p>

        <h3 className="mt-2 text-lg font-semibold text-ink">7.3. Suppression du compte</h3>
        <p>
          L&apos;Utilisateur peut choisir de supprimer définitivement son Compte BUBBLEOUT à tout moment
          et sans préavis directement depuis l&apos;Application.
        </p>
        <p>
          La suppression du Compte entraîne la suppression définitive du profil, ainsi que des Comments
          et autres avantages associés au Compte, sans possibilité de récupération.
        </p>
        <p>
          Les Utilisateurs abonnés souhaitant supprimer leur Compte doivent également annuler leur
          abonnement via les plateformes de téléchargement mobiles (Apple, Google).
        </p>
        <p>
          Une fois le Compte supprimé, le profil de l&apos;Utilisateur sera rendu invisible aux autres
          Utilisateurs et les achats effectués dans l&apos;Application sur le Compte seront perdus sans
          possibilité de remboursement.
        </p>
        <p>
          La désinstallation de l&apos;Application ne supprime pas le Compte de l&apos;Utilisateur. Il
          est donc recommandé de supprimer son Compte directement depuis l&apos;Application avant de
          procéder à la désinstallation. Si l&apos;Utilisateur télécharge à nouveau l&apos;Application
          dans un délai de deux (2) ans, les données conservées seront réaffectées à son profil.
        </p>

        <h3 className="mt-2 text-lg font-semibold text-ink">7.4. Suspension/résiliation du compte</h3>
        <p>
          En cas de non-respect des CGU par un Utilisateur, son Compte peut être résilié de plein droit
          par BUBBLEOUT après en avoir informé l&apos;Utilisateur.
        </p>
        <p>
          BUBBLEOUT peut suspendre le Compte de l&apos;Utilisateur le temps nécessaire pour effectuer
          des vérifications à la suite d&apos;un signalement ou en cas de violation présumée des CGU.
        </p>
        <p>
          L&apos;Utilisateur est invité à contacter le support de BUBBLEOUT par e-mail afin
          d&apos;obtenir plus d&apos;informations sur les raisons de la suspension ou du bannissement de
          son Compte. Il pourra ainsi présenter ses observations ou fournir des preuves indiquant que le
          problème a été résolu.
        </p>
        <p>
          Si, dans un délai de trente (30) jours suivant la notification de suspension du Compte,
          l&apos;Utilisateur n&apos;a pas pris contact avec le service client de BUBBLEOUT ou si les
          informations fournies ne permettent pas de résoudre le problème, BUBBLEOUT pourra procéder au
          bannissement définitif du Compte, et en informera l&apos;Utilisateur par l&apos;Application ou
          par email.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-ink/80">
        <h2 className="text-xl font-bold text-ink">8. Mise à jour</h2>
        <p>
          BUBBLEOUT veille à ce que l&apos;Utilisateur soit informé des mises à jour nécessaires au
          maintien de la conformité du Service dans un délai d&apos;un (1) jour avant ces dernières.
        </p>
        <p>
          Pour les mises à jour non nécessaires au fonctionnement du Site, BUBBLEOUT fournira une raison
          valable de ces derniers lorsqu&apos;elle informera les Utilisateurs au moins trois (3) jours
          avant par courriel en indiquant la date de cette mise à jour. Dans ce contexte, l&apos;Utilisateur
          est en droit de ne plus utiliser les Services, si la mise à jour a une incidence négative sur
          son accès aux Services et ce dans un délai de trente (30) jours.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-ink/80">
        <h2 className="text-xl font-bold text-ink">9. Données personnelles</h2>
        <p>
          Pour l&apos;utilisation des Services, l&apos;Utilisateur doit fournir les informations
          personnelles prévues dans la politique de confidentialité sur sa personne.
        </p>
        <p>
          Les données à caractère personnel sont traitées conformément à la{" "}
          <a href="/privacy-policy" className="text-blue hover:underline">
            Politique de confidentialité
          </a>
          .
        </p>
      </section>

      <section className="mt-10 space-y-4 text-ink/80">
        <h2 className="text-xl font-bold text-ink">10. Responsabilité</h2>
        <p>
          L&apos;Utilisateur s&apos;engage à utiliser l&apos;Application BUBBLEOUT exclusivement à des
          fins personnelles et ne doit en aucun cas être utilisé à des fins commerciales, promotionnelles,
          électorales, ou de recrutement.
        </p>
        <p>
          L&apos;Utilisateur est seul responsable des actions et des informations qu&apos;il publie via
          l&apos;Application BUBBLEOUT.
        </p>
        <p>
          BUBBLEOUT s&apos;engage à fournir l&apos;infrastructure et les moyens techniques nécessaires
          pour offrir un Service de qualité à ses Utilisateurs, équipé d&apos;un smartphone iPhone
          fonctionnant sous iOS&nbsp;10 ou supérieur, ou d&apos;un smartphone Android utilisant la
          version&nbsp;5 ou supérieure.
        </p>
        <p>
          BUBBLEOUT, en l&apos;absence d&apos;implication, ne pourrait commettre de fautes dans les cas
          suivants&nbsp;:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>En cas d&apos;utilisation de l&apos;Application par l&apos;Utilisateur contraire à son objectif&nbsp;;</li>
          <li>
            En cas de dommage causé par un Utilisateur à un autre Utilisateur ou à un tiers dans le
            cadre d&apos;un Event dont la mise en place a été facilité par l&apos;Application&nbsp;;
          </li>
          <li>
            En cas d&apos;incidents survenus lors d&apos;un Event facilité par l&apos;Application, y
            compris, mais sans s&apos;y limiter, des conflits entre participants, des problèmes de
            sécurité, des comportements inappropriés ou illégaux, ou tout autre incident survenu pendant
            un Event&nbsp;;
          </li>
          <li>
            En raison de tout dommage ou litige découlant de l&apos;utilisation de l&apos;Application
            pour organiser, promouvoir ou participer à un Event&nbsp;;
          </li>
          <li>En cas de non-respect par l&apos;Utilisateur des présentes CGU&nbsp;;</li>
          <li>En cas d&apos;interruption du réseau Internet et/ou intranet&nbsp;;</li>
          <li>
            En cas de problèmes techniques et/ou d&apos;une cyberattaque affectant les installations,
            logiciels, matériels ou espaces numériques appartenant à l&apos;Utilisateur ou sous sa
            responsabilité&nbsp;;
          </li>
          <li>
            En cas d&apos;accès à des informations via un lien vers d&apos;autres pages internet,
            BUBBLEOUT décline toute responsabilité quant à leur contenu, ainsi qu&apos;en cas de
            problème technique ou de faille de sécurité provenant d&apos;un lien tiers.
          </li>
        </ul>
        <p>
          Les informations et Services fournis via BUBBLEOUT peuvent contenir des erreurs ou des
          inexactitudes. BUBBLEOUT peut à tout moment effectuer des modifications et ne garantit pas
          l&apos;exactitude ou la fiabilité des informations fournies.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-ink/80">
        <h2 className="text-xl font-bold text-ink">11. Propriété intellectuelle</h2>
        <h3 className="mt-2 text-lg font-semibold text-ink">11.1. Droits sur la marque</h3>
        <p>
          La marque BUBBLEOUT est la propriété exclusive de BUBBLEOUT, qui détient l&apos;ensemble des
          droits y afférents. Toute reproduction, utilisation, modification ou suppression partielle ou
          totale de la marque, du logo, ou du slogan de BUBBLEOUT, quel que soit le support ou le média
          utilisé, est strictement interdite sans autorisation écrite préalable de BUBBLEOUT.
        </p>
        <p>
          Toute violation est passible de poursuites judiciaires, conformément aux articles L.713-1 et
          suivants du Code de la propriété intellectuelle en vigueur en France et dans le monde entier.
        </p>

        <h3 className="mt-2 text-lg font-semibold text-ink">11.2. Droits d&apos;auteur</h3>
        <p>
          Tous les contenus et œuvres originaux proposés par BUBBLEOUT, incluant notamment les logiciels,
          textes, images, vidéos, graphismes, animations, et la structure générale de l&apos;Application,
          sont la propriété exclusive de BUBBLEOUT.
        </p>
        <p>
          Toute reproduction, diffusion, exploitation ou représentation, totale ou partielle, de ces
          éléments, sous quelque forme que ce soit, est interdite sans autorisation écrite préalable de
          BUBBLEOUT, sous peine de poursuites judiciaires. Ces œuvres sont protégées par les articles
          L.335-3 et suivants du Code de la propriété intellectuelle.
        </p>

        <h3 className="mt-2 text-lg font-semibold text-ink">11.3. Licence</h3>
        <p>
          Les droits d&apos;utilisation concédés par BUBBLEOUT aux Utilisateurs sont strictement limités
          à un usage privé et personnel. Toute autre utilisation, telle que l&apos;exploitation
          commerciale ou la distribution, est formellement interdite sans l&apos;autorisation préalable,
          expresse et écrite de BUBBLEOUT.
        </p>
        <p>
          L&apos;Utilisateur accorde à BUBBLEOUT ainsi qu&apos;à ses partenaires une licence gratuite,
          non exclusive et mondiale, pour la durée d&apos;exécution des présentes CGU, portant sur
          l&apos;utilisation, la reproduction, la modification, la traduction et la diffusion de tout
          contenu protégé par des droits de propriété intellectuelle ou des droits de la personnalité
          (y compris droit à l&apos;image, au nom et à la voix) qu&apos;il fournit via l&apos;Application.
        </p>
        <p>
          L&apos;Utilisateur conserve l&apos;intégralité des droits de propriété sur le contenu et les
          données personnelles qu&apos;il fournit sur l&apos;Application.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-ink/80">
        <h2 className="text-xl font-bold text-ink">12. Publication ayant un contenu illicite</h2>
        <p>
          Lors de l&apos;utilisation des Services, l&apos;Utilisateur peut être confronté à des
          informations et des contenus inexacts, partiels, différés, prêtant à confusion, illégaux,
          choquants ou autrement dommageables. BUBBLEOUT ne relit pas le contenu publié par ses
          Utilisateurs.
        </p>
        <p>
          BUBBLEOUT met en place un système de signalement permettant aux Utilisateurs de signaler les
          contenus susvisés s&apos;ils sont jugés illicites.
        </p>
        <p>
          Si un contenu publié fait l&apos;objet d&apos;un signalement, l&apos;Utilisateur à
          l&apos;origine de ce contenu verra son Compte être banni dans la majorité des cas afin de
          garantir le retrait rapide du contenu litigieux.
        </p>
        <p>
          Par ailleurs, avant toute publication effective sur l&apos;Application, BUBBLEOUT contrôlera
          les contenus qui y seront publiés, de façon automatisée. BUBBLEOUT se réserve le droit de
          modérer ou de supprimer tout contenu ou toute information qui entrerait en infraction avec les
          présentes CGU ou la loi.
        </p>
        <p className="font-medium">a. Contenu terroriste</p>
        <p>
          Conformément au règlement européen relatif à la lutte contre la diffusion des contenus à
          caractère terroriste en ligne (UE 2021/784), est considéré comme contenu à caractère
          terroriste tout matériel qui incite autrui à commettre des infractions terroristes, sollicite
          autrui pour commettre des infractions terroristes, fournit des instructions pour la commission
          d&apos;infractions terroristes, ou constitue une menace quant à la commission
          d&apos;infractions terroristes.
        </p>
        <p className="font-medium">b. Autre contenu illicite</p>
        <p>
          Si un Utilisateur estime que du contenu publié sur l&apos;Application porte atteinte à ses
          droits légaux personnels ou est contraire à la législation française, alors il peut le signaler
          par courriel à BUBBLEOUT.
        </p>
        <p>
          Etant entendu que le contenu considéré comme étant illicite ou interdit par BUBBLEOUT comprend
          notamment un contenu qui&nbsp;:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Pourrait être offensant, harcelant, embarrassant ou nuisible pour autrui&nbsp;;</li>
          <li>Est obscène, pornographique, violent, ou qui porte atteinte à la dignité humaine&nbsp;;</li>
          <li>Contient des propos abusifs, insultants, discriminatoires ou encourageant la haine&nbsp;;</li>
          <li>Incite ou facilite des activités illégales, dangereuses, ou nuisibles&nbsp;;</li>
          <li>
            Est diffamatoire, inexact, ou enfreint les droits d&apos;autrui, y compris les droits de
            propriété intellectuelle et à la vie privée&nbsp;;
          </li>
          <li>
            Implique ou exploite des enfants, y compris des images, des propos ou des comportements qui
            encouragent ou facilitent l&apos;exploitation des mineurs&nbsp;;
          </li>
          <li>
            Est incompatible avec l&apos;utilisation prévue des Services, ou pourrait nuire à la
            réputation de BUBBLEOUT ou de ses affiliés.
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-4 text-ink/80">
        <h2 className="text-xl font-bold text-ink">13. Force majeure</h2>
        <p>
          L&apos;exécution des Services par BUBBLEOUT pourra être suspendue en cas de force majeure qui
          empêcherait ou retarderait son exécution conformément à l&apos;article 1218 du Code civil.
        </p>
        <p>
          Dans de tels cas, BUBBLEOUT notifiera à l&apos;Utilisateur la survenance d&apos;un cas fortuit
          ou d&apos;un cas de force majeure dans un délai de 7 (sept) jours à compter de la survenance
          de celui-ci.
        </p>
        <p>
          Dans le cas où la suspension du Service se prolongerait au-delà de quinze (15) jours,
          l&apos;Utilisateur aura la possibilité de ne plus utiliser les Services.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-ink/80">
        <h2 className="text-xl font-bold text-ink">14. Loi applicable et règlement des litiges</h2>
        <p>Les présentes CGU sont régies par le droit français.</p>
        <p>
          En cas de différend, l&apos;Utilisateur s&apos;engage à contacter d&apos;abord BUBBLEOUT par
          écrit à l&apos;adresse mail suivante&nbsp;:{" "}
          <a href="mailto:hello@bubbleout.fr" className="text-blue hover:underline">
            hello@bubbleout.fr
          </a>{" "}
          pour tenter de résoudre le litige à l&apos;amiable.
        </p>
        <p>
          Après démarche préalable écrite des consommateurs auprès de BUBBLEOUT, le Service du Médiateur
          peut être saisi pour tout litige de consommation dont le règlement n&apos;aurait pas abouti.
        </p>
        <p>
          <strong>Plateforme de Règlement en Ligne des Litiges</strong>&nbsp;: Si aucun accord
          n&apos;est trouvé, l&apos;Utilisateur peut recourir à la médiation gratuite via la plateforme
          de résolution des litiges de la Commission européenne. Cette plateforme est accessible au lien
          suivant&nbsp;:{" "}
          <a
            href="http://ec.europa.eu/consumers/odr/"
            className="text-blue hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            http://ec.europa.eu/consumers/odr/
          </a>
          .
        </p>
        <p>Tout litige non résolu sera soumis aux juridictions compétentes.</p>
      </section>
    </LegalLayout>
  );
}
