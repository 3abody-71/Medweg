import type { LucideIcon } from "lucide-react";

export type UsaIconName =
  | "alert"
  | "award"
  | "book"
  | "briefcase"
  | "check"
  | "clock"
  | "dollar"
  | "file"
  | "flag"
  | "globe"
  | "graduation"
  | "heart"
  | "home"
  | "hospital"
  | "map"
  | "plane"
  | "scale"
  | "shield"
  | "stethoscope"
  | "star"
  | "users"
  | "wallet";

export type UsaReason = { title: string; body: string; icon: UsaIconName };
export type UsaRequirement = { title: string; body: string; details: string[]; icon: UsaIconName };
export type UsaApplicationRequirement = { number: number; title: string; body: string; icon: UsaIconName };
export type UsaStage = { number: number; title: string; body: string };
export type UsaExamDetail = {
  title: string;
  badge: string;
  result: string;
  body: string;
  subjects: string[];
  image?: string;
  imageAlt?: string;
  source: { label: string; url: string };
};
export type UsaSalaryBand = { role: string; typical: string; note: string };
export type UsaSpecialtyGroup = { title: string; body: string; specialties: string[]; tone: "hard" | "easier" };
export type UsaCostItem = { item: string; amount: string; note: string; optional?: boolean };
export type UsaVisaType = { title: string; body: string; icon: UsaIconName };
export type UsaHospital = { name: string; city: string; body: string; image: string; url: string };

const image = (name: string) => `/assets/usa/${name}`;

