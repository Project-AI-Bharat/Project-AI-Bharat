import dotenv from 'dotenv';

dotenv.config();

const config = { 
    mongoURI: process.env.MONGO_URI,
    databaseName: process.env.DATABASE_NAME,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    googleAccessToken: process.env.GOOGLE_ACCESS_TOKEN,
    googleUser: process.env.GOOGLE_USER
};

if (!process.env.MONGO_URI || !process.env.DATABASE_NAME) {
    console.error('Error: MONGO_URI and DATABASE_NAME must be set in the .env file');
    process.exit(1);
}

if (!config.googleClientId || !config.googleClientSecret || !config.googleRefreshToken || !config.googleAccessToken || !config.googleUser) {
    console.error('Error: Google OAuth credentials must be set in the .env file');
    process.exit(1);
}

export default config;