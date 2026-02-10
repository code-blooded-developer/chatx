# ChatX

A real-time chat application built with Next.js, React, and Socket.io. Users can create accounts, join chat rooms, and communicate instantly with others.

## Features

- **Real-time Messaging** - Instant message delivery using WebSocket connections
- **Chat Rooms** - Join and browse multiple chat rooms
- **User Accounts** - Simple username-based authentication
- **Type-Safe** - Built entirely in TypeScript for reliability
- **Redux State Management** - Centralized state management for predictable app behavior
- **Hot Reload** - Development mode with automatic reloading

## Architecture

### Client (Frontend)

- **Framework**: Next.js 13 with React 18
- **State Management**: Redux Toolkit
- **Real-time Communication**: Socket.io-client
- **Language**: TypeScript
- **Styling**: CSS Modules

### Server (Backend)

- **Runtime**: Node.js with Express
- **Real-time Engine**: Socket.io
- **Language**: TypeScript
- **Development**: Nodemon for auto-restart

## Project Structure

```
chatx/
├── client/                    # Next.js frontend application
│   ├── src/
│   │   ├── containers/       # React containers (Rooms, Messages)
│   │   ├── context/          # Socket context providers
│   │   ├── pages/            # Next.js pages and API routes
│   │   ├── store/            # Redux store and reducers
│   │   ├── styles/           # CSS modules
│   │   └── utils/            # Utilities and constants
│   ├── public/               # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   └── next.config.js
│
└── server/                    # Express backend application
    ├── src/
    │   ├── index.ts          # Server entry point
    │   └── socket.ts         # Socket.io event handlers
    ├── config/
    │   └── default.ts        # Configuration settings
    ├── package.json
    └── tsconfig.json
```

## Installation

### Prerequisites

- Node.js 16+
- npm or yarn

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd chatx
   ```

2. **Install server dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

## Running the Application

### Development Mode

**Terminal 1 - Start the server:**

```bash
cd server
npm run dev
```

The server will run on the configured host and port (default: `http://localhost:3001`)

**Terminal 2 - Start the client:**

```bash
cd client
npm run dev
```

The client will run at `http://localhost:3000`

### Production Build

**Server:**

```bash
cd server
npm run build
npm start
```

**Client:**

```bash
cd client
npm run build
npm start
```

## Usage

1. Open `http://localhost:3000` in your browser
2. Enter a username to log in
3. Browse available chat rooms from the Rooms container
4. Select a room to join
5. Start sending and receiving messages in real-time

## Configuration

Server configuration is managed in [server/config/default.ts](server/config/default.ts). You can modify:

- `port` - Server port number
- `host` - Server host address
- `corsOrigin` - Allowed CORS origin for the client

## Technologies Used

- **Frontend**: Next.js, React, Redux Toolkit, Socket.io-client, TypeScript
- **Backend**: Express, Socket.io, Node.js, TypeScript
- **Build Tools**: TypeScript, Nodemon, ts-node

## Development Scripts

**Client:**

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

**Server:**

- `npm run dev` - Start development server with auto-reload

## License

MIT

## Contributing

Feel free to submit issues and enhancement requests!
