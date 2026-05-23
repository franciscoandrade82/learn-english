import OpenAI from "openai";
import * as fs from "fs";
import * as path from "path";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const BASE_PROMPT = "A simple, colorful children's textbook illustration style. Flat cartoon, clean lines, soft pastel colors, white background, no text, no labels, no shadows, centered, suitable for an educational flashcard for 8-year-old children.";

type ImageRequest = { folder: string; filename: string; prompt: string };

const images: ImageRequest[] = [
  // Clothes
  { folder: "clothes", filename: "t-shirt.png", prompt: "a red T-shirt for kids" },
  { folder: "clothes", filename: "shorts.png", prompt: "a pair of orange shorts" },
  { folder: "clothes", filename: "dress.png", prompt: "a blue summer dress for a girl" },
  { folder: "clothes", filename: "jumper.png", prompt: "a green knitted jumper (sweater)" },
  { folder: "clothes", filename: "coat.png", prompt: "a warm winter coat" },
  { folder: "clothes", filename: "trousers.png", prompt: "a pair of brown trousers (pants)" },
  { folder: "clothes", filename: "jeans.png", prompt: "a pair of blue jeans" },
  { folder: "clothes", filename: "pyjamas.png", prompt: "a set of cozy pyjamas with stars pattern" },
  { folder: "clothes", filename: "tracksuit.png", prompt: "a grey tracksuit (top and bottom together)" },
  { folder: "clothes", filename: "socks.png", prompt: "a pair of colorful striped socks" },
  { folder: "clothes", filename: "skirt.png", prompt: "a yellow skirt for a girl" },
  // Footwear
  { folder: "footwear", filename: "shoes.png", prompt: "a pair of black school shoes" },
  { folder: "footwear", filename: "trainers.png", prompt: "a pair of sporty trainers (sneakers)" },
  { folder: "footwear", filename: "boots.png", prompt: "a pair of brown leather boots" },
  { folder: "footwear", filename: "sandals.png", prompt: "a pair of summer sandals" },
  { folder: "footwear", filename: "flip-flops.png", prompt: "a pair of colorful flip-flops" },
  // Accessories
  { folder: "accessories", filename: "glasses.png", prompt: "a pair of reading glasses" },
  { folder: "accessories", filename: "cap.png", prompt: "a baseball cap" },
  { folder: "accessories", filename: "beanie.png", prompt: "a warm knitted beanie hat" },
  { folder: "accessories", filename: "scarf.png", prompt: "a long striped scarf" },
  { folder: "accessories", filename: "hat.png", prompt: "a sun hat with a wide brim" },
  { folder: "accessories", filename: "belt.png", prompt: "a leather belt with a buckle" },
  { folder: "accessories", filename: "gloves.png", prompt: "a pair of warm winter gloves" },
  { folder: "accessories", filename: "watch.png", prompt: "a wristwatch with a colorful band" },
  // Shapes
  { folder: "shapes", filename: "circle.png", prompt: "a perfect blue circle shape" },
  { folder: "shapes", filename: "square.png", prompt: "a perfect red square shape" },
  { folder: "shapes", filename: "triangle.png", prompt: "a perfect green triangle shape" },
  { folder: "shapes", filename: "rectangle.png", prompt: "a perfect pink rectangle shape" },
  { folder: "shapes", filename: "heart.png", prompt: "a perfect red heart shape" },
  { folder: "shapes", filename: "star.png", prompt: "a perfect yellow star shape" },
  // Transport
  { folder: "transport", filename: "car.png", prompt: "a red family car" },
  { folder: "transport", filename: "bus.png", prompt: "a big yellow school bus" },
  { folder: "transport", filename: "bike.png", prompt: "a bicycle" },
  { folder: "transport", filename: "motorbike.png", prompt: "a motorcycle" },
  { folder: "transport", filename: "train.png", prompt: "a modern passenger train" },
  { folder: "transport", filename: "boat.png", prompt: "a small sailing boat on water" },
  { folder: "transport", filename: "plane.png", prompt: "an airplane flying in the sky" },
  { folder: "transport", filename: "helicopter.png", prompt: "a helicopter" },
  // Playground games
  { folder: "playground", filename: "playing-tag.png", prompt: "children playing tag, one child chasing another" },
  { folder: "playground", filename: "skipping.png", prompt: "a girl skipping with a jump rope" },
  { folder: "playground", filename: "running.png", prompt: "children running together happily" },
  { folder: "playground", filename: "playing-hopscotch.png", prompt: "a child playing hopscotch on numbered squares on the ground" },
  { folder: "playground", filename: "playing-hide-and-seek.png", prompt: "children playing hide and seek, one counting against a tree while others hide" },
  { folder: "playground", filename: "playing-marbles.png", prompt: "children kneeling and playing marbles on the ground" },
  // Sports
  { folder: "sports", filename: "playing-football.png", prompt: "a child playing football (soccer), kicking a ball" },
  { folder: "sports", filename: "playing-basketball.png", prompt: "a child playing basketball, shooting at a hoop" },
  { folder: "sports", filename: "playing-volleyball.png", prompt: "children playing volleyball over a net" },
  { folder: "sports", filename: "playing-badminton.png", prompt: "a child playing badminton with a racket and shuttlecock" },
  { folder: "sports", filename: "playing-handball.png", prompt: "a child playing handball, throwing a ball at a goal" },
  // Seasons
  { folder: "seasons", filename: "spring.png", prompt: "a spring scene with flowers blooming, green trees, butterflies, warm sunshine" },
  { folder: "seasons", filename: "summer.png", prompt: "a summer scene with bright sunshine, beach, ice cream, blue sky" },
  { folder: "seasons", filename: "autumn.png", prompt: "an autumn scene with orange and red falling leaves, trees, windy day" },
  { folder: "seasons", filename: "winter.png", prompt: "a winter scene with snow, snowman, bare trees, cold day" },
  // Mascot
  { folder: "mascot", filename: "happy.png", prompt: "a cute friendly owl mascot character wearing a graduation cap, smiling, celebrating, very happy" },
  { folder: "mascot", filename: "thinking.png", prompt: "a cute friendly owl mascot character wearing a graduation cap, thinking with a finger on chin, curious expression" },
  { folder: "mascot", filename: "waving.png", prompt: "a cute friendly owl mascot character wearing a graduation cap, waving hello, welcoming" },
  { folder: "mascot", filename: "sad.png", prompt: "a cute friendly owl mascot character wearing a graduation cap, slightly sad but encouraging expression, thumbs up" },
];

