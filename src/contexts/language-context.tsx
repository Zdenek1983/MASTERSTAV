import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'cs' | 'de'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  cs: {
    // Navigation
    home: 'Domů',
    references: 'Reference',
    contact: 'Kontakt',
    
    // Homepage
    heroTitle: 'MASTERSTAV s.r.o.',
    heroSubtitle: 'Rodinná stavební firma s tradicí',
    heroDescription: 'Specializujeme se na kompletní stavební služby, rekonstrukce a půdní vestavby. S více než 20letou zkušeností v Karlových Varech přinášíme kvalitu a spolehlivost.',
    getQuote: 'Získat cenovou nabídku',
    ourServices: 'Naše služby',
    
    // Services
    newConstruction: 'Novostavby',
    newConstructionDesc: 'Kompletní výstavba rodinných domů na klíč včetně projektové dokumentace.',
    reconstruction: 'Rekonstrukce',
    reconstructionDesc: 'Celkové i částečné rekonstrukce bytů, domů a komerčních prostor.',
    atticConversion: 'Půdní vestavby',
    atticConversionDesc: 'Přeměna podkroví na obytné prostory s maximálním využitím prostoru.',
    earthwork: 'Zemní práce',
    earthworkDesc: 'Výkopy základů, terénní úpravy, odvodnění a kompletní zemní práce.',
    stoneWork: 'Kamenické práce',
    stoneWorkDesc: 'Kamenické práce Karlovy Vary - obklady, dlažby, schodiště a dekorativní prvky z kamene.',
    insulation: 'Zateplení',
    insulationDesc: 'Komplexní zateplení fasád a střech pro úsporu energií.',
    interiors: 'Interiéry',
    interiorsDesc: 'Kompletní realizace interiérů včetně designu a dodávky materiálů.',
    
    // Why choose us
    whyChooseUs: 'Proč si vybrat právě nás?',
    experience: 'Více než 20 let zkušeností',
    experienceDesc: 'Dlouholetá praxe v Karlových Varech a stovky spokojených zákazníků.',
    quality: 'Kvalitní materiály',
    qualityDesc: 'Používáme pouze prověřené materiály od renomovaných výrobců.',
    warranty: 'Záruka a servis',
    warrantyDesc: 'Na všechny naše práce poskytujeme záruку a následný servis.',
    pricing: 'Transparentní ceny',
    pricingDesc: 'Férové ceny bez skrytých poplatků a dodatečných nákladů.',
    
    // References
    referencesTitle: 'Naše reference',
    referencesSubtitle: 'Podívejte se na naše dokončené projekty v Karlových Varech a okolí',
    viewProject: 'Zobrazit projekt',
    
    // Contact
    contactTitle: 'Kontaktujte nás',
    contactSubtitle: 'Rádi vám připravíme cenovou nabídku na míru',
    contactInfo: 'Kontaktní informace',
    address: 'Adresa',
    phone: 'Telefon',
    email: 'E-mail',
    openingHours: 'Provozní doba',
    workdays: 'Po - Pá: 7:00 - 17:00',
    saturday: 'So: 8:00 - 12:00',
    sunday: 'Ne: Zavřeno',
    
    // Contact form
    contactForm: 'Kontaktní formulář',
    name: 'Jméno a příjmení',
    nameRequired: 'Jméno je povinné',
    emailRequired: 'E-mail je povinný',
    phoneNumber: 'Telefonní číslo',
    subject: 'Předmět',
    message: 'Zpráva',
    messageRequired: 'Zpráva je povinná',
    sendMessage: 'Odeslat zprávu',
    messageSent: 'Zpráva byla úspěšně odeslána!',
    
    // Footer
    companyInfo: 'Informace o společnosti',
    footerDescription: 'MASTERSTAV s.r.o. je rodinná stavební firma s dlouholetou tradicí v Karlových Varech. Naše práce je naší vizitkou.',
    quickLinks: 'Rychlé odkazy',
    services: 'Služby',
    allRightsReserved: 'Všechna práva vyhrazena',
  },
  de: {
    // Navigation
    home: 'Startseite',
    references: 'Referenzen',
    contact: 'Kontakt',
    
    // Homepage
    heroTitle: 'MASTERSTAV s.r.o.',
    heroSubtitle: 'Familienbauunternehmen mit Tradition',
    heroDescription: 'Wir sind spezialisiert auf komplette Bauleistungen, Rekonstruktionen und Dachausbau. Mit über 20 Jahren Erfahrung in Karlsbad bringen wir Qualität und Zuverlässigkeit.',
    getQuote: 'Kostenvoranschlag erhalten',
    ourServices: 'Unsere Dienstleistungen',
    
    // Services
    newConstruction: 'Neubauten',
    newConstructionDesc: 'Kompletter schlüsselfertiger Bau von Einfamilienhäusern einschließlich Projektdokumentation.',
    reconstruction: 'Rekonstruktionen',
    reconstructionDesc: 'Vollständige und teilweise Rekonstruktionen von Wohnungen, Häusern und Gewerbeflächen.',
    atticConversion: 'Dachausbau',
    atticConversionDesc: 'Umwandlung von Dachböden in Wohnräume mit maximaler Raumnutzung.',
    earthwork: 'Erdarbeiten',
    earthworkDesc: 'Fundamentaushub, Geländemodellierung, Entwässerung und komplette Erdarbeiten.',
    stoneWork: 'Steinmetzarbeiten',
    stoneWorkDesc: 'Steinmetzarbeiten Karlsbad - Verkleidungen, Böden, Treppen und dekorative Steinelemente.',
    insulation: 'Dämmung',
    insulationDesc: 'Komplexe Dämmung von Fassaden und Dächern zur Energieeinsparung.',
    interiors: 'Innenausbau',
    interiorsDesc: 'Komplette Innenraumgestaltung einschließlich Design und Materiallieferung.',
    
    // Why choose us
    whyChooseUs: 'Warum uns wählen?',
    experience: 'Über 20 Jahre Erfahrung',
    experienceDesc: 'Langjährige Praxis in Karlsbad und Hunderte zufriedener Kunden.',
    quality: 'Hochwertige Materialien',
    qualityDesc: 'Wir verwenden nur bewährte Materialien von renommierten Herstellern.',
    warranty: 'Garantie und Service',
    warrantyDesc: 'Auf alle unsere Arbeiten gewähren wir Garantie und Nachservice.',
    pricing: 'Transparente Preise',
    pricingDesc: 'Faire Preise ohne versteckte Gebühren und zusätzliche Kosten.',
    
    // References
    referencesTitle: 'Unsere Referenzen',
    referencesSubtitle: 'Schauen Sie sich unsere abgeschlossenen Projekte in Karlsbad und Umgebung an',
    viewProject: 'Projekt ansehen',
    
    // Contact
    contactTitle: 'Kontaktieren Sie uns',
    contactSubtitle: 'Gerne erstellen wir Ihnen ein maßgeschneidertes Angebot',
    contactInfo: 'Kontaktinformationen',
    address: 'Adresse',
    phone: 'Telefon',
    email: 'E-Mail',
    openingHours: 'Öffnungszeiten',
    workdays: 'Mo - Fr: 7:00 - 17:00',
    saturday: 'Sa: 8:00 - 12:00',
    sunday: 'So: Geschlossen',
    
    // Contact form
    contactForm: 'Kontaktformular',
    name: 'Vor- und Nachname',
    nameRequired: 'Name ist erforderlich',
    emailRequired: 'E-Mail ist erforderlich',
    phoneNumber: 'Telefonnummer',
    subject: 'Betreff',
    message: 'Nachricht',
    messageRequired: 'Nachricht ist erforderlich',
    sendMessage: 'Nachricht senden',
    messageSent: 'Nachricht wurde erfolgreich gesendet!',
    
    // Footer
    companyInfo: 'Firmeninformation',
    footerDescription: 'MASTERSTAV s.r.o. ist ein Familienbauunternehmen mit langer Tradition in Karlsbad. Unsere Arbeit ist unsere Visitenkarte.',
    quickLinks: 'Schnelllinks',
    services: 'Dienstleistungen',
    allRightsReserved: 'Alle Rechte vorbehalten',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('cs')
  
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}