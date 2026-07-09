import sharp from "sharp";

const width = 1200;
const height = 630;

const bg = await sharp({
  create: {
    width,
    height,
    channels: 4,
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  },
})
  .png()
  .toBuffer();

const logo = await sharp("public/logo-orbyts.png")
  .resize(680, null, { fit: "inside" })
  .png()
  .toBuffer();

const logoMeta = await sharp(logo).metadata();

const accent = Buffer.from(
  `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="g" cx="85%" cy="15%" r="55%">
        <stop offset="0%" stop-color="#339A62" stop-opacity="0.12"/>
        <stop offset="100%" stop-color="#339A62" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <rect x="0" y="620" width="1200" height="10" fill="#339A62"/>
  </svg>`,
);

const left = Math.round((width - (logoMeta.width ?? 0)) / 2);
const top = Math.round((height - (logoMeta.height ?? 0)) / 2);

await sharp(bg)
  .composite([
    { input: accent, top: 0, left: 0 },
    { input: logo, top, left },
  ])
  .png()
  .toFile("public/og-image.png");

console.log("Generated public/og-image.png");
