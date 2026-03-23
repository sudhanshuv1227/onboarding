# Node.js Mobile OTP Auth Example

This project provides a simple Express.js server with endpoints for user signup and login using mobile number and OTP verification.

## Features
- Signup with mobile number (OTP sent)
- Login with mobile number (OTP sent)
- OTP verification for both flows
- In-memory user and OTP storage (for demo)

## Endpoints
- `POST /signup` — `{ mobile }`
- `POST /login` — `{ mobile }`
- `POST /verify-otp` — `{ mobile, otp }`

## Getting Started
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the server:
   ```sh
   npm run dev
   ```

## Development
- Edit `index.js` for logic.
- OTPs are logged to the console (replace with SMS integration for production).

## Scripts
- `npm run dev` — Start with nodemon

## Environment
- Configure `PORT` in `.env` if needed.

---
**Note:** This is a demo. Do not use in production without proper security, persistent storage, and SMS integration.
