from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont

root = Path('/home/ubuntu/Medweg/client/public/assets/germany/hospitals')
out = Path('/home/ubuntu/Medweg/tmp/germany-hospital-contact-sheet.jpg')
out.parent.mkdir(parents=True, exist_ok=True)
files = sorted(p for p in root.iterdir() if p.suffix.lower() in {'.jpg', '.jpeg', '.png', '.webp'})
thumb_w, thumb_h = 360, 230
label_h = 44
cols = 3
rows = (len(files) + cols - 1) // cols
sheet = Image.new('RGB', (cols * thumb_w, rows * (thumb_h + label_h)), 'white')
draw = ImageDraw.Draw(sheet)
for i, path in enumerate(files):
    try:
        im = Image.open(path).convert('RGB')
        im = ImageOps.fit(im, (thumb_w, thumb_h), method=Image.Resampling.LANCZOS)
    except Exception:
        im = Image.new('RGB', (thumb_w, thumb_h), '#dddddd')
    x = (i % cols) * thumb_w
    y = (i // cols) * (thumb_h + label_h)
    sheet.paste(im, (x, y))
    draw.rectangle((x, y + thumb_h, x + thumb_w, y + thumb_h + label_h), fill='#17324d')
    draw.text((x + 8, y + thumb_h + 8), path.name, fill='white')
sheet.save(out, quality=90)
print(out)
print('\n'.join(p.name for p in files))
