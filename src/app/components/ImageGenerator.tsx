'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/lib/hooks/useAuth';
import { addDocument } from '@/lib/firebase/firebaseUtils';

type ModelType = 'flux-pro' | 'flux-schnell' | 'ideogram';

const modelInfo = {
  'flux-pro': {
    name: "Flux 1.1 Pro",
    fullName: "black-forest-labs/flux-1.1-pro",
    description: "Professional version with enhanced image quality and excellent prompt adherence.",
    shortDesc: "Best for high-quality, detailed images",
    icon: "✨",
    parameters: {
      aspect_ratio: "1:1",
      output_format: "webp",
      output_quality: 80,
      safety_tolerance: 2,
      prompt_upsampling: true
    }
  },
  'flux-schnell': {
    name: "Flux Schnell",
    fullName: "black-forest-labs/flux-schnell",
    description: "Fast and efficient version of Flux for quick image generation.",
    shortDesc: "Optimized for speed and efficiency",
    icon: "⚡️",
    parameters: {
      num_outputs: 1,
      aspect_ratio: "1:1",
      output_format: "webp",
      output_quality: 80,
      go_fast: true
    }
  },
  'ideogram': {
    name: "Ideogram v2",
    fullName: "ideogram-ai/ideogram-v2",
    description: "Advanced model specializing in illustrations, designs, and text rendering.",
    shortDesc: "Perfect for designs with text elements",
    icon: "🎨",
    parameters: {
      resolution: "None",
      style_type: "None",
      aspect_ratio: "1:1",
      magic_prompt_option: "Auto"
    }
  }
};

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState<ModelType>('flux-pro');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const response = await fetch('/api/replicate/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, model: selectedModel }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image');
      }

      if (!data.output?.[0] || typeof data.output[0] !== 'string' || !data.output[0].startsWith('http')) {
        console.error('Invalid image URL:', data.output);
        throw new Error('Invalid image URL received from API');
      }

      const generatedImageUrl = data.output[0];
      setImageUrl(generatedImageUrl);

      // Save the generated image to Firestore if user is authenticated
      if (user) {
        await addDocument(`users/${user.uid}/images`, {
          imageUrl: generatedImageUrl,
          prompt,
          model: selectedModel,
          createdAt: Date.now(),
        });
      }
    } catch (err) {
      console.error('Error generating image:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate image');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Model Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(Object.keys(modelInfo) as ModelType[]).map((model) => (
          <button
            key={model}
            onClick={() => setSelectedModel(model)}
            className={`group relative overflow-hidden p-6 rounded-2xl transition-all duration-300 ${
              selectedModel === model
                ? 'bg-white shadow-xl ring-2 ring-blue-500 scale-[1.02]'
                : 'bg-white/50 hover:bg-white shadow-lg hover:shadow-xl'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl">{modelInfo[model].icon}</span>
                {selectedModel === model && (
                  <span className="flex items-center text-blue-600 text-sm font-medium">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Selected
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {modelInfo[model].name}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {modelInfo[model].shortDesc}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">
              What would you like to create?
            </label>
            <div className="relative">
              <input
                id="prompt"
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your image in detail..."
                className="w-full p-4 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                required
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                ✨
              </span>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white p-4 rounded-xl font-medium hover:from-blue-700 hover:via-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl disabled:shadow-none"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating your image...
              </span>
            ) : (
              'Generate Image'
            )}
          </button>
        </form>

        {error && (
          <div className="mt-6 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-lg text-center">
            {error}
          </div>
        )}

        {imageUrl && (
          <div className="mt-8 space-y-6">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={imageUrl}
                alt="Generated image"
                fill
                unoptimized
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center px-4 py-2 space-x-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                <span>View Generation Details</span>
              </button>
            </div>
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold text-gray-900">Generation Details</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Model</h4>
                  <p className="mt-2 text-gray-900">{modelInfo[selectedModel].fullName}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Description</h4>
                  <p className="mt-2 text-gray-900">{modelInfo[selectedModel].description}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Parameters</h4>
                  <ul className="mt-2 divide-y divide-gray-100">
                    {Object.entries(modelInfo[selectedModel].parameters).map(([key, value]) => (
                      <li key={key} className="py-2 flex justify-between">
                        <span className="text-gray-600">{key}</span>
                        <span className="text-gray-900">{value.toString()}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Prompt Used</h4>
                  <p className="mt-2 text-gray-900">{prompt}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 