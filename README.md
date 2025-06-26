# 🗣️ Gossips-Dot-Com

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![Socket.io](https://img.shields.io/badge/Socket.io-v1.3.7-red.svg)](https://socket.io/)

**Gossips-Dot-Com** is a real-time web chat application that combines instant messaging with integrated music streaming. Built with Node.js and Socket.io, it allows users to create private chat rooms and enjoy synchronized music playback with friends.

![Homepage](1.JPG?raw=true "Homepage")

## ✨ Features

### 💬 **Real-time Chat**
- **Private Chat Rooms**: Create custom gossip rooms with unique IDs
- **Live Messaging**: Instant message delivery using WebSocket technology
- **Typing Indicators**: See when someone is typing in real-time
- **Read Receipts**: Track message delivery and read status
- **User Presence**: View current active users in the room
- **Desktop Notifications**: Get notified even when the app is in background

### 🎵 **Integrated Music Player**
- **Music Streaming**: Play songs directly in chat using JioSaavn API
- **Synchronized Playback**: All room members listen to the same music simultaneously
- **Music Commands**: Simple text commands to control playback
- **Song Information**: Display artist and track details when playing

### 🎨 **Modern UI/UX**
- **Responsive Design**: Optimized for desktop and mobile devices
- **Beautiful Backgrounds**: Dynamic gradient overlays with stunning imagery
- **Bootstrap Integration**: Clean, professional interface
- **Real-time Updates**: Smooth animations and transitions
- **Loading Animations**: Engaging preloader with spinning effects

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/gossipsdotcom.git
   cd gossipsdotcom
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   node server.js
   ```

4. **Access the application**
   ```
   Open your browser and visit: http://localhost:3000
   ```

## 📖 How to Use

### Starting a Chat Session

1. **Visit the Application**
   - Navigate to the homepage
   - You'll see a clean login interface

2. **Enter Your Details**
   - **Name**: Enter your display name
   - **Gossip ID**: Create or join a room using a unique ID

3. **Share with Friends**
   - Share your Gossip ID with friends
   - They can join using the same ID

4. **Start Chatting**
   - Send messages instantly
   - See typing indicators and read receipts

### Music Commands

| Command | Description | Example |
|---------|-------------|---------|
| `.play <song name>` | Play a song | `.play shape of you` |
| `.pause` or `.p` | Pause current song | `.pause` |
| `@currentUsers` | Show active users | `@currentUsers` |

### Example Usage
```
.play despacito
# Plays "Despacito" for everyone in the room

.pause
# Pauses the music for all users

@currentUsers
# Shows: "Current Users: Alice, Bob, Charlie"
```

## 🛠️ Technical Architecture

### Backend Stack
- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **Socket.io**: Real-time bidirectional communication
- **Moment.js**: Date/time manipulation
- **Node-fetch**: HTTP request library for API calls

### Frontend Stack
- **HTML5**: Semantic markup
- **CSS3**: Responsive styling with Bootstrap
- **JavaScript (ES6)**: Client-side functionality
- **jQuery**: DOM manipulation
- **Socket.io Client**: WebSocket communication

### Key Components

#### Server Side (`server.js`)
- **Socket Management**: Handles user connections and room management
- **Music Integration**: Fetches songs from JioSaavn API
- **Message Broadcasting**: Real-time message distribution
- **User Presence**: Tracks active users per room

#### Client Side
- **`index.html`**: Landing page with room creation
- **`page.html`**: Main chat interface
- **`webappserver.js`**: Socket client and UI interactions
- **`function.js`**: Utility functions for URL parsing

## 🎯 API Integration

### JioSaavn Music API
The application integrates with JioSaavn's API to provide music streaming:

```javascript
// Song search and playback
async function songgrabber(songname) {
  // Searches for songs and returns playable URLs
  // Supports 320kbps and 160kbps quality
}
```

**Features:**
- Automatic song search
- Quality selection (320kbps/160kbps)
- Artist and album information
- Thumbnail artwork

## 🔧 Configuration

### Environment Variables
```bash
PORT=3000  # Server port (defaults to 3000)
```

### Customization Options
- **Background Images**: Modify CSS in HTML files
- **Color Schemes**: Update Bootstrap classes
- **Room Limits**: Adjust user limits in server code

## 📱 Mobile Responsiveness

The application is fully responsive with:
- **Adaptive Layouts**: Different designs for mobile and desktop
- **Touch Optimization**: Mobile-friendly interactions
- **Performance**: Optimized for various screen sizes

## 🔒 Security Features

- **Input Sanitization**: XSS protection for messages
- **Room Isolation**: Messages confined to specific rooms
- **Client Validation**: Input validation on both client and server

## 🐛 Troubleshooting

### Common Issues

1. **Music Not Playing**
   - Check internet connection
   - Verify song name spelling
   - Try different browser

2. **Connection Issues**
   - Refresh the page
   - Check firewall settings
   - Verify server is running

3. **Mobile Issues**
   - Enable notifications in browser
   - Use latest browser version

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👥 Credits

**Created by Vijay Gupta and Team**

### Technologies Used
- Node.js & Express.js for backend
- Socket.io for real-time communication
- JioSaavn API for music streaming
- Bootstrap for responsive design
- Moment.js for time formatting

## 🌟 Future Enhancements

- [ ] Voice messages
- [ ] File sharing
- [ ] Video calls
- [ ] Custom themes
- [ ] Message encryption
- [ ] Chat history
- [ ] User profiles
- [ ] Emoji reactions

## 📞 Support

For support, please create an issue in the GitHub repository or contact the development team.

---

**Made with ❤️ for seamless communication and music sharing**



