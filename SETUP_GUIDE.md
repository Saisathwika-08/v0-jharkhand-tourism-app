# Environment Variables Setup Guide

## Step 1: Get Firebase Credentials

### Create or Access Firebase Project
1. Visit [Firebase Console](https://console.firebase.google.com)
2. Click **"Add project"** or select an existing project
3. Name it (e.g., "Jharkhand Tourism")
4. Click **"Create project"**

### Enable Email/Password Authentication
1. In Firebase Console, go to **Authentication** (left menu)
2. Click **"Get Started"**
3. Select **"Email/Password"** provider
4. Toggle it **"ON"**
5. Click **"Save"**

### Get Your API Keys
1. Click the **⚙️ Settings icon** (top left, next to your project name)
2. Click **"Project settings"**
3. Scroll down to find **"Your apps"** section
4. Click on the **Web app icon** (`</>``)
5. If no app exists, click **"Add app"** → Select **"Web"**
6. You'll see a code block like this:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};
```

**Copy these exact values:**
- `apiKey` = `NEXT_PUBLIC_FIREBASE_API_KEY`
- `authDomain` = `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `projectId` = `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `storageBucket` = `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `messagingSenderId` = `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `appId` = `NEXT_PUBLIC_FIREBASE_APP_ID`

---

## Step 2: Get MongoDB Connection String

### Create MongoDB Cluster (Free)
1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create an account or login
3. Click **"Create a deployment"** or **"Create a project"**
4. Select **"Shared"** (Free tier)
5. Choose your region (closest to your users)
6. Click **"Create deployment"**

### Create Database User
1. In the left menu, click **"Database Access"**
2. Click **"Add new database user"**
3. Set:
   - **Username:** `tourismadmin` (or any name)
   - **Password:** Create a strong password (copy it!)
   - Click **"Add User"**

### Get Connection String
1. Go to **"Database"** in left menu
2. Click **"Connect"** button
3. Select **"Drivers"**
4. Choose **"Node.js"** and version **"Latest"**
5. Copy the connection string shown
6. Replace:
   - `<username>` with your database user
   - `<password>` with the password you created
   - `<database_name>` with `jharkhand_tourism`

**Example:**
```
mongodb+srv://tourismadmin:myPassword123@cluster0.abc123.mongodb.net/jharkhand_tourism?retryWrites=true&w=majority
```

This is your `MONGODB_URI`

---

## Step 3: Add Variables to v0 Project

### In v0 Dashboard:
1. Click the **⚙️ Settings** button (top right of your preview)
2. Click the **"Vars"** tab
3. Add each variable by clicking **"Add new"**:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | (from Firebase step 1) |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | (from Firebase step 1) |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | (from Firebase step 1) |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | (from Firebase step 1) |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | (from Firebase step 1) |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | (from Firebase step 1) |
| `MONGODB_URI` | (from MongoDB step 2) |

4. **Save each variable**

---

## Step 4: Deploy

1. Click **"Publish"** button (top right)
2. Select **"Deploy to Vercel"**
3. Follow the prompts to connect your GitHub repo
4. Your app will deploy automatically! 🎉

---

## Troubleshooting

**Can't find Settings?**
- Top right of v0 editor → Click the gear icon ⚙️

**Variables showing as undefined?**
- Make sure variable names are **EXACTLY** as listed above
- Click "Save" after each variable
- Refresh the page

**Firebase not working?**
- Double-check your API key is correct (copy-paste, not retype)
- Make sure Email/Password auth is enabled in Firebase

**MongoDB connection failed?**
- Check username and password are correct
- Make sure your IP is whitelisted in MongoDB Atlas (usually auto-enabled)
- Test the connection string in MongoDB Compass first