export const usaPathway = {
  reasons: [
    { title: "High salaries", body: "The USA offers some of the highest physician salaries in the world, especially after residency.", icon: "dollar" },
    { title: "Advanced medicine", body: "Many hospitals use leading medical technology, tools, and treatments.", icon: "hospital" },
    { title: "Residency and research", body: "Powerful residency programs, research opportunities, and experienced doctors are available across the country.", icon: "graduation" },
    { title: "Trusted reputation", body: "U.S. medical training and institutions have a strong global reputation.", icon: "globe" },
    { title: "A lot of opportunity", body: "The USA is a large country with many jobs, specialties, cities, and career opportunities.", icon: "briefcase" },
    { title: "Build a life and wealth", body: "It is one of the countries many physicians choose for living, working, and building wealth.", icon: "home" },
  ] satisfies UsaReason[],
  requirements: [
    {
      title: "IMG eligibility and documents",
      body: "Start by confirming that your medical school is eligible for the ECFMG pathway and prepare your documents early.",
      details: [
        "Medical degree from an eligible school listed in the World Directory of Medical Schools.",
        "MyIntealth account, identity documents, diploma, transcript, and primary-source verification.",
        "A realistic plan for exam fees, applications, travel, clinical experience, visa, and living costs.",
      ],
      icon: "file",
    },
    {
      title: "USMLE Step 1, Step 2 CK, and Step 3",
      body: "International medical students may take Step 1 and Step 2 CK before graduation when they meet the current ECFMG/USMLE eligibility rules. Graduation is not a universal prerequisite for these two exams.",
      details: [
        "At application and on exam day, you must be officially enrolled in an eligible international medical school or be a qualifying graduate.",
        "The school must be listed in the World Directory of Medical Schools as meeting ECFMG eligibility requirements, and the school may need to confirm enrollment and completion of the basic medical science component.",
        "Step 1 is reported as pass or fail; Step 2 CK reports a three-digit score.",
        "Step 3 is different: it requires passing Step 1 and Step 2 CK, the relevant degree, ECFMG Certification, and a valid unexpired ECFMG Certificate for eligible IMGs.",
        "Check the current ECFMG Information Booklet, USMLE Bulletin, and registration-entity rules before scheduling.",
      ],
      icon: "check",
    },
    {
      title: "English and communication: OET Medicine",
      body: "OET Medicine is the approved healthcare-English and communication test used for the ECFMG Pathways process.",
      details: [
        "The full test has Listening, Reading, Writing, and Speaking sub-tests.",
        "Give ECFMG permission to access your OET results through your OET account.",
        "Confirm the score and validity rules for your certification year.",
      ],
      icon: "globe",
    },
  ] satisfies UsaRequirement[],
  applicationRequirements: [
    { number: 1, title: "Electives and U.S. clinical experience", body: "Helpful exposure to the U.S. clinical environment when available and permitted.", icon: "stethoscope" },
    { number: 2, title: "Observerships", body: "A way to learn the system and build professional relationships; policies vary by institution.", icon: "hospital" },
    { number: 3, title: "Recommendation letters and research", body: "Strong specialty-relevant letters plus research, publications, or scholarly work can strengthen an application.", icon: "award" },
    { number: 4, title: "Interviews and Match readiness", body: "Prepare for program interviews, rank programs carefully, and meet ERAS and NRMP deadlines.", icon: "users" },
  ] satisfies UsaApplicationRequirement[],
  examDetails: [
    {
      title: "USMLE Step 1",
      badge: "Basic sciences",
      result: "Pass / Fail",
      body: "Step 1 uses integrated multiple-choice questions to test foundational science and its application to disease processes.",
      subjects: ["Pathology and pathophysiology", "Physiology and pharmacology", "Biochemistry, genetics, and immunology", "Microbiology, anatomy, embryology, and behavioral science", "Organ systems, biostatistics, epidemiology, and communication"],
      image: image("step1-content-areas.jpg"),
      imageAlt: "Example USMLE Step 1 content areas report",
      source: { label: "USMLE Step 1 content", url: "https://www.usmle.org/exam-resources/step-1-materials/step-1-content-outline-and-specifications" },
    },
    {
      title: "USMLE Step 2 CK",
      badge: "Clinical knowledge",
      result: "Three-digit score",
      body: "Step 2 CK assesses clinical science and the ability to apply knowledge to patient care under supervision.",
      subjects: ["Medicine", "Pediatrics", "Obstetrics and gynecology", "Psychiatry", "Surgery", "Nutrition, prevention, patient safety, professionalism, and biostatistics"],
      image: image("step2-score-report.jpg"),
      imageAlt: "Example USMLE Step 2 CK score report",
      source: { label: "USMLE Step 2 CK content", url: "https://www.usmle.org/exam-resources/step-2-ck-materials/step-2-ck-content-outline-specifications" },
    },
    {
      title: "USMLE Step 3",
      badge: "Independent practice",
      result: "Three-digit score",
      body: "Step 3 is the final USMLE examination and covers diagnosis, management, prevention, clinical decisions, and computer-based case simulations.",
      subjects: ["Ambulatory, inpatient, and emergency care", "Diagnosis, laboratory studies, prognosis, and management", "Pharmacotherapy and clinical interventions", "Biostatistics, medical literature, communication, and patient safety"],
      image: image("step3-score-report.png"),
      imageAlt: "Example USMLE Step 3 score report",
      source: { label: "USMLE Step 3 content", url: "https://www.usmle.org/exam-resources/step-3-materials/step-3-content-outline-and-specifications" },
    },
  ] satisfies UsaExamDetail[],
  stages: [
    { number: 1, title: "Medical school: build your eligibility foundation", body: "Stay officially enrolled in an eligible international medical school. Confirm that the school meets ECFMG requirements and complete the basic medical science component when required for exam eligibility." },
    { number: 2, title: "Step 1 and Step 2 CK: before or after graduation", body: "Eligible medical students may take Step 1 and Step 2 CK before graduation, or take them after graduation. At the time of application and on exam day, meet the current ECFMG/USMLE rules and complete any school certification required for your eligibility period." },
    { number: 3, title: "After the exams: complete ECFMG certification", body: "After graduation, complete the applicable ECFMG Certification requirements, including credential verification and the communication requirement. Step 3 is a later step with separate eligibility requirements." },
    { number: 4, title: "Build the IMG application", body: "Add suitable U.S. clinical experience where possible, prepare your CV and personal statement, and request strong letters of recommendation." },
    { number: 5, title: "Apply through ERAS and interview", body: "Research IMG-friendly programs, check graduation-year and visa rules, submit through ERAS, and prepare for interviews." },
    { number: 6, title: "Enter the NRMP Match", body: "Register for the Match, rank programs carefully, and complete the visa, medical licensing, and onboarding steps for your program." },
    { number: 7, title: "Residency, fellowship, or attending work", body: "Complete residency, then choose attending practice, fellowship, research, teaching, public health, or another medical career." },
  ] satisfies UsaStage[],
  costItems: [
    { item: "MyIntealth account establishment", amount: "$110", note: "Includes online notarization fee according to ECFMG." },
    { item: "ECFMG Certification application", amount: "$580", note: "Application fee." },
    { item: "Credential verification", amount: "$220", note: "$110 diploma + $110 final transcript." },
    { item: "ECFMG Pathways application", amount: "$945", note: "Pathway fee; requirements depend on the certification year." },
    { item: "USMLE Step 1", amount: "$905", note: "$695 application + $210 international region fee outside the U.S./Canada." },
    { item: "USMLE Step 2 CK", amount: "$930", note: "$695 application + $235 international region fee outside the U.S./Canada." },
    { item: "OET Medicine", amount: "$455", note: "Full OET on computer at a venue or OET@Home in the U.S.; regional prices can vary." },
    { item: "ERAS Token", amount: "$185", note: "ECFMG ERAS token request." },
    { item: "ERAS applications", amount: "$330", note: "Illustration: 30 programs in one specialty during the 2027 ERAS season." },
    { item: "NRMP Main Residency Match", amount: "$85", note: "Standard registration fee, before any late or extra-rank fees." },
    { item: "State medical license application", amount: "$100–$1,000+", note: "Planning range only; the fee depends on the state board, background check, fingerprinting, and document review." },
    { item: "U.S. visa application", amount: "$185", note: "Typical Department of State nonimmigrant visa application fee; reciprocity, issuance, travel, and program costs may be separate." },
  ] satisfies UsaCostItem[],
  optionalCostItems: [
    { item: "USMLE Step 3", amount: "$955", note: "2026–2027 application fee; not required for every applicant at the same stage.", optional: true },
    { item: "J-1 sponsorship and SEVIS", amount: "$590", note: "$370 ECFMG sponsorship application + $220 SEVIS fee; visa fee and travel are separate.", optional: true },
  ] satisfies UsaCostItem[],
  costTotals: { core: "$4,745", expanded: "$6,290" },
  salaryBands: [
    { role: "Resident", typical: "$68k–$94k per year", note: "Typical range changes by program year, hospital, city, benefits, and taxes." },
    { role: "Attending physician", typical: "$239k+ per year", note: "Specialty, location, practice type, workload, taxes, and benefits change the final amount." },
  ] satisfies UsaSalaryBand[],
  specialtyGroups: [
    { title: "Generally more competitive for IMGs", body: "These specialties often have fewer positions and stronger competition. Competitiveness changes by year, program, applicant profile, and location.", specialties: ["Dermatology", "Ophthalmology", "Orthopedic surgery", "Neurosurgery", "Plastic surgery"], tone: "hard" },
    { title: "Often more accessible than the list above", body: "These fields are commonly described as more IMG-accessible, but no specialty is guaranteed and each program has its own criteria.", specialties: ["Internal medicine", "Family medicine", "Pediatrics", "Psychiatry", "Pathology"], tone: "easier" },
  ] satisfies UsaSpecialtyGroup[],
  lifestyleCards: [
    { title: "Work–life balance", body: "Residency is demanding. Later balance depends on specialty, workplace, schedule, location, and your personal priorities.", icon: "clock" as UsaIconName },
    { title: "Opportunities", body: "IMGs can find opportunities in clinical medicine, research, teaching, public health, health technology, and administration.", icon: "briefcase" as UsaIconName },
    { title: "Citizenship and passport timeline", body: "The general route is naturalisation after at least 5 years as a lawful permanent resident. USCIS also requires continuous residence, at least 30 months of physical presence during those 5 years, good moral character, English, civics, and the Oath of Allegiance. After naturalisation, apply separately for a first U.S. passport using Form DS-11 and your Certificate of Naturalization or Citizenship. A residency or work visa alone does not give citizenship or a passport.", icon: "flag" as UsaIconName },
  ],
  visaTypes: [
    { title: "J-1 Exchange Visitor", body: "Common for graduate medical education. ECFMG sponsorship is required for many physician trainees, and a two-year home-country residence rule may apply.", icon: "plane" },
    { title: "H-1B Specialty Occupation", body: "Some programs may sponsor physicians. Eligibility, Step 3, state licensing, employer sponsorship, and program policy must be checked individually.", icon: "briefcase" },
    { title: "B-1/B-2 Visitor", body: "Used for permitted short visits. It is not a residency or employment visa; observership activities must be confirmed with the host institution and consulate.", icon: "globe" },
    { title: "F-1 Student", body: "May apply to formal study programs, but it is not a general substitute for the visa and work authorization required for residency training.", icon: "graduation" },
  ] satisfies UsaVisaType[],
  travelRestriction: {
    updated: "Checked February 2, 2026",
    full: ["Afghanistan", "Burma", "Burkina Faso", "Chad", "Republic of the Congo", "Equatorial Guinea", "Eritrea", "Haiti", "Iran", "Laos", "Libya", "Mali", "Niger", "Sierra Leone", "Somalia", "South Sudan", "Sudan", "Syria", "Yemen"],
    partial: ["Angola", "Antigua and Barbuda", "Benin", "Burundi", "Côte d’Ivoire", "Cuba", "Dominica", "Gabon", "The Gambia", "Malawi", "Mauritania", "Nigeria", "Senegal", "Tanzania", "Togo", "Tonga", "Turkmenistan", "Venezuela", "Zambia", "Zimbabwe"],
    note: "The U.S. Department of State describes full or partial visa-issuance and entry suspensions under Presidential Proclamation 10998. This is not a simple permanent blacklist: the rules depend on nationality, visa category, timing, valid visas, dual nationality, lawful permanent residence, exceptions, and possible case-by-case waivers. Check the official notice and the relevant U.S. embassy before planning travel.",
    source: { label: "U.S. Department of State visa notice", url: "https://travel.state.gov/content/travel/en/News/visas-news/suspension-of-visa-issuance-to-foreign-nationals-to-protect-the-security-of-the-united-states.html" },
  },
  sources: [
    { label: "ECFMG fees", url: "https://www.ecfmg.org/fees/" },
    { label: "USMLE exam fees", url: "https://www.usmle.org/apply-exams" },
    { label: "USMLE eligibility", url: "https://www.ecfmg.org/certification/eligibility-for-examination.html" },
    { label: "OET for ECFMG", url: "https://oet.com/ecfmg" },
    { label: "2027 ERAS fees", url: "https://students-residents.aamc.org/applying-residencies-eras/publication-chapters/fees-2027-eras-season" },
    { label: "NRMP Match fees", url: "https://www.nrmp.org/intro-to-the-match/match-fees/" },
    { label: "U.S. visa categories", url: "https://travel.state.gov/content/travel/en/us-visas/employment/temporary-worker-visas.html" },
    { label: "USCIS naturalization requirements", url: "https://www.uscis.gov/citizenship/learn-about-citizenship/citizenship-and-naturalization/i-am-a-lawful-permanent-resident-of-5-years" },
    { label: "U.S. passport after naturalization", url: "https://travel.state.gov/en/passports/apply/adults.html" },
  ],
  advantages: [
    "High physician salaries after training.",
    "Advanced technology and large academic hospitals.",
    "Many residency, fellowship, research, and specialty opportunities.",
    "A large country with many cities, communities, and lifestyles.",
    "Strong professional and global reputation.",
  ],
  disadvantages: [
    "The IMG pathway is expensive, competitive, and long.",
    "USMLE exams, applications, travel, and visa steps require planning and money.",
    "Residency can include long hours, night shifts, and pressure.",
    "IMGs may face stronger competition and fewer program options in some specialties.",
    "Housing, healthcare, transport, and childcare can be expensive.",
  ],
  hospitals: [
    { name: "Cleveland Clinic", city: "Cleveland, Ohio", body: "Leading academic medical center and specialty health system.", image: image("cleveland-clinic.jpg"), url: "https://my.clevelandclinic.org/" },
    { name: "Mayo Clinic", city: "Rochester, Minnesota", body: "Well-known for integrated care, education, and research.", image: image("mayo-clinic.jpg"), url: "https://www.mayoclinic.org/" },
    { name: "Johns Hopkins Medicine", city: "Baltimore, Maryland", body: "Major academic medicine and biomedical research network.", image: image("johns-hopkins.jpg"), url: "https://www.hopkinsmedicine.org/" },
    { name: "NewYork-Presbyterian", city: "New York, New York", body: "Large teaching hospital network connected with major universities.", image: image("newyork-presbyterian.jpg"), url: "https://www.nyp.org/" },
    { name: "Massachusetts General Hospital", city: "Boston, Massachusetts", body: "Historic teaching hospital with advanced clinical care and research.", image: image("mass-general.jpeg"), url: "https://www.massgeneral.org/" },
    { name: "UCSF Medical Center", city: "San Francisco, California", body: "Academic medical center with specialist care and research programs.", image: image("ucsf-medical-center.jpg"), url: "https://www.ucsfhealth.org/" },
    { name: "Ronald Reagan UCLA Medical Center", city: "Los Angeles, California", body: "Major university hospital with complex-care services.", image: image("ucla-medical-center.jpg"), url: "https://www.uclahealth.org/hospitals/ronald-reagan" },
    { name: "NYU Langone Health", city: "New York, New York", body: "Academic health system with hospitals, research, and specialty care.", image: image("nyu-langone.jpg"), url: "https://nyulangone.org/" },
    { name: "Stanford Hospital", city: "Palo Alto, California", body: "University hospital known for innovation, technology, and research.", image: image("stanford-hospital.jpg"), url: "https://stanfordhealthcare.org/" },
  ] satisfies UsaHospital[],
} as const;

export type UsaPathway = typeof usaPathway;
export type UsaIconMap = Record<UsaIconName, LucideIcon>;
