from pathlib import Path

root = Path('/home/ubuntu/Medweg')
data = root / 'client/src/data/irelandPathway.ts'
text = data.read_text()
old = '  hospitals: ["Beaumont Hospital — Dublin", "Mater Misericordiae University Hospital — Dublin", "St James’s Hospital — Dublin", "St Vincent’s University Hospital — Dublin", "Tallaght University Hospital — Dublin", "Cork University Hospital — Cork", "University Hospital Galway — Galway", "University Hospital Limerick — Limerick", "University Hospital Waterford — Waterford"],'
new = '''  hospitals: [
    { name: "Beaumont Hospital", location: "Dublin", image: "/assets/ireland/hospitals/beaumont.jpg", source: "Wikimedia Commons / RavensFists (public domain)", sourceUrl: "https://commons.wikimedia.org/wiki/File:Beamont_Hospital_1.jpg" },
    { name: "Mater Misericordiae University Hospital", location: "Dublin", image: "/assets/ireland/hospitals/mater.jpg", source: "Wikimedia Commons / DubhEire (CC0)", sourceUrl: "https://commons.wikimedia.org/wiki/File:Mater_Misericordiae_University_Hospital,_Dublin.JPG" },
    { name: "St James’s Hospital", location: "Dublin", image: "/assets/ireland/hospitals/st-james.jpg", source: "Wikimedia Commons / Darren J. Prior (CC BY-SA 4.0)", sourceUrl: "https://commons.wikimedia.org/wiki/File:St._James%27s_Hospital,_Dublin_(2019).jpg" },
    { name: "St Vincent’s University Hospital", location: "Dublin", image: "/assets/ireland/hospitals/st-vincents.png", source: "Wikimedia Commons / Autarch (CC BY-SA 4.0)", sourceUrl: "https://commons.wikimedia.org/wiki/File:StVincentsUniversityHospitalMainEntranceRotatedCropped.png" },
    { name: "Tallaght University Hospital", location: "Dublin", image: "/assets/ireland/hospitals/tallaght.jpg", source: "Wikimedia Commons / Darren J. Prior (CC BY-SA 4.0)", sourceUrl: "https://commons.wikimedia.org/wiki/File:Tallaght_Hospital_(2019).jpg" },
    { name: "Cork University Hospital", location: "Cork", image: "/assets/ireland/hospitals/cork.jpg", source: "Wikimedia Commons / Ear-phone (CC BY 4.0)", sourceUrl: "https://commons.wikimedia.org/wiki/File:Cork_University_Hospital.jpg" },
    { name: "University Hospital Galway", location: "Galway", image: "/assets/ireland/hospitals/galway.jpg", source: "Wikimedia Commons / Sulmac (public domain)", sourceUrl: "https://commons.wikimedia.org/wiki/File:Galway_University_Hospital.jpg" },
    { name: "University Hospital Limerick", location: "Limerick", image: "/assets/ireland/hospitals/limerick.png", source: "Wikimedia Commons / Ear-phone (CC BY-SA 4.0)", sourceUrl: "https://commons.wikimedia.org/wiki/File:University_Hospital_Limerick.png" },
    { name: "University Hospital Waterford", location: "Waterford", image: "/assets/ireland/hospitals/waterford.jpg", source: "Wikimedia Commons / Darrin Antrobus (CC BY-SA 2.0)", sourceUrl: "https://commons.wikimedia.org/wiki/File:An_entrance_at_Waterford_Regional_Hospital_(geograph_3725280).jpg" },
  ],'''
if old not in text:
    raise SystemExit('hospital data line not found')
data.write_text(text.replace(old, new))

component = root / 'client/src/components/IrelandPathway.tsx'
text = component.read_text()
old_cards = '<div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{irelandPathway.hospitals.map((hospital, i)=><div key={hospital} className="rounded-xl border border-border bg-card p-4 text-sm font-bold shadow-sm"><span className="mr-2 text-primary">{String(i + 1).padStart(2, "0")}</span>{hospital}</div>)}</div>'
new_cards = '''<div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{irelandPathway.hospitals.map((hospital, i)=><article key={hospital.name} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"><img src={assetPath(hospital.image)} alt={`${hospital.name}, ${hospital.location}`} className="h-44 w-full object-cover" loading="lazy" /><div className="p-4"><div className="text-xs font-extrabold uppercase tracking-wider text-primary">{String(i + 1).padStart(2, "0")} · {hospital.location}</div><h3 className="mt-1 text-base font-extrabold">{hospital.name}</h3><a href={hospital.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-[11px] leading-4 text-muted-foreground hover:text-primary hover:underline">Photo: {hospital.source}</a></div></article>)}</div>'''
if old_cards not in text:
    raise SystemExit('hospital cards markup not found')
component.write_text(text.replace(old_cards, new_cards))
