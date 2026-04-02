import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route: /api/image?context=hero-morning
 *
 * In production: calls Automatic1111/ComfyUI on Jetson via Tailscale
 * Returns a pre-generated image from the pool, or triggers generation.
 *
 * Architecture:
 * 1. Check local cache (fs or Redis)
 * 2. If cache hit → return cached image path
 * 3. If cache miss → select from pre-generated pool
 * 4. Background job: refill pool if below threshold
 */

const SD_API_URL = process.env.SD_API_URL || 'http://jetson.tailscale:7860';

// Prompt templates per context
const PROMPTS: Record<string, string> = {
  'hero-morning':
    'minimalist dental clinic interior, warm morning sunlight through panoramic windows, oak wood slat walls, micro-cement floor, single dental chair, cinematic soft lighting, shallow depth of field, wabi-sabi aesthetic, 8k, architectural photography',
  'hero-day':
    'bright modern dental clinic, clean white surfaces, precision dental equipment, natural daylight, minimalist scandinavian design, micro-cement and oak, architectural digest style, 8k',
  'hero-evening':
    'dental clinic at golden hour, warm ambient lighting, oak panels glowing, modern equipment silhouettes, intimate atmosphere, cinematic, shallow DOF, 8k',
  'hero-night':
    'empty dental clinic at night, blue moonlight through glass, ambient monitor glow, peaceful silence, minimalist interior, cinematic noir, 8k',
};

const NEGATIVE_PROMPT =
  'cartoon, anime, illustration, painting, low quality, blurry, text, watermark, people, patients, blood, graphic medical, stock photo look';

export async function GET(request: NextRequest) {
  const context = request.nextUrl.searchParams.get('context') || 'hero-day';

  // For prototype: return placeholder
  // In production: check cache → return from pool → trigger generation
  return NextResponse.json({
    context,
    image: `/gen/${context}-placeholder.webp`,
    generated: false,
    prompt: PROMPTS[context] || PROMPTS['hero-day'],
    note: 'Prototype mode. In production, this returns a real SD-generated image.',
  });
}

// POST: Force-generate a new image (admin/cron use)
export async function POST(request: NextRequest) {
  const { context } = await request.json();
  const prompt = PROMPTS[context];

  if (!prompt) {
    return NextResponse.json({ error: 'Unknown context' }, { status: 400 });
  }

  try {
    const response = await fetch(`${SD_API_URL}/sdapi/v1/txt2img`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        negative_prompt: NEGATIVE_PROMPT,
        width: 1920,
        height: 1080,
        steps: 30,
        cfg_scale: 7,
        sampler_name: 'DPM++ 2M Karras',
      }),
    });

    const data = await response.json();

    // data.images[0] is base64 — save to public/gen/ and return path
    return NextResponse.json({
      context,
      generated: true,
      // In production: save to fs, return public path
      note: 'Image generated successfully',
    });
  } catch {
    return NextResponse.json(
      { error: 'SD API unavailable', fallback: `/gen/${context}-placeholder.webp` },
      { status: 503 }
    );
  }
}
