export type IconName =
  | "alert"
  | "award"
  | "book"
  | "briefcase"
  | "building"
  | "check"
  | "clock"
  | "euro"
  | "file"
  | "flag"
  | "globe"
  | "graduation"
  | "heart"
  | "home"
  | "language"
  | "map"
  | "plane"
  | "scale"
  | "shield"
  | "stethoscope"
  | "users"
  | "wallet";

export type GermanyReason = {
  title: string;
  body: string;
  icon: IconName;
};

export type GermanyRequirementGroup = {
  title: string;
  intro: string;
  items: string[];
  icon: IconName;
};

export type GermanyStage = {
  number: number;
  title: string;
  timeframe: string;
  body: string;
  actions: string[];
  checkpoint: string;
};

export type GermanyCostItem = {
  item: string;
  amount: string;
  note: string;
};

export type GermanySalaryBand = {
  role: string;
  monthly: string;
  annual: string;
  note: string;
};

export type GermanySpecialtyGroup = {
  title: string;
  body: string;
  specialties: string[];
  tone: "accessible" | "competitive";
};

export type GermanyLifeCard = {
  title: string;
  body: string;
  icon: IconName;
};

export type GermanyVisaType = {
  title: string;
  body: string;
  icon: IconName;
};

export type GermanyHospital = {
  state: string;
  name: string;
  image: string;
  city: string;
  body: string;
  url: string;
};

