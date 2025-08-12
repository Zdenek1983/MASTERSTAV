import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'cs' | 'de' | 'ru' | 'uk' | 'vi'

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
  },
  ru: {
    // Navigation
    home: 'Главная',
    references: 'Наши работы',
    contact: 'Контакты',
    
    // Homepage
    heroTitle: 'MASTERSTAV s.r.o.',
    heroSubtitle: 'Семейная строительная компания с традициями',
    heroDescription: 'Мы специализируемся на полном комплексе строительных услуг, реконструкции и мансардных надстроек. Более 20 лет опыта в Карловых Варах - гарантия качества и надежности.',
    getQuote: 'Получить смету',
    ourServices: 'Наши услуги',
    
    // Services
    newConstruction: 'Новое строительство',
    newConstructionDesc: 'Полное строительство частных домов под ключ, включая проектную документацию.',
    reconstruction: 'Реконструкция',
    reconstructionDesc: 'Полная или частичная реконструкция квартир, домов и коммерческих помещений.',
    atticConversion: 'Мансардные надстройки',
    atticConversionDesc: 'Преобразование чердачных помещений в жилые пространства с максимальным использованием площади.',
    earthwork: 'Земляные работы',
    earthworkDesc: 'Рытье котлованов под фундаменты, планировка участков, дренаж и полный комплекс земляных работ.',
    stoneWork: 'Каменные работы',
    stoneWorkDesc: 'Каменные работы Карловы Вары - облицовка, полы, лестницы и декоративные элементы из камня.',
    insulation: 'Утепление',
    insulationDesc: 'Комплексное утепление фасадов и крыш для экономии энергии.',
    interiors: 'Интерьеры',
    interiorsDesc: 'Полная реализация интерьеров, включая дизайн и поставку материалов.',
    
    // Why choose us
    whyChooseUs: 'Почему выбирают нас?',
    experience: 'Более 20 лет опыта',
    experienceDesc: 'Многолетняя практика в Карловых Варах и сотни довольных клиентов.',
    quality: 'Качественные материалы',
    qualityDesc: 'Мы используем только проверенные материалы от известных производителей.',
    warranty: 'Гарантия и сервис',
    warrantyDesc: 'На все наши работы предоставляем гарантию и последующий сервис.',
    pricing: 'Прозрачные цены',
    pricingDesc: 'Честные цены без скрытых платежей и дополнительных расходов.',
    
    // References
    referencesTitle: 'Наши работы',
    referencesSubtitle: 'Посмотрите на наши завершенные проекты в Карловых Варах и окрестностях',
    viewProject: 'Посмотреть проект',
    
    // Contact
    contactTitle: 'Свяжитесь с нами',
    contactSubtitle: 'Мы с радостью подготовим для вас индивидуальное предложение',
    contactInfo: 'Контактная информация',
    address: 'Адрес',
    phone: 'Телефон',
    email: 'Эл. почта',
    openingHours: 'Режим работы',
    workdays: 'Пн - Пт: 7:00 - 17:00',
    saturday: 'Сб: 8:00 - 12:00',
    sunday: 'Вс: Закрыто',
    
    // Contact form
    contactForm: 'Форма обратной связи',
    name: 'Имя и фамилия',
    nameRequired: 'Имя обязательно',
    emailRequired: 'Эл. почта обязательна',
    phoneNumber: 'Номер телефона',
    subject: 'Тема',
    message: 'Сообщение',
    messageRequired: 'Сообщение обязательно',
    sendMessage: 'Отправить сообщение',
    messageSent: 'Сообщение успешно отправлено!',
    
    // Footer
    companyInfo: 'Информация о компании',
    footerDescription: 'MASTERSTAV s.r.o. - семейная строительная компания с многолетними традициями в Карловых Варах. Наша работа - наша визитная карточка.',
    quickLinks: 'Быстрые ссылки',
    services: 'Услуги',
    allRightsReserved: 'Все права защищены',
  },
  uk: {
    // Navigation
    home: 'Головна',
    references: 'Наші роботи',
    contact: 'Контакти',
    
    // Homepage
    heroTitle: 'MASTERSTAV s.r.o.',
    heroSubtitle: 'Сімейна будівельна компанія з традиціями',
    heroDescription: 'Ми спеціалізуємося на повному комплексі будівельних послуг, реконструкції та мансардних прибудов. Понад 20 років досвіду в Карлових Варах - гарантія якості та надійності.',
    getQuote: 'Отримати кошторис',
    ourServices: 'Наші послуги',
    
    // Services
    newConstruction: 'Нове будівництво',
    newConstructionDesc: 'Повне будівництво приватних будинків під ключ, включаючи проектну документацію.',
    reconstruction: 'Реконструкція',
    reconstructionDesc: 'Повна або часткова реконструкція квартир, будинків та комерційних приміщень.',
    atticConversion: 'Мансардні прибудови',
    atticConversionDesc: 'Перетворення горищних приміщень у житлові простори з максимальним використанням площі.',
    earthwork: 'Земляні роботи',
    earthworkDesc: 'Риття котлованів під фундаменти, планування ділянок, дренаж та повний комплекс земляних робіт.',
    stoneWork: 'Кам\'яні роботи',
    stoneWorkDesc: 'Кам\'яні роботи Карлові Вари - облицювання, підлоги, сходи та декоративні елементи з каменю.',
    insulation: 'Утеплення',
    insulationDesc: 'Комплексне утеплення фасадів та дахів для економії енергії.',
    interiors: 'Інтер\'єри',
    interiorsDesc: 'Повна реалізація інтер\'єрів, включаючи дизайн та постачання матеріалів.',
    
    // Why choose us
    whyChooseUs: 'Чому обирають нас?',
    experience: 'Понад 20 років досвіду',
    experienceDesc: 'Багаторічна практика в Карлових Варах та сотні задоволених клієнтів.',
    quality: 'Якісні матеріали',
    qualityDesc: 'Ми використовуємо тільки перевірені матеріали від відомих виробників.',
    warranty: 'Гарантія та сервіс',
    warrantyDesc: 'На всі наші роботи надаємо гарантію та подальший сервіс.',
    pricing: 'Прозорі ціни',
    pricingDesc: 'Чесні ціни без прихованих платежів та додаткових витрат.',
    
    // References
    referencesTitle: 'Наші роботи',
    referencesSubtitle: 'Подивіться на наші завершені проекти в Карлових Варах та околицях',
    viewProject: 'Подивитися проект',
    
    // Contact
    contactTitle: 'Зв\'яжіться з нами',
    contactSubtitle: 'Ми з радістю підготуємо для вас індивідуальну пропозицію',
    contactInfo: 'Контактна інформація',
    address: 'Адреса',
    phone: 'Телефон',
    email: 'Ел. пошта',
    openingHours: 'Режим роботи',
    workdays: 'Пн - Пт: 7:00 - 17:00',
    saturday: 'Сб: 8:00 - 12:00',
    sunday: 'Нд: Закрито',
    
    // Contact form
    contactForm: 'Форма зворотного зв\'язку',
    name: 'Ім\'я та прізвище',
    nameRequired: 'Ім\'я обов\'язкове',
    emailRequired: 'Ел. пошта обов\'язкова',
    phoneNumber: 'Номер телефону',
    subject: 'Тема',
    message: 'Повідомлення',
    messageRequired: 'Повідомлення обов\'язкове',
    sendMessage: 'Відправити повідомлення',
    messageSent: 'Повідомлення успішно відправлено!',
    
    // Footer
    companyInfo: 'Інформація про компанію',
    footerDescription: 'MASTERSTAV s.r.o. - сімейна будівельна компанія з багаторічними традиціями в Карлових Варах. Наша робота - наша візитна картка.',
    quickLinks: 'Швидкі посилання',
    services: 'Послуги',
    allRightsReserved: 'Всі права захищені',
  },
  vi: {
    // Navigation
    home: 'Trang chủ',
    references: 'Công trình',
    contact: 'Liên hệ',
    
    // Homepage
    heroTitle: 'MASTERSTAV s.r.o.',
    heroSubtitle: 'Công ty xây dựng gia đình với truyền thống',
    heroDescription: 'Chúng tôi chuyên về các dịch vụ xây dựng toàn diện, cải tạo và xây dựng tầng áp mái. Với hơn 20 năm kinh nghiệm tại Karlovy Vary, chúng tôi mang đến chất lượng và độ tin cậy.',
    getQuote: 'Nhận báo giá',
    ourServices: 'Dịch vụ của chúng tôi',
    
    // Services
    newConstruction: 'Xây dựng mới',
    newConstructionDesc: 'Xây dựng hoàn chỉnh các ngôi nhà riêng trọn gói, bao gồm tài liệu dự án.',
    reconstruction: 'Cải tạo',
    reconstructionDesc: 'Cải tạo toàn bộ hoặc từng phần cho căn hộ, nhà ở và không gian thương mại.',
    atticConversion: 'Xây dựng tầng áp mái',
    atticConversionDesc: 'Chuyển đổi không gian gác mái thành không gian sống với việc sử dụng tối đa diện tích.',
    earthwork: 'Công tác đất',
    earthworkDesc: 'Đào móng, cải tạo địa hình, thoát nước và toàn bộ công tác đất.',
    stoneWork: 'Công tác đá',
    stoneWorkDesc: 'Công tác đá Karlovy Vary - ốp lát, sàn, cầu thang và các yếu tố trang trí bằng đá.',
    insulation: 'Cách nhiệt',
    insulationDesc: 'Cách nhiệt toàn diện cho mặt tiền và mái nhà để tiết kiệm năng lượng.',
    interiors: 'Nội thất',
    interiorsDesc: 'Thực hiện hoàn chỉnh nội thất bao gồm thiết kế và cung cấp vật liệu.',
    
    // Why choose us
    whyChooseUs: 'Tại sao chọn chúng tôi?',
    experience: 'Hơn 20 năm kinh nghiệm',
    experienceDesc: 'Nhiều năm thực hành tại Karlovy Vary và hàng trăm khách hàng hài lòng.',
    quality: 'Vật liệu chất lượng',
    qualityDesc: 'Chúng tôi chỉ sử dụng vật liệu đã được kiểm chứng từ các nhà sản xuất uy tín.',
    warranty: 'Bảo hành và dịch vụ',
    warrantyDesc: 'Chúng tôi cung cấp bảo hành và dịch vụ hậu mãi cho tất cả công việc.',
    pricing: 'Giá cả minh bạch',
    pricingDesc: 'Giá cả công bằng không có phí ẩn và chi phí phát sinh.',
    
    // References
    referencesTitle: 'Công trình của chúng tôi',
    referencesSubtitle: 'Xem các dự án đã hoàn thành của chúng tôi tại Karlovy Vary và vùng phụ cận',
    viewProject: 'Xem dự án',
    
    // Contact
    contactTitle: 'Liên hệ với chúng tôi',
    contactSubtitle: 'Chúng tôi sẽ vui lòng chuẩn bị báo giá phù hợp cho bạn',
    contactInfo: 'Thông tin liên hệ',
    address: 'Địa chỉ',
    phone: 'Điện thoại',
    email: 'Email',
    openingHours: 'Giờ làm việc',
    workdays: 'T2 - T6: 7:00 - 17:00',
    saturday: 'T7: 8:00 - 12:00',
    sunday: 'CN: Đóng cửa',
    
    // Contact form
    contactForm: 'Biểu mẫu liên hệ',
    name: 'Họ và tên',
    nameRequired: 'Tên là bắt buộc',
    emailRequired: 'Email là bắt buộc',
    phoneNumber: 'Số điện thoại',
    subject: 'Chủ đề',
    message: 'Tin nhắn',
    messageRequired: 'Tin nhắn là bắt buộc',
    sendMessage: 'Gửi tin nhắn',
    messageSent: 'Tin nhắn đã được gửi thành công!',
    
    // Footer
    companyInfo: 'Thông tin công ty',
    footerDescription: 'MASTERSTAV s.r.o. là công ty xây dựng gia đình với truyền thống lâu đời tại Karlovy Vary. Công việc của chúng tôi là danh thiếp của chúng tôi.',
    quickLinks: 'Liên kết nhanh',
    services: 'Dịch vụ',
    allRightsReserved: 'Bảo lưu mọi quyền',
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