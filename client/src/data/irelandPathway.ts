export const irelandPathway = {
  reasons: [
    { title: "English is the working language", body: "Ireland removes the need to learn a new clinical language, although IMGs still need accepted English evidence such as IELTS or OET unless an exemption applies." },
    { title: "A structured postgraduate system", body: "Nationally organised programmes create a defined route from hospital employment into Basic Specialist Training, Higher Specialist Training, and specialty qualification." },
    { title: "A useful Sudanese IMG advantage", body: "Qualifying Sudanese internships can be recognised for the relevant pathway and may provide a PRES exemption. The Medical Council still assesses each application individually." },
    { title: "A clear surgical route", body: "RCSI describes Trauma & Orthopaedic Surgery as ST1–ST8: two years of Core Surgical Training followed by six years of specialty training." },
    { title: "Paid hospital training", body: "Irish postgraduate posts are salaried HSE employment positions. Basic salary scales rise from intern and SHO grades through registrar and specialist registrar roles." },
    { title: "European location", body: "Ireland offers an English-speaking medical system within the European Union, with an international workforce and established teaching hospitals." },
  ],
  requirements: [
    { title: "Medical degree and internship", body: "Your primary medical qualification and internship must be documented and acceptable to the Medical Council of Ireland.", items: ["Primary medical qualification", "Internship certificate and rotation records", "Training dates, hospital information, and clinical rotations", "Professional registration and good standing"] },
    { title: "English language evidence", body: "Plan for the accepted English route rather than assuming an English-taught degree automatically creates an exemption.", items: ["IELTS Academic or OET Medicine where required", "Check the current score and validity rules", "Confirm any exemption directly with the relevant body", "Keep certificates and identity details consistent"] },
    { title: "Registration and PRES", body: "The Medical Council determines the registration route. Some qualifying internships, including recognised Sudanese internships, may support a PRES exemption.", items: ["Primary-source qualification verification", "Medical Council application", "PRES only if required", "Appropriate registration before hospital work"] },
  ],
  stages: [
    { number: 1, title: "Graduate from medical school", timeframe: "Foundation", body: "Prepare an acceptable primary medical qualification and begin collecting the evidence needed for verification and registration.", actions: ["Verify degree details", "Collect certified documents", "Plan the English route"], checkpoint: "Do not leave internship evidence until the registration application." },
    { number: 2, title: "Complete and document your internship", timeframe: "Critical", body: "Internship or house-job evidence is central for many IMGs. Sudan is among the countries listed in relevant guidance for recognised internships, subject to the specified requirements.", actions: ["Keep rotation records", "Document dates and hospitals", "Retain licensing evidence"], checkpoint: "A recognised internship may remove the need for PRES, but never assume automatic registration." },
    { number: 3, title: "Apply to the Irish Medical Council", timeframe: "Registration", body: "Submit your degree, internship, professional registration, good-standing evidence, identity documents, English evidence, and any requested verification.", actions: ["Create the IMC application", "Answer document requests", "Confirm your registration route"], checkpoint: "The Medical Council decides which route and examinations apply to you." },
    { number: 4, title: "Obtain Irish hospital employment", timeframe: "SHO / NCHD", body: "Many IMGs enter through a non-training SHO, registrar, or other NCHD position. This is valuable Irish clinical experience, but it is not the same as a specialist training number.", actions: ["Apply to HSE and hospital posts", "Build Irish references", "Learn local protocols"], checkpoint: "Registration → Irish experience → competitive training application." },
    { number: 5, title: "Build a competitive surgical profile", timeframe: "Before CST", body: "For orthopaedics, develop a surgical CV through experience, audit, research, publications, presentations, teaching, courses, a logbook, references, and MRCS preparation.", actions: ["Document operative exposure", "Complete audit or research", "Prepare for selection"], checkpoint: "A hospital job alone does not guarantee entry to specialist training." },
    { number: 6, title: "Enter Core Surgical Training", timeframe: "ST1–ST2", body: "RCSI’s surgical pathway begins with two years of Core Surgical Training. Selection is competitive and may include aptitude testing and interview stages.", actions: ["Apply through the current RCSI process", "Complete ST1 and ST2", "Develop general surgical skills"], checkpoint: "Progression from ST2 to ST3 involves performance and specialty selection." },
    { number: 7, title: "Pass MRCS", timeframe: "By ST3", body: "The relevant MRCS components are required before progression into the specialty stage. Completion is a key surgical milestone.", actions: ["Plan exam attempts", "Use CST experience", "Meet progression requirements"], checkpoint: "Confirm the current RCSI requirements for your intake." },
    { number: 8, title: "Complete Trauma & Orthopaedic Training", timeframe: "ST3–ST8", body: "Six years of specialty training cover trauma, elective orthopaedics, fracture care, joint replacement, sports conditions, paediatric orthopaedics, spine, and emergency care.", actions: ["Progress through ST3–ST8", "Complete curriculum and assessments", "Build subspecialty exposure"], checkpoint: "Rotations and opportunities depend on the programme and hospital." },
    { number: 9, title: "Complete specialist qualification", timeframe: "CCST", body: "Successful completion of the curriculum, assessments, and fellowship requirements can lead to a Certificate of Completion of Surgical Training and eligibility for specialist registration.", actions: ["Complete exit requirements", "Apply for specialist registration", "Plan consultant or specialist practice"], checkpoint: "The full route is competitive and individual timelines vary." },
  ],
  salaryBands: [
    { role: "Intern", annual: "€47,127", note: "2026 basic annual salary." },
    { role: "Senior House Officer", annual: "€55,292–€75,623", note: "Basic scale; grade and increments matter." },
    { role: "Registrar", annual: "€70,276–€82,756", note: "Basic scale before applicable additional payments." },
    { role: "Specialist Registrar", annual: "€78,786–€98,091", note: "Training salary range in the cited HSE scale." },
    { role: "Senior Registrar", annual: "€83,847–€102,619", note: "Basic salary; on-call and other payments may increase total remuneration." },
  ],
  hospitals: [
    { name: "Beaumont Hospital", location: "Dublin", image: "/assets/ireland/hospitals/beaumont.jpg", source: "Wikimedia Commons / RavensFists (public domain)", sourceUrl: "https://commons.wikimedia.org/wiki/File:Beamont_Hospital_1.jpg" },
    { name: "Mater Misericordiae University Hospital", location: "Dublin", image: "/assets/ireland/hospitals/mater.jpg", source: "Wikimedia Commons / DubhEire (CC0)", sourceUrl: "https://commons.wikimedia.org/wiki/File:Mater_Misericordiae_University_Hospital,_Dublin.JPG" },
    { name: "St James’s Hospital", location: "Dublin", image: "/assets/ireland/hospitals/st-james.jpg", source: "Wikimedia Commons / Darren J. Prior (CC BY-SA 4.0)", sourceUrl: "https://commons.wikimedia.org/wiki/File:St._James%27s_Hospital,_Dublin_(2019).jpg" },
    { name: "St Vincent’s University Hospital", location: "Dublin", image: "/assets/ireland/hospitals/st-vincents.png", source: "Wikimedia Commons / Autarch (CC BY-SA 4.0)", sourceUrl: "https://commons.wikimedia.org/wiki/File:StVincentsUniversityHospitalMainEntranceRotatedCropped.png" },
    { name: "Tallaght University Hospital", location: "Dublin", image: "/assets/ireland/hospitals/tallaght.jpg", source: "Wikimedia Commons / Darren J. Prior (CC BY-SA 4.0)", sourceUrl: "https://commons.wikimedia.org/wiki/File:Tallaght_Hospital_(2019).jpg" },
    { name: "Cork University Hospital", location: "Cork", image: "/assets/ireland/hospitals/cork.jpg", source: "Wikimedia Commons / Ear-phone (CC BY 4.0)", sourceUrl: "https://commons.wikimedia.org/wiki/File:Cork_University_Hospital.jpg" },
    { name: "University Hospital Galway", location: "Galway", image: "/assets/ireland/hospitals/galway.jpg", source: "Wikimedia Commons / Sulmac (public domain)", sourceUrl: "https://commons.wikimedia.org/wiki/File:Galway_University_Hospital.jpg" },
    { name: "University Hospital Limerick", location: "Limerick", image: "/assets/ireland/hospitals/limerick.png", source: "Wikimedia Commons / Ear-phone (CC BY-SA 4.0)", sourceUrl: "https://commons.wikimedia.org/wiki/File:University_Hospital_Limerick.png" },
    { name: "University Hospital Waterford", location: "Waterford", image: "/assets/ireland/hospitals/waterford.jpg", source: "Wikimedia Commons / Darrin Antrobus (CC BY-SA 2.0)", sourceUrl: "https://commons.wikimedia.org/wiki/File:An_entrance_at_Waterford_Regional_Hospital_(geograph_3725280).jpg" },
  ],
  sources: [
    ["Medical Council of Ireland", "https://www.medicalcouncil.ie/"],
    ["RCSI Trauma & Orthopaedic Surgery", "https://www.rcsi.com/dublin/about/faculty-of-surgery/training/surgery/trauma-and-orthopaedic-surgery"],
    ["HSE careers and salary scales", "https://www.hse.ie/eng/staff/jobs/"],
    ["Irish immigration service", "https://www.irishimmigration.ie/"],
  ],
};

export type IrelandStage = (typeof irelandPathway.stages)[number];