export const germanyPathway = {
  reasons: [
    {
      title: "High demand for doctors",
      body: "Germany has an ageing population and many hospitals recruit internationally. Demand is often strongest outside the most popular metropolitan areas, so flexibility about region can widen your options.",
      icon: "users",
    },
    {
      title: "A less match-driven route",
      body: "Unlike the USA and UK, Germany does not use one national residency match for every doctor. Specialty training is usually paid employment, so you apply directly to hospitals and departments while meeting the licensing rules.",
      icon: "briefcase",
    },
    {
      title: "Strong European salary levels",
      body: "Hospital doctors are employed under collective agreements or individual contracts. Gross pay is attractive in a European context, with predictable increases by experience and extra payment for on-call work in many tariff systems.",
      icon: "euro",
    },
    {
      title: "Realistic specialty opportunities",
      body: "Many surgical and hospital specialties recruit when there are vacancies, especially in regional hospitals. Dermatology and ophthalmology are usually more competitive, but a strong application and geographic flexibility can still create a path.",
      icon: "stethoscope",
    },
  ] satisfies GermanyReason[],
  requirementGroups: [
    {
      title: "Medical certification and education",
      intro: "Your first task is to prove that you completed the medical education and practical training that qualify you to practise in your home country.",
      items: [
        "Medical degree or diploma and a detailed transcript or curriculum",
        "Evidence of internship, practical year, licensing examination, or other required graduation stage",
        "Home-country licence or registration, where applicable",
        "Certificates of employment, clinical experience, and existing specialty training if relevant",
      ],
      icon: "graduation",
    },
    {
      title: "German language: B2 plus medical C1",
      intro: "Safe patient care requires more than conversational German. The commonly used pattern is general German at B2 CEFR plus a medical-language assessment at C1 Medizin level.",
      items: [
        "General German certificate, commonly B2 CEFR, using a certificate accepted by the competent authority",
        "Fachsprachprüfung, the professional medical-language examination used by the relevant authority or medical chamber",
        "Clinical practice in history-taking, documentation, consent, handover, and explaining treatment in German",
        "Check certificate age and accepted providers with your state authority; local rules can differ",
      ],
      icon: "language",
    },
    {
      title: "Recognition, exams, and licence",
      intro: "The licence route is state-administered. The authority compares your qualification with German training and tells you which next step applies.",
      items: [
        "Anerkennung and equivalence assessment by the responsible Approbationsbehörde",
        "Fachsprachprüfung before the professional-language requirement is considered complete in many cases",
        "Kenntnisprüfung if substantial differences remain after the equivalence assessment",
        "Approbation for unrestricted practice, or a time-limited Berufserlaubnis when the authority permits it",
      ],
      icon: "award",
    },
    {
      title: "Documents and professional reliability",
      intro: "Document preparation is where many applications slow down. Names, dates, translations, and expiry periods should match across the whole file.",
      items: [
        "Passport or identity document, birth certificate, and name-change documents when applicable",
        "Current signed CV, proof of address or connection to the chosen Land, and application forms",
        "Certificate of good standing and police or judicial clearance from relevant countries",
        "Medical fitness certificate, certified copies, and authorised German translations",
      ],
      icon: "file",
    },
    {
      title: "Job and relocation readiness",
      intro: "You can prepare your job search while recognition is progressing, but the contract must match the work permission you actually hold.",
      items: [
        "German-format CV, references, translated work certificates, and a clear specialty target",
        "A budget for exams, translations, legalisation, travel, rent deposit, insurance, and living costs before the first salary",
        "Written confirmation of department, training status, supervision, salary, rota, and licence condition",
        "A visa or residence route that matches your nationality, job offer, and stage of recognition",
      ],
      icon: "briefcase",
    },
  ] satisfies GermanyRequirementGroup[],
  stages: [
    {
      number: 1,
      title: "Choose the federal state and authority",
      timeframe: "Start here",
      body: "Germany has 16 federal states, and licensing is handled through state authorities. Choose a realistic place to work, then identify the responsible Approbationsbehörde and the State Chamber of Physicians for specialty training.",
      actions: [
        "Compare the official checklist for your chosen Land",
        "Confirm whether the authority accepts an application from abroad",
        "Ask whether your degree, internship, and licence documents need specific verification",
      ],
      checkpoint: "You know exactly where your application goes and which rulebook applies to your case.",
    },
    {
      number: 2,
      title: "Reach general B2 and medical C1 German",
      timeframe: "Often the longest stage",
      body: "Build general German first, then train the language of clinical work. The Fachsprachprüfung commonly tests a structured history, physician-to-physician communication, and medical documentation rather than academic German alone.",
      actions: [
        "Study speaking, listening, grammar, reading, and writing together",
        "Practise explaining diagnoses, risks, medicines, and follow-up in plain German",
        "Use case simulations for the format used in your federal state",
      ],
      checkpoint: "You can take a focused history, write a concise note, and hand over a patient safely in German.",
    },
    {
      number: 3,
      title: "Collect, translate, and certify the file",
      timeframe: "Before submission",
      body: "Prepare the degree, transcript, internship evidence, professional status, good standing, police clearances, medical certificate, CV, and identity documents. The authority may request additional evidence based on your country and training history.",
      actions: [
        "Order official documents early and track their validity periods",
        "Use a translator and certification format accepted by the authority",
        "Keep a digital index of every document, translation, fee, and submission receipt",
      ],
      checkpoint: "The authority can assess your file instead of returning it for missing or inconsistent paperwork.",
    },
    {
      number: 4,
      title: "Apply for Anerkennung and the licence",
      timeframe: "Authority review",
      body: "The Approbationsbehörde compares your medical qualification with German standards. The decision may be direct equivalence, a request for more documents, or a finding of substantial differences that leads to the Kenntnisprüfung route.",
      actions: [
        "Submit only through the official channel and answer follow-up requests promptly",
        "Ask for the written decision and the exact next examination or licence step",
        "Confirm whether a Berufserlaubnis is possible and what supervision limits apply",
      ],
      checkpoint: "You have a written decision, not only an informal promise from a recruiter or agency.",
    },
    {
      number: 5,
      title: "Pass the Fachsprachprüfung and, if required, the Kenntnisprüfung",
      timeframe: "Only the exams that apply",
      body: "The Fachsprachprüfung is the medical-language gateway. The Kenntnisprüfung is a clinical-practical knowledge test; the Marburger Bund describes a focus on internal medicine and surgery, with possible questions from emergency medicine, pharmacology, imaging, radiation protection, and professional law.",
      actions: [
        "Confirm the examination provider, fee, format, waiting time, and retake rule",
        "Prepare clinical cases in German, including patient presentation and documentation",
        "Use a structured plan for internal medicine, surgery, emergency care, pharmacology, imaging, and legal basics",
      ],
      checkpoint: "You hold the exam results required by your authority for the licence decision.",
    },
    {
      number: 6,
      title: "Secure a paid Assistenzarzt position",
      timeframe: "Can overlap with recognition",
      body: "Specialty training is generally employment-based. Apply directly to hospitals and departments, especially where vacancies exist. A job offer does not itself replace Approbation or a permitted temporary licence.",
      actions: [
        "Search hospital career pages, the Federal Employment Agency, and medical job boards",
        "Ask whether the department is authorised for the specialty-training rotations you need",
        "Compare supervision, teaching, rota, housing, location, salary, and licence conditions",
      ],
      checkpoint: "Your written offer states the role, department, salary, hours, start date, supervision, and licence condition.",
    },
    {
      number: 7,
      title: "Build specialty training and document every rotation",
      timeframe: "During residency",
      body: "Once permitted to work, register where required with the relevant State Chamber and maintain a training log. Changing specialty or department can be possible, but the chamber decides how previous rotations and competencies count toward the new training pathway.",
      actions: [
        "Keep a log of procedures, rotations, certificates, evaluations, and training discussions",
        "Ask the chamber in writing before assuming a rotation will transfer",
        "Use annual reviews to plan the next department or specialty step",
      ],
      checkpoint: "Your training record, licence, contract, and chamber requirements all point in the same direction.",
    },
  ] satisfies GermanyStage[],
  costItems: [
    {
      item: "German language study and B2 exam",
      amount: "€1,200–€4,500",
      note: "Planning range for a B2 course, exam, books, and preparation; provider, hours, and starting level change the total.",
    },
    {
      item: "Fachsprachprüfung / C1 Medizin",
      amount: "€350–€650",
      note: "Typical Fachsprachprüfung range; the responsible chamber or authority sets the actual fee and retakes are separate.",
    },
    {
      item: "Recognition / Approbation application",
      amount: "€200–€600",
      note: "Official Hesse guidance lists €200–€600 for issuing the licence, with an additional €150–€350 possible for the professional licence; other Länder differ.",
    },
    {
      item: "Translations, certifications, and legalisation",
      amount: "€500–€2,000",
      note: "Planning range for authorised translations, certified copies, apostilles, and document verification; page count and country of origin matter.",
    },
    {
      item: "Kenntnisprüfung and preparation",
      amount: "€390–€1,100",
      note: "Planning range for the Kenntnisprüfung fee; preparation, travel, and any permitted retake are separate.",
    },
    {
      item: "Visa and relocation buffer",
      amount: "€75 + €2,000–€6,000",
      note: "€75 is the typical national visa fee; add a relocation buffer for travel, deposit, insurance, and living costs before payroll begins.",
    },
  ] satisfies GermanyCostItem[],
  salaryBands: [
    {
      role: "Assistenzarzt / resident physician",
      monthly: "€5,722.05–€7,355.29 gross",
      annual: "About €68.7k–€88.3k gross",
      note: "Marburger Bund communal-hospital figures from 1 June 2026, first through sixth year of professional experience; 40 hours/week, with on-call and overtime paid extra.",
    },
    {
      role: "Facharzt / specialist",
      monthly: "€7,552.19–€9,698.91 gross",
      annual: "About €90.6k–€116.4k gross",
      note: "Marburger Bund communal-hospital figures from 1 June 2026, first year through thirteenth year and beyond; employer and collective agreement matter.",
    },
    {
      role: "Illustrative first-year take-home",
      monthly: "About €3,492 net",
      annual: "About €41.9k net",
      note: "Illustration for €5,722.05 gross/month using tax class I, no children, no church tax, statutory insurance, and an unspecified state. Your result can be materially different.",
    },
  ] satisfies GermanySalaryBand[],
  specialtyGroups: [
    {
      title: "Often more vacancy-driven",
      body: "These fields can offer more openings in regional hospitals or less popular locations, but no specialty is guaranteed and German communication remains essential.",
      specialties: [
        "General practice / Allgemeinmedizin",
        "Internal medicine",
        "Psychiatry and psychotherapy",
        "Anesthesiology",
        "General and visceral surgery",
        "Orthopedics and trauma surgery",
      ],
      tone: "accessible",
    },
    {
      title: "Usually more competitive or location-sensitive",
      body: "Fewer training places, high applicant interest, and concentration in large cities can make these routes harder. A strong CV, excellent German, relevant experience, and geographic flexibility still matter.",
      specialties: [
        "Dermatology",
        "Ophthalmology",
        "Plastic surgery",
        "Radiology",
        "Pediatrics in popular cities",
        "Highly selective university positions",
      ],
      tone: "competitive",
    },
  ] satisfies GermanySpecialtyGroup[],
  lifeCards: [
    {
      title: "Work-life balance",
      body: "Tariff contracts can provide defined working-time rules, leave, and social protection, but hospital medicine still includes nights, weekends, on-call duty, documentation, and occasional overtime. Ask for the actual rota before signing.",
      icon: "clock",
    },
    {
      title: "Before and after tax",
      body: "Gross salary is only the headline. Income tax, pension, unemployment, health insurance, long-term-care insurance, church tax, tax class, family status, and state-specific details shape take-home pay.",
      icon: "wallet",
    },
    {
      title: "Specialty mobility",
      body: "Changing specialty during training can be possible and is a real advantage compared with more rigid systems. Previous time is not automatically transferable: ask the State Chamber how each rotation will be credited before you move.",
      icon: "map",
    },
    {
      title: "Citizenship and passport timeline",
      body: "The general route is naturalisation after more than 5 years of legal residence, if you have a qualifying residence status, can support yourself, meet the B1 German and naturalisation-test requirements, and satisfy the other legal conditions. Study residence alone is not sufficient. After naturalisation, apply separately for a German passport through the responsible passport authority in Germany or the German mission abroad. A medical residency, work visa, or EU Blue Card alone does not give citizenship or a passport.",
      icon: "flag",
    },
  ] satisfies GermanyLifeCard[],
  visaTypes: [
    {
      title: "Skilled-worker work visa",
      body: "Once you have a qualifying job and the relevant professional permission, the standard skilled-worker route can support employment in Germany. A residence title does not replace Approbation or a permitted Berufserlaubnis for clinical practice.",
      icon: "briefcase",
    },
    {
      title: "EU Blue Card",
      body: "Medical doctors are listed as a shortage occupation on the official 2026 page. The page lists a €45,934.20 gross annual threshold for shortage occupations, a job offer of at least six months, and a licence to practise in place or in prospect; check the current threshold before applying.",
      icon: "flag",
    },
    {
      title: "Recognition visa",
      body: "If your qualification is partially recognised and you need a qualification measure, Section 16d can support entry for the recognition process. The official page describes a usual German A2 requirement, up to 24 months with a possible 12-month extension, and limited work rules.",
      icon: "file",
    },
    {
      title: "Job-search or recognition-partnership routes",
      body: "Opportunity Card and recognition-partnership options may be relevant in some cases, but they are not a medical licence. Check whether your nationality, qualification, job offer, language, livelihood evidence, and regulated-profession conditions fit the route.",
      icon: "plane",
    },
  ] satisfies GermanyVisaType[],
  advantages: [
    "High demand can create openings for internationally trained doctors, particularly outside the most competitive cities",
    "Paid, employment-based specialty training rather than an unpaid residency model",
    "No single national match for every specialty: direct hospital applications can create more than one route into training",
    "Changing specialty during training can be possible when the State Chamber credits the relevant previous rotations",
    "Strong social insurance, public infrastructure, and long-term European career options",
  ],
  disadvantages: [
    "Bureaucracy is a genuine part of the pathway: translations, certifications, state authorities, exams, and follow-up requests can take time",
    "German is essential for safe clinical work; English alone is not enough for patient-facing practice",
    "Recognition, exam scheduling, fees, and temporary-licence conditions differ between federal states",
    "Dermatology, ophthalmology, plastic surgery, radiology, and popular university posts can be competitive",
    "Large cities can be expensive and housing can be difficult, while regional jobs may require more geographic flexibility",
  ],
  hospitals: [
    {
      state: "Baden-Württemberg",
      name: "Heidelberg University Hospital",
      image: "/assets/germany/hospitals/heidelberg-university-hospital-building.jpg",
      city: "Heidelberg",
      body: "A major university medical center with broad clinical, research, and teaching activity.",
      url: "https://www.klinikum.uni-heidelberg.de/en/",
    },
    {
      state: "Bavaria",
      name: "LMU Klinikum",
      image: "/assets/germany/hospitals/lmu-klinikum.jpg",
      city: "Munich",
      body: "One of Germany's large university hospital systems, with extensive tertiary and academic departments.",
      url: "https://www.lmu-klinikum.de/",
    },
    {
      state: "Berlin",
      name: "Charité – Universitätsmedizin Berlin",
      image: "/assets/germany/hospitals/charite-berlin-building.jpg",
      city: "Berlin",
      body: "A nationally prominent university medical center with many specialties and research programs.",
      url: "https://www.charite.de/en/",
    },
    {
      state: "Bremen",
      name: "Klinikum Bremen-Mitte",
      image: "/assets/germany/hospitals/klinikum-bremen-mitte.jpg",
      city: "Bremen",
      body: "A large municipal hospital with specialist departments and a central role in Bremen's hospital network.",
      url: "https://www.gesundheitnord.de/klinikum-bremen-mitte.html",
    },
    {
      state: "Hamburg",
      name: "University Medical Center Hamburg-Eppendorf (UKE)",
      image: "/assets/germany/hospitals/uke-hamburg.jpg",
      city: "Hamburg",
      body: "A leading university medical center combining tertiary care, research, and medical education.",
      url: "https://www.uke.de/english/",
    },
    {
      state: "Brandenburg",
      name: "University Hospital Brandenburg",
      image: "/assets/germany/hospitals/university-hospital-brandenburg.jpg",
      city: "Brandenburg an der Havel",
      body: "A university hospital and teaching environment serving the Brandenburg region.",
      url: "https://www.uk-brandenburg.de/",
    },
    {
      state: "Hesse",
      name: "University Hospital Frankfurt",
      image: "/assets/germany/hospitals/university-hospital-frankfurt.jpg",
      city: "Frankfurt am Main",
      body: "A broad university hospital connected to Goethe University and a major regional referral center.",
      url: "https://www.kgu.de/en/",
    },
    {
      state: "Saxony-Anhalt",
      name: "University Hospital Halle (Saale)",
      image: "/assets/germany/hospitals/university-hospital-halle.jpg",
      city: "Halle (Saale)",
      body: "A university hospital providing specialist care, medical education, and research in central Germany.",
      url: "https://www.umh.de/en/",
    },
    {
      state: "Saarland",
      name: "Saarland University Medical Center",
      image: "/assets/germany/hospitals/saarland-university-medical-center.jpg",
      city: "Homburg",
      body: "A major university hospital and teaching center for the Saarland region.",
      url: "https://www.uniklinikum-saarland.de/en/",
    },
  ] satisfies GermanyHospital[],
  sources: [
    {
      label: "Recognition in Germany — Doctor of medicine",
      url: "https://www.anerkennung-in-deutschland.de/html/en/2688.php",
    },
    {
      label: "German Medical Association — recognition of training",
      url: "https://www.bundesaerztekammer.de/en/work-and-training-in-germany/recognition",
    },
    {
      label: "Marburger Bund — foreign-trained physician FAQs",
      url: "https://www.marburger-bund.de/bundesverband/service/aerztinnen-und-aerzte-mit-auslaendischer-qualifikation/foreign-trained/faqs-0",
    },
    {
      label: "Berlin Service Portal — third-country Approbation example",
      url: "https://service.berlin.de/dienstleistung/331391/en/",
    },
    {
      label: "Make it in Germany — EU Blue Card",
      url: "https://www.make-it-in-germany.com/en/visa-residence/types/eu-blue-card",
    },
    {
      label: "Make it in Germany — recognition visa",
      url: "https://www.make-it-in-germany.com/en/visa-residence/types/recognition",
    },
    {
      label: "Marburger Bund — collective agreements",
      url: "https://www.marburger-bund.de/bundesverband/tarifvertraege",
    },
    {
      label: "German gross/net calculator reference",
      url: "https://www.bbx.de/grossnet-wage-calculator-germany/",
    },
    {
      label: "German naturalisation requirements",
      url: "https://www.make-it-in-germany.com/en/visa-residence/living-permanently/naturalisation",
    },
    {
      label: "German passport information",
      url: "https://www.auswaertiges-amt.de/en/visa-service/buergerservice/faq/606854-606854",
    },
  ],
} as const;
