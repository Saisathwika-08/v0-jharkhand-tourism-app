# Jharkhand Tourism App - Deployment Guide

This guide explains how to deploy the Jharkhand Tourism App to Vercel with Firebase and MongoDB integration.

## Prerequisites

1. **Firebase Project**: Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. **MongoDB Atlas**: Create a MongoDB database at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
3. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)

## Setup Steps

### 1. Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project (or use existing)
3. Enable **Authentication** → Email/Password provider
4. Go to **Project Settings** → Copy your Firebase configuration:
   ```
   API Key
   Auth Domain
   Project ID
   Storage Bucket
   Messaging Sender ID
   App ID
   ```

### 2. MongoDB Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster (free tier available)
3. Create a database user with strong password
4. Whitelist your IP addresses (or allow all for development)
5. Copy the connection string: `mongodb+srv://username:password@cluster.mongodb.net/jharkhand_tourism?retryWrites=true&w=majority`

**Important Collections to Create** (optional, MongoDB creates them automatically):
- `bookings` - User trip bookings
- `guides` - Available guides
- `userProfiles` - User profile information

### 3. Environment Variables Setup

Create a `.env.local` file in the project root (for local development):

```bash
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123def456

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jharkhand_tourism?retryWrites=true&w=majority
```

### 4. Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Select your GitHub repository
4. Configure project settings (Next.js auto-detected)
5. Add Environment Variables:
   - Click "Environment Variables"
   - Add all variables from your `.env.local`
   - Select environments: Production, Preview, Development
6. Click "Deploy"

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to your Vercel account
vercel login

# Deploy
vercel

# Add environment variables
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
# ... add all other variables

# Deploy production
vercel --prod
```

### 5. Verify Deployment

After deployment:

1. **Test Authentication**:
   - Go to your Vercel domain
   - Click "Sign Up" or "Login"
   - Create an account with email/password
   - Verify redirect to dashboard

2. **Test MongoDB Connection**:
   - Create a booking through the app
   - Check MongoDB Atlas to verify data was saved

3. **Check Logs**:
   - Go to Vercel Dashboard
   - Select your project
   - Go to "Deployments" → Select latest
   - Click "Functions" to view logs

## Troubleshooting

### Firebase Configuration Not Loading

- Verify all `NEXT_PUBLIC_FIREBASE_*` variables are set correctly in Vercel
- Check browser console for Firebase errors
- Ensure Firebase project has Authentication enabled

### MongoDB Connection Error

- Check `MONGODB_URI` format (includes username:password)
- Verify IP address is whitelisted in MongoDB Atlas
- Ensure database user password doesn't contain special characters (or URL encode them)
- Test connection string locally first

### API Routes Not Working

- Check function logs in Vercel dashboard
- Ensure MongoDB collections exist
- Verify Firebase authentication token is being passed correctly

## File Structure

```
app/
├── api/
│   ├── bookings/
│   │   └── route.ts          # Booking API endpoints
│   ├── guides/
│   │   └── route.ts          # Guide API endpoints
│   ├── users/
│   │   └── profile/
│   │       └── route.ts      # User profile API
│   ├── trip-planner/
│   │   └── route.ts          # Existing trip planner
│   └── translate/
│       └── route.ts          # Existing translate feature
├── auth/
│   ├── login/
│   │   └── page.tsx          # Login page (Firebase)
│   └── sign-up/
│       └── page.tsx          # Sign up page (Firebase)
├── page.tsx                  # Home page with hero image
└── layout.tsx                # Root layout

lib/
├── firebase/
│   ├── client.ts             # Firebase initialization
│   └── auth.ts               # Authentication utilities
├── hooks/
│   ├── useAuth.ts            # Auth state hook
│   ├── useBookings.ts        # Bookings management
│   └── useGuides.ts          # Guides fetching
├── mongodb.ts                # MongoDB connection
├── api-client.ts             # API client wrapper
└── supabase/                 # Kept for backward compatibility

public/
├── hero-jharkhand.jpg        # Hero background image
├── waterfall-jh.jpg          # Waterfall destination image
└── tribal-jh.jpg             # Tribal heritage image
```

## Environment Variable Reference

### Firebase (Required)

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API Key | `AIzaSyD...` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | `myapp.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase Project ID | `my-project-123` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket | `my-project.appspot.com` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Messaging Sender ID | `123456789` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase App ID | `1:123456789:web:abc...` |

### MongoDB (Required)

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB Connection String | `mongodb+srv://user:pass@cluster.mongodb.net/db` |

## Post-Deployment Tasks

1. **Test All Features**:
   - Sign up with new account
   - Make a booking
   - Check guides availability
   - Test trip planner

2. **Monitor Performance**:
   - Check Vercel Analytics
   - Monitor API response times
   - Watch for MongoDB connection issues

3. **Set Up Monitoring** (Optional):
   - Configure Sentry for error tracking
   - Set up MongoDB Atlas alerts
   - Enable Firebase Cloud Functions monitoring

## Next Steps

1. **Add Payment Processing** (Optional):
   - Implement Stripe integration for bookings
   - Add payment verification in booking API

2. **Enhance Authentication**:
   - Add Google OAuth sign-in
   - Implement email verification
   - Add password reset flow

3. **Expand Database**:
   - Add homestays collection
   - Add reviews/ratings system
   - Add destination information

4. **Optimize Performance**:
   - Enable image optimization
   - Implement caching strategy
   - Add API response caching

## Support

For issues:
- Check [Firebase Documentation](https://firebase.google.com/docs)
- Check [MongoDB Documentation](https://docs.mongodb.com)
- Check [Vercel Documentation](https://vercel.com/docs)
- Review application logs in Vercel dashboard
