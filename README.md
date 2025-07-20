# IAKOBI - AI Chat Companion

Welcome to IAKOBI, a modern AI-powered chat companion built with Next.js and React. IAKOBI provides an intuitive and beautiful interface for interacting with AI, featuring real-time conversations, dark/light mode, and a responsive design.

## ✨ Features

- **Real-time AI Chat**: Seamless conversation with AI using WebSocket connections
- **Beautiful UI**: Modern, clean interface with smooth animations
- **Dark/Light Mode**: Toggle between themes with a beautiful animated switch
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Real-time Status**: See AI thinking, searching, and processing states
- **Source Citations**: View and copy sources from AI responses
- **Typing Animation**: Natural typing effect for AI responses
- **Professional Branding**: Custom IAKOBI logo integration

## 🚀 Technologies Used

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Real-time Communication**: Socket.IO
- **Image Optimization**: Next.js Image component

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.0 or higher
- **npm**: Version 8.0 or higher (comes with Node.js)
- **Git**: For cloning the repository

## 🛠️ Installation & Setup

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/yourusername/iakobi-chat.git
cd iakobi-chat
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Add Your Logo

Place your `logos.png` file (672x242 px) in the `public/` directory:

\`\`\`
public/
  └── logos.png
\`\`\`

### 4. Environment Configuration

Create a `.env.local` file in the root directory:

\`\`\`bash
# API Configuration
NEXT_PUBLIC_API_URL=http://192.168.33.185:8000
NEXT_PUBLIC_SOCKET_URL=http://192.168.33.185:8000

# Optional: Analytics or other services
# NEXT_PUBLIC_GA_ID=your-google-analytics-id
\`\`\`

### 5. Backend Setup

Ensure your backend API is running on the specified URL. The application expects:

- **WebSocket endpoint**: `http://192.168.33.185:8000/`
- **API endpoint**: `http://192.168.33.185:8000/prompt`

The backend should handle:
- Socket.IO connections
- POST requests to `/prompt` endpoint
- Pipeline updates via WebSocket events

## 🏃‍♂️ Running the Application

### Development Mode

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Production Build

\`\`\`bash
# Build the application
npm run build

# Start the production server
npm start
\`\`\`

### Linting

\`\`\`bash
npm run lint
\`\`\`

## 📁 Project Structure

\`\`\`
iakobi-chat/
├── public/
│   ├── logos.png          # IAKOBI logo (672x242 px)
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── page.tsx       # Homepage component
│   │   ├── chat/
│   │   │   └── page.tsx   # Chat page component
│   │   ├── globals.css    # Global styles
│   │   └── layout.tsx     # Root layout
│   └── components/        # Reusable components (if any)
├── .env.local            # Environment variables
├── .gitignore
├── next.config.js        # Next.js configuration
├── package.json
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md
\`\`\`

## 🎨 Customization

### Changing Colors

The application uses a consistent orange theme. To modify colors, update the Tailwind classes in the components:

- Primary color: `orange-500`, `orange-600`
- Dark mode backgrounds: `gray-900`, `gray-800`
- Light mode backgrounds: `white`, `gray-50`

### Adding New Features

1. **New Pages**: Add pages in the `src/app/` directory
2. **Components**: Create reusable components in `src/components/`
3. **Styles**: Use Tailwind CSS classes for styling
4. **API Integration**: Follow the existing WebSocket pattern

## 🔧 Configuration

### API Endpoints

Update the API URLs in the chat component if your backend runs on different ports:

\`\`\`typescript
// In src/app/chat/page.tsx
socketRef.current = io('YOUR_BACKEND_URL')

// In the fetch request
const response = await fetch('YOUR_BACKEND_URL/prompt', {
  // ... rest of the configuration
})
\`\`\`

### WebSocket Events

The application listens for these WebSocket events:

- `connect`: Connection established
- `disconnect`: Connection lost
- `pipeline_update`: AI processing updates

Expected `pipeline_update` structure:

\`\`\`typescript
{
  type: 'status' | 'queries' | 'error' | 'done',
  content: {
    answer?: string,
    sources?: string[],
    status?: string,
    queries?: string[],
    error?: string
  }
}
\`\`\`

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms

The application can be deployed on any platform that supports Next.js:

- **Netlify**: Use `npm run build` and deploy the `.next` folder
- **AWS**: Use AWS Amplify or EC2 with PM2
- **DigitalOcean**: Use App Platform or Droplets
- **Railway**: Connect GitHub repository directly

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Use TypeScript for type safety
- Follow the existing code style and formatting
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 📝 API Documentation

### POST /prompt

Send a message to the AI:

\`\`\`typescript
// Request
{
  query: string
}

// Response
// Real-time updates via WebSocket pipeline_update events
\`\`\`

### WebSocket Events

\`\`\`typescript
// Connect to WebSocket
const socket = io('http://your-backend-url')

// Listen for updates
socket.on('pipeline_update', (data) => {
  // Handle AI processing updates
})
\`\`\`

## 🐛 Troubleshooting

### Common Issues

1. **WebSocket Connection Failed**
   - Check if backend is running
   - Verify the API URL in environment variables
   - Check firewall/network settings

2. **Logo Not Displaying**
   - Ensure `logos.png` is in the `public/` directory
   - Check image dimensions (should be 672x242 px)
   - Verify file permissions

3. **Build Errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check TypeScript errors with `npm run lint`
   - Verify Next.js configuration

### Getting Help

If you encounter issues:

1. Check the browser console for errors
2. Verify all environment variables are set correctly
3. Ensure the backend API is accessible
4. Check the GitHub issues page for similar problems

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js**: For the amazing React framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Lucide**: For the beautiful icons
- **Socket.IO**: For real-time communication

---

**IAKOBI** - Where Code Meets Motion 🤖✨

For more information, visit our [website](https://your-website.com) or contact us at [your-email@domain.com](mailto:your-email@domain.com).
