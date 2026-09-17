export type AustraliaHospital = {
  state: string;
  city: string;
  name: string;
  image: string;
  body: string;
  url: string;
  photoCredit: string;
};

export const australiaPathway = {
  reasons: [
    { title: "English-speaking practice", body: "Clinical communication, teaching, and most postgraduate resources are delivered in English.", icon: "language" },
    { title: "Strong health system", body: "Public hospitals, academic networks, and specialist colleges provide structured training environments.", icon: "building" },
    { title: "Clear registration stages", body: "The AMC, Ahpra, and Medical Board of Australia publish a recognisable sequence for many IMGs.", icon: "route" },
    { title: "Regional opportunity", body: "Regional and rural services may offer different employment and supervision opportunities from the largest cities.", icon: "map" },
    { title: "Lifestyle and stability", body: "Australia combines high clinical standards with a strong quality-of-life proposition, though costs vary by city.", icon: "home" },
  ],
  requirements: [
    { title: "English evidence", body: "Meet the Medical Board of Australia’s current English language standard through an accepted pathway such as IELTS, OET, PTE Academic, or TOEFL iBT." },
    { title: "Primary-source verification", body: "Create an AMC portfolio and have your identity, degree, internship, and professional history verified through the required channels." },
    { title: "Assessment route", body: "Choose the pathway that fits your training: Standard pathway, Competent Authority pathway, or a specialist pathway through the relevant college." },
  ],
  stages: [
    { number: 1, title: "Choose your pathway", timeframe: "Planning", body: "Start with the Medical Board of Australia and AMC eligibility rules. Your degree, internship, registration history, and recognised examinations determine which route may apply.", actions: ["Review AMC pathways", "Check internship acceptability", "Map your target state and role"], checkpoint: "Do not book an exam until you know which registration pathway you are eligible for." },
    { number: 2, title: "Build your AMC portfolio", timeframe: "1–3 months", body: "Create your portfolio, submit primary-source verification, and prepare the identity and professional documents requested for your application.", actions: ["Verify your medical degree", "Prepare certificates of good standing", "Organise translations"], checkpoint: "Keep every document name and date consistent across your portfolio." },
    { number: 3, title: "Meet the English standard", timeframe: "Variable", body: "Complete an accepted English language test or confirm whether another approved evidence pathway applies to your circumstances.", actions: ["Compare accepted tests", "Check validity periods", "Plan for clinical communication"], checkpoint: "Use the current Medical Board standard rather than an older forum checklist." },
    { number: 4, title: "Complete the assessment", timeframe: "Variable", body: "Many IMGs use the AMC CAT MCQ and, where required, the AMC clinical examination. Other applicants may qualify through a Competent Authority or specialist route.", actions: ["Prepare for AMC CAT MCQ", "Review clinical assessment rules", "Track exam validity"], checkpoint: "Your assessment route is not the same as a guarantee of a job or registration." },
    { number: 5, title: "Secure supervised work", timeframe: "Variable", body: "Apply for an appropriate Australian hospital role and make sure the position, supervision plan, and registration type align with Medical Board requirements.", actions: ["Target accredited services", "Ask about supervision", "Compare metro and regional roles"], checkpoint: "Confirm the role’s registration and supervision arrangements in writing." },
    { number: 6, title: "Apply for registration", timeframe: "After eligibility", body: "Apply for the appropriate form of registration with Ahpra and the Medical Board of Australia. Depending on your circumstances, this may initially be provisional or limited registration.", actions: ["Submit Ahpra application", "Provide certificates and checks", "Answer registration queries"], checkpoint: "Registration and immigration permission are separate processes." },
    { number: 7, title: "Progress to general registration", timeframe: "Supervised period", body: "Work under supervision, satisfy the requirements for progressing toward general registration, and maintain your professional obligations and documentation.", actions: ["Complete supervised practice", "Meet workplace reports", "Maintain good standing"], checkpoint: "Once the Medical Board’s requirements are met, you can progress to general registration." },
    { number: 8, title: "Enter specialty training", timeframe: "Competitive", body: "After hospital experience and general registration, apply to the relevant specialty training program. College requirements differ substantially by specialty.", actions: ["Build Australian references", "Complete college prerequisites", "Track annual recruitment"], checkpoint: "Getting into Australia and getting into your desired specialty are different problems." },
  ],
  specialtyNotes: [
    ["Highly competitive", "Orthopaedic surgery, ophthalmology, dermatology, neurosurgery, plastic and reconstructive surgery, ENT, general surgery, and cardiothoracic surgery can have limited places and strong competition."],
    ["Different opportunities", "General practice, psychiatry, emergency medicine, internal medicine-related specialties, anaesthesia, and rural medicine may offer different opportunities depending on state, location, registration, and applicant profile."],
    ["Specialist pathway", "Already-qualified specialists may undergo college assessment, comparability assessment, supervised practice or additional training, and specialist registration."],
  ],
  advantages: [
    "English-speaking clinical environment and widely used postgraduate resources",
    "Strong public hospitals, academic centres, and specialist college training",
    "Multiple IMG routes, including standard, competent authority, and specialist pathways",
    "Potential opportunities in regional and rural services beyond the largest metropolitan markets",
    "High quality of life, workplace protections, and a multicultural patient population",
  ],
  disadvantages: [
    "Registration can be lengthy, expensive, and highly dependent on your documents and prior training",
    "Hospital employment and specialty training are competitive, especially in major cities",
    "AMC exams, English testing, verification, travel, and registration create substantial upfront costs",
    "Requirements and recruitment opportunities vary by state, hospital, specialty, and annual workforce needs",
    "Distance from family, high housing costs in major cities, and limited positions in some specialties can affect planning",
  ],
  hospitals: [
    { state: "Victoria", city: "Melbourne", name: "The Royal Melbourne Hospital", image: "/assets/australia/hospitals/royal-melbourne-building-exterior.jpg", body: "A major tertiary and teaching hospital within the Melbourne biomedical precinct, with broad clinical, research, and training activity.", url: "https://www.thermh.org.au/", photoCredit: "The Royal Melbourne Hospital exterior / image search source" },
    { state: "New South Wales", city: "Sydney", name: "Royal Prince Alfred Hospital", image: "/assets/australia/hospitals/royal-prince-alfred.jpg", body: "A large academic hospital in Camperdown linked with the University of Sydney and a broad range of specialist services.", url: "https://www.slhd.nsw.gov.au/rpa/", photoCredit: "JBar / Wikimedia Commons" },
    { state: "Victoria", city: "Melbourne", name: "Austin Hospital", image: "/assets/australia/hospitals/austin-building-exterior.jpg", body: "The Austin Health network provides tertiary care, teaching, and research across Melbourne’s north-east, including specialist services.", url: "https://www.austin.org.au/", photoCredit: "Austin Hospital exterior / image search source" },
    { state: "Victoria", city: "Melbourne", name: "The Alfred", image: "/assets/australia/hospitals/alfred-hospital.jpg", body: "A leading teaching hospital known for trauma, intensive care, emergency medicine, and complex tertiary services.", url: "https://www.alfredhealth.org.au/", photoCredit: "Diliff / Wikimedia Commons" },
    { state: "New South Wales", city: "Sydney", name: "St Vincent’s Hospital Sydney", image: "/assets/australia/hospitals/st-vincents-sydney.jpg", body: "An inner-city teaching hospital with major services in acute care, cardiology, cancer, surgery, and clinical education.", url: "https://www.svhs.org.au/", photoCredit: "Wellcome Collection / Wikimedia Commons" },
    { state: "South Australia", city: "Adelaide", name: "Royal Adelaide Hospital", image: "/assets/australia/hospitals/royal-adelaide.jpg", body: "South Australia’s principal tertiary hospital and a central teaching partner for the University of Adelaide.", url: "https://www.sahealth.sa.gov.au/rah", photoCredit: "Sam Hood / Wikimedia Commons" },
    { state: "Queensland", city: "Brisbane", name: "Royal Brisbane and Women’s Hospital", image: "/assets/australia/hospitals/queensland.jpg", body: "A major Queensland teaching and research hospital serving complex adult and women’s health needs.", url: "https://metronorth.health.qld.gov.au/rbwh", photoCredit: "John Robert McPherson / Wikimedia Commons" },
    { state: "Western Australia", city: "Perth", name: "Sir Charles Gairdner Hospital", image: "/assets/australia/hospitals/perth.jpg", body: "A principal tertiary hospital for Western Australia with strong links to medical education and specialist care.", url: "https://www.scgh.health.wa.gov.au/", photoCredit: "Gnangarra / Wikimedia Commons" },
    { state: "Australian Capital Territory", city: "Canberra", name: "Canberra Hospital", image: "/assets/australia/hospitals/canberra.jpg", body: "The ACT’s major public hospital and a teaching site for a wide range of medical and surgical specialties.", url: "https://www.canberrahealthservices.act.gov.au/health-services/canberra-hospital", photoCredit: "Nick Dowling / Wikimedia Commons" },
  ] satisfies AustraliaHospital[],
};

export const australiaSources = [
  ["Medical Board of Australia — international practitioners", "https://www.medicalboard.gov.au/Registration/International-Medical-Graduates.aspx"],
  ["Australian Medical Council — pathways", "https://www.amc.org.au/assessments/"],
  ["Ahpra — registration", "https://www.ahpra.gov.au/Registration.aspx"],
  ["Medical Board — English language skills", "https://www.medicalboard.gov.au/Registration-Standards/English-language-skills.aspx"],
  ["Australian citizenship", "https://immi.homeaffairs.gov.au/citizenship"],
] as const;