async function generateImage(req: ImageRequest): Promise<void> {
  const outDir = path.join(process.cwd(), "public", "images", req.folder);
  const outPath = path.join(outDir, req.filename);

  if (fs.existsSync(outPath)) {
    console.log(`SKIP (exists): ${req.folder}/${req.filename}`);
    return;
  }

  fs.mkdirSync(outDir, { recursive: true });
  const fullPrompt = `${BASE_PROMPT} Subject: ${req.prompt}`;
  console.log(`Generating: ${req.folder}/${req.filename}...`);

  try {
    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt: fullPrompt,
      n: 1,
      size: "1024x1024",
      quality: "low",
    });

    const b64 = response.data?.[0]?.b64_json;
    if (b64) {
      fs.writeFileSync(outPath, Buffer.from(b64, "base64"));
    } else {
      const url = response.data?.[0]?.url;
      if (!url) throw new Error("No image data returned");
      const imgResponse = await fetch(url);
      fs.writeFileSync(outPath, Buffer.from(await imgResponse.arrayBuffer()));
    }
    console.log(`  ✓ Saved: ${req.folder}/${req.filename}`);
  } catch (error) {
    console.error(`  ✗ Failed: ${req.folder}/${req.filename}`, error);
  }
}

async function main() {
  console.log(`Generating ${images.length} images...\n`);

  for (let i = 0; i < images.length; i++) {
    await generateImage(images[i]);
    if (i + 1 < images.length) {
      console.log("  (waiting 15s for rate limits...)");
      await new Promise((r) => setTimeout(r, 15000));
    }
  }

  console.log(`\nDone! Generated images are in public/images/`);
}

main();
