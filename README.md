# Gmail Manager React

A modern React application for managing multiple Gmail accounts, built with TypeScript and Material-UI.

## Features

- User authentication (login/register)
- Add and manage multiple Gmail accounts
- View inbox for each Gmail account
- Modern, responsive UI with Material-UI
- Type-safe development with TypeScript
- Protected routes and authentication state management

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A Gmail account with App Password enabled

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/gmail-manager-react.git
cd gmail-manager-react
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=http://localhost:3001/api
```

4. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/       # React context for state management
├── pages/         # Page components
├── services/      # API services
├── types/         # TypeScript interfaces
└── App.tsx        # Main application component
```

## Setting up Gmail App Passwords

1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Step Verification if not already enabled
4. Under "App passwords", generate a new app password
5. Use this password when adding your Gmail account to the application

## Technologies Used

- React 18
- TypeScript
- Material-UI
- React Router v6
- Axios
- Context API for state management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
