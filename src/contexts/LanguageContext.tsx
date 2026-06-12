'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Lang = 'en' | 'fr'

const translations = {
  en: {
    nav: {
      howItWorks: 'How It Works',
      features: 'Features',
      getStarted: 'Find Prospects',
    },
    hero: {
      label: 'AI-Powered Prospect Discovery',
      headline: 'Find the companies\nthat need you most.',
      subheadline:
        'Stop searching. Start prospecting. AI discovers your ideal clients, scores their buying intent, and writes your first message — in minutes.',
    },
    form: {
      title: 'Start your search',
      industryLabel: 'Target industry',
      industryPlaceholder: 'e.g. Recruitment Agencies, Marketing Agencies…',
      locationLabel: 'Location',
      locationPlaceholder: 'e.g. United Kingdom, France, London…',
      serviceLabel: 'What you sell',
      servicePlaceholder: 'e.g. AI automation services for back-office operations…',
      icpLabel: 'Your ideal customer',
      icpPlaceholder: 'e.g. B2B companies with 20-200 employees, manual processes, growing fast…',
      serviceHint: 'Be specific — this shapes every prospect message',
      icpHint: 'The more detail, the better your matches',
      submit: 'Find my prospects',
      submitting: 'Searching…',
    },
    progress: {
      title: 'Finding your prospects',
      subtitle: 'This takes 60–90 seconds. We\'re being thorough.',
    },
    stats: {
      prospects: 'prospects per search',
      time: 'minutes average',
      score: 'avg opportunity score',
      messages: 'outreach messages ready',
    },
    howItWorks: {
      label: 'The Process',
      title: 'From search to outreach in minutes.',
      steps: [
        { title: 'Define your target', desc: 'Tell us who you sell to and what you sell.' },
        { title: 'AI discovers companies', desc: 'We find 12 qualified prospects matching your ICP.' },
        { title: 'Signals are detected', desc: 'Buying intent, growth signals, and tech gaps are analysed.' },
        { title: 'Prospects are scored', desc: 'Each company gets an opportunity score from 0–10.' },
        { title: 'Outreach is written', desc: 'Personalised email, LinkedIn, and call scripts — ready to send.' },
      ],
    },
    results: {
      backToSearch: '← New search',
      exportCsv: 'Export CSV',
      exportExcel: 'Export Excel',
      viewReport: 'View Full Report',
      sortBy: 'Sort by',
      sortOptions: {
        overall: 'Overall Score',
        fit: 'Fit Score',
        opportunity: 'Opportunity Score',
        urgency: 'Urgency',
      },
      prospectsFound: (n: number) => `${n} prospect${n === 1 ? '' : 's'} found`,
    },
    report: {
      backToResults: '← Back to results',
      executiveSummary: 'Executive Summary',
      companyBackground: 'Company Background',
      challenges: 'Current Challenges',
      whyNow: 'Why Now',
      competitive: 'Competitive Context',
      howHelps: 'How You Can Help',
      stakeholders: 'Key Stakeholders',
      riskFlags: 'Risk Flags',
      signals: 'Buying Signals',
      painPoints: 'Pain Points',
      outreachTitle: 'Personalised Outreach',
      tabs: {
        email: 'Cold Email',
        linkedin: 'LinkedIn',
        followup: 'Follow-Up Sequence',
        call: 'Call Script',
      },
      copyEmail: 'Copy email',
      copyLinkedin: 'Copy message',
      copySubject: 'Copy subject',
      copied: 'Copied!',
      generatingReport: 'Generating intelligence brief…',
      generating: 'AI is preparing your personalised outreach…',
    },
    shared: {
      loading: 'Loading…',
      error: 'Something went wrong',
      tryAgain: 'Try again',
      score: 'Score',
      confidence: 'Confidence',
    },
  },
  fr: {
    nav: {
      howItWorks: 'Comment ça marche',
      features: 'Fonctionnalités',
      getStarted: 'Trouver des prospects',
    },
    hero: {
      label: 'Découverte de prospects par IA',
      headline: 'Trouvez les entreprises\nqui ont besoin de vous.',
      subheadline:
        "Arrêtez de chercher. Commencez à prospecter. L'IA découvre vos clients idéaux, évalue leur intention d'achat et rédige votre premier message — en quelques minutes.",
    },
    form: {
      title: 'Lancer une recherche',
      industryLabel: 'Secteur cible',
      industryPlaceholder: "ex. Agences de recrutement, Agences marketing…",
      locationLabel: 'Localisation',
      locationPlaceholder: 'ex. France, Royaume-Uni, Paris…',
      serviceLabel: 'Ce que vous vendez',
      servicePlaceholder: "ex. Services d'automatisation IA pour les opérations…",
      icpLabel: 'Votre client idéal',
      icpPlaceholder: 'ex. PME B2B de 20-200 employés, processus manuels…',
      serviceHint: 'Soyez précis — cela façonne chaque message',
      icpHint: 'Plus de détails = meilleures correspondances',
      submit: 'Trouver mes prospects',
      submitting: 'Recherche en cours…',
    },
    progress: {
      title: 'Recherche de vos prospects',
      subtitle: 'Cela prend 60 à 90 secondes. Nous sommes minutieux.',
    },
    stats: {
      prospects: 'prospects par recherche',
      time: 'minutes en moyenne',
      score: 'score moyen',
      messages: 'messages prêts à envoyer',
    },
    howItWorks: {
      label: 'Le Processus',
      title: 'De la recherche à la prospection en quelques minutes.',
      steps: [
        { title: 'Définissez votre cible', desc: 'Dites-nous à qui vous vendez et ce que vous vendez.' },
        { title: "L'IA découvre des entreprises", desc: 'Nous trouvons 12 prospects qualifiés.' },
        { title: 'Les signaux sont détectés', desc: "Intention d'achat, signaux de croissance et lacunes technologiques." },
        { title: 'Les prospects sont notés', desc: 'Chaque entreprise reçoit un score de 0 à 10.' },
        { title: 'La prospection est rédigée', desc: 'Email, LinkedIn et script téléphonique — prêts à envoyer.' },
      ],
    },
    results: {
      backToSearch: '← Nouvelle recherche',
      exportCsv: 'Exporter CSV',
      exportExcel: 'Exporter Excel',
      viewReport: 'Voir le rapport',
      sortBy: 'Trier par',
      sortOptions: {
        overall: 'Score global',
        fit: 'Score de correspondance',
        opportunity: "Score d'opportunité",
        urgency: 'Urgence',
      },
      prospectsFound: (n: number) => `${n} prospect${n > 1 ? 's' : ''} trouvé${n > 1 ? 's' : ''}`,
    },
    report: {
      backToResults: '← Retour aux résultats',
      executiveSummary: 'Résumé',
      companyBackground: "Profil de l'entreprise",
      challenges: 'Défis actuels',
      whyNow: 'Pourquoi maintenant',
      competitive: 'Contexte concurrentiel',
      howHelps: 'Comment vous pouvez aider',
      stakeholders: 'Parties prenantes clés',
      riskFlags: 'Points de vigilance',
      signals: "Signaux d'achat",
      painPoints: 'Points de douleur',
      outreachTitle: 'Prospection personnalisée',
      tabs: {
        email: 'Email froid',
        linkedin: 'LinkedIn',
        followup: 'Séquence de relance',
        call: 'Script téléphonique',
      },
      copyEmail: "Copier l'email",
      copyLinkedin: 'Copier le message',
      copySubject: 'Copier le sujet',
      copied: 'Copié !',
      generatingReport: 'Génération du rapport…',
      generating: "L'IA prépare votre prospection…",
    },
    shared: {
      loading: 'Chargement…',
      error: "Une erreur s'est produite",
      tryAgain: 'Réessayer',
      score: 'Score',
      confidence: 'Confiance',
    },
  },
}

type Translations = typeof translations.en

interface LangContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: Translations
}

const LangContext = createContext<LangContextValue>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    const stored = localStorage.getItem('sp-lang') as Lang | null
    if (stored === 'en' || stored === 'fr') setLangState(stored)
  }, [])

  function setLang(l: Lang) {
    setLangState(l)
    localStorage.setItem('sp-lang', l)
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LangContext)
}

export default LanguageProvider
