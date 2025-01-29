# Img Cursor - AI Image Generator

A modern web application that allows users to generate and save AI-powered images using multiple state-of-the-art models. Built with Next.js 14, Firebase, and Replicate API.

## Features

- 🎨 Multiple AI Models:
  - Flux 1.1 Pro: High-quality, detailed images
  - Flux Schnell: Fast and efficient generation
  - Ideogram v2: Specialized in illustrations and text rendering

- 🔐 Authentication:
  - Google Sign-in integration
  - Protected routes and features
  - Secure user sessions

- 💾 Image Management:
  - Automatic saving of generated images
  - Personal image gallery
  - Image metadata tracking (model used, prompt, date)

- 🎯 User Experience:
  - Responsive design
  - Real-time generation status
  - Detailed generation information
  - Modern, intuitive interface

## Tech Stack

- **Frontend:**
  - Next.js 14 (App Router)
  - React 18
  - Tailwind CSS
  - TypeScript

- **Backend:**
  - Firebase Authentication
  - Firebase Firestore
  - Firebase Storage
  - Replicate API

- **Development:**
  - ESLint
  - Prettier
  - TypeScript

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm or yarn
- Firebase account
- Replicate API account

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
REPLICATE_API_TOKEN=your_replicate_api_token
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/img-cursor.git
cd img-cursor
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── replicate/
│   │       └── generate-image/
│   │   ├── components/
│   │   │   ├── ImageGenerator.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── SignIn.tsx
│   │   ├── my-images/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── lib/
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   └── firebase/
│   │       ├── firebase.ts
│   │       └── firebaseUtils.ts
```

## Usage

1. Sign in using your Google account
2. Choose an AI model based on your needs:
   - Flux Pro for highest quality
   - Flux Schnell for quick generations
   - Ideogram for illustrations
3. Enter your prompt and generate images
4. View your generated images in the "My Images" gallery
5. Images are automatically saved to your account

## Deployment

The application can be deployed on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel project settings
4. Deploy!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [Replicate](https://replicate.com/)
- [Tailwind CSS](https://tailwindcss.com/)