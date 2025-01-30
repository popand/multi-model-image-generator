import { NextResponse } from "next/server";
import Replicate from "replicate";

if (!process.env.REPLICATE_API_TOKEN) {
  throw new Error("Missing REPLICATE_API_TOKEN environment variable");
}

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

type ModelType = 'flux-pro' | 'flux-schnell' | 'ideogram';

interface ModelConfig {
  model: string;
  params: Record<string, any>;
}

const modelConfigs: Record<ModelType, ModelConfig> = {
  'flux-pro': {
    model: "black-forest-labs/flux-1.1-pro",
    params: {
      aspect_ratio: "1:1",
      output_format: "webp",
      output_quality: 80,
      safety_tolerance: 2,
      prompt_upsampling: true
    }
  },
  'flux-schnell': {
    model: "black-forest-labs/flux-schnell",
    params: {
      num_outputs: 1,
      aspect_ratio: "1:1",
      output_format: "webp",
      output_quality: 80,
      go_fast: true
    }
  },
  'ideogram': {
    model: "ideogram-ai/ideogram-v2",
    params: {
      resolution: "None",
      style_type: "None",
      aspect_ratio: "1:1",
      magic_prompt_option: "Auto"
    }
  }
};

export async function POST(request: Request) {
  try {
    const { prompt, model = 'flux-pro' } = await request.json();
    console.log('Received prompt:', prompt, 'for model:', model);

    const config = modelConfigs[model as ModelType];
    if (!config) {
      throw new Error('Invalid model selected');
    }

    const output = await replicate.run(
      config.model,
      {
        input: {
          prompt,
          ...config.params
        },
      }
    );

    console.log('Replicate API response:', output);

    // Handle both array and string responses
    const imageUrl = Array.isArray(output) ? output[0] : output;
    
    if (!imageUrl || typeof imageUrl !== 'string' || !imageUrl.startsWith('http')) {
      console.error('Invalid image URL:', imageUrl);
      throw new Error('Invalid response from Replicate API');
    }

    return NextResponse.json({ output: [imageUrl] }, { status: 200 });
  } catch (error) {
    console.error("Error from Replicate API:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
