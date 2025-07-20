🚀 Overview
IAKOBI is a modern AI-powered chat application that bridges the gap between artificial intelligence and human interaction. Built with Next.js and featuring a sleek, responsive design, IAKOBI provides an intuitive chat experience with real-time AI responses, source citations, and intelligent search capabilities.
✨ Features

🤖 Real-time AI Chat: Instant responses with typing animations
🌓 Dark/Light Mode: Beautiful theme switching with persistent preferences
📱 Responsive Design: Seamless experience across all devices
🔍 Smart Search: AI queries with source citations and search indicators
⚡ Real-time Updates: WebSocket-powered live communication
🎨 Modern UI: Clean, professional interface with smooth animations
📚 Source Citations: Transparent AI responses with clickable source links
💾 Session Persistence: Maintains conversation state during sessions

🛠️ Tech Stack

Frontend: Next.js 14, React 18, TypeScript
Styling: Tailwind CSS
Real-time Communication: Socket.IO
Icons: Lucide React
Image Optimization: Next.js Image component
Animations: CSS transitions and Tailwind animations

📋 Prerequisites
Before running this project, make sure you have the following installed:

Node.js (version 18.0 or higher)
npm or yarn package manager
Git for cloning the repository

🔧 Installation

Clone the repository
bashgit clone https://github.com/yourusername/iakobi.git
cd iakobi

Install dependencies
bashnpm install
# or
yarn install

Add your logo

Place your logos.png file (672x242 px) in the public/ directory
The logo will be automatically used in the header and homepage



⚙️ Configuration
Environment Setup
Create a .env.local file in the root directory (optional):
env# Add any environment variables here if needed
NEXT_PUBLIC_API_URL=http://192.168.33.185:8000
Backend Configuration
The application expects a backend API running on http://192.168.33.185:8000 that supports:

WebSocket connections using Socket.IO
POST /prompt endpoint for chat messages
Pipeline updates via WebSocket events:

status - AI thinking/processing states
queries - Search query updates
done - Final response with sources
error - Error handling



Socket.IO Events
The frontend listens for these WebSocket events:
javascript// Connection events
'connect' - Successful connection to backend
'disconnect' - Connection lost

// Pipeline events
'pipeline_update' - Real-time AI processing updates
  - type: 'status' | 'queries' | 'error' | 'done'
  - content: { answer?, sources?, status?, queries?, error? }
🚀 Running the Application
Development Mode
bashnpm run dev
# or
yarn dev
Open http://localhost:3000 in your browser.
Production Build
bash# Build the application
npm run build
# or
yarn build

# Start production server
npm start
# or
yarn start
Docker (Optional)
bash# Build Docker image
docker build -t iakobi .

# Run container
docker run -p 3000:3000 iakobi
📁 Project Structure
iakobi/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Homepage component
│   │   ├── chat/
│   │   │   └── page.tsx      # Chat page component
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles
│   └── components/           # Reusable components (if any)
├── public/
│   ├── logos.png            # IAKOBI logo (672x242 px)
│   └── ...                  # Other static assets
├── tailwind.config.js       # Tailwind CSS configuration
├── next.config.js           # Next.js configuration
├── package.json             # Dependencies and scripts
└── README.md               # This file
🎨 Customization
Styling
The application uses Tailwind CSS for styling. Key color scheme:

Primary: Orange (orange-500, orange-600)
Dark Mode: Gray scale (gray-800, gray-900)
Light Mode: White with subtle grays

Logo Replacement
Replace public/logos.png with your own logo:

Recommended size: 672x242 pixels
Format: PNG with transparent background
Aspect ratio: ~2.8:1 for best results

🔌 API Integration
To integrate with your own AI backend:

Update the WebSocket URL in src/app/chat/page.tsx:
javascriptsocketRef.current = io('YOUR_BACKEND_URL')

Update the API endpoint in the handleSubmit function:
javascriptconst response = await fetch('YOUR_API_ENDPOINT/prompt', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: input })
})

Implement backend endpoints:

POST /prompt - Accept chat messages
WebSocket events for real-time updates



🚀 Deployment
Vercel (Recommended)

Push your code to GitHub
Connect your repository to Vercel
Deploy with zero configuration

Netlify

Build the application: npm run build
Deploy the out/ directory to Netlify

Traditional Hosting

Build: npm run build
Upload the generated files to your web server

🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository
Create a feature branch
bashgit checkout -b feature/amazing-feature

Commit your changes
bashgit commit -m 'Add some amazing feature'

Push to the branch
bashgit push origin feature/amazing-feature

Open a Pull Request

📝 Development Guidelines

Use TypeScript for type safety
Follow the existing code style
Add comments for complex logic
Test across different screen sizes
Ensure dark/light mode compatibility

🐛 Troubleshooting
Common Issues
WebSocket Connection Failed

Ensure your backend is running on the specified port
Check if the backend supports Socket.IO
Verify CORS settings on your backend

Logo Not Displaying

Ensure logos.png is in the public/ directory
Check the file path and permissions
Verify the image format and size

Styling Issues

Clear browser cache
Ensure Tailwind CSS classes are not purged
Check for conflicting CSS

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
🙏 Acknowledgments

Built with Next.js
Styled with Tailwind CSS
Icons by Lucide
Real-time communication via Socket.IO

📞 Support
If you encounter any issues or have questions:

Check the Issues page
Create a new issue with detailed information
Contact the development team
