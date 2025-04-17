# HirelyAI - AI Shortlisting System Frontend

## Overview
HirelyAI simplifies the hiring process using AI that evaluates candidates based on answers to dynamic screening questions. The system automatically ranks candidates as good, bad, or worth consideration based on their responses, providing valuable insights to administrators.

## How It Works
- The landing page displays available jobs
- Users must be logged in to apply for positions
- When applying, candidates answer dynamic screening questions
- AI evaluates responses and classifies candidates for administrator review

## Setup and Installation

### Prerequisites
- A Clerk account with a React JS project configured
- Backend API running (see backend repository)
- Node.js and npm installed

### Installation Steps
1. Clone the repository:
```
git clone https://github.com/Husnixix/ai-booking-frontend.git
```

2. Install dependencies:
```
npm install
```

3. Create a `.env` file in the root directory with the following:
```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

4. Start the development server:
```
npm run dev
```

## Environment Variables
- `VITE_CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key for authentication

## Third-Party Services
- **Clerk Authentication**: Sign up and create a project at [https://clerk.com/docs](https://clerk.com/docs)

## API Integration
This frontend connects to the HirelyAI backend API. Make sure to set up the backend server as well:
[HirelyAI Backend Repository](https://github.com/Husnixix/ai-shortlisting-backend.git)

## AI Implementation
AI implementation setup instructions will be provided soon. Without setting up the AI features, the project will run but AI-based candidate evaluation will not function.
