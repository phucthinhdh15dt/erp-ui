import firebase from 'firebase/compat/app';
import {
    GoogleAuthProvider,
    FacebookAuthProvider,
    getAuth,
    getRedirectResult,
    signInWithRedirect,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { useAuth } from '@/composables/auth/index';

const mbbFirebase = {
    auth: null,
    provider: {
        GOOGLE: new GoogleAuthProvider(),
        FACEBOOK: new FacebookAuthProvider(),
    },
    initializeApp() {
        const config = {
            apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
            authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
            // storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
            // messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGE_SENDER_ID,
            // appId: process.env.VUE_APP_FIREBASE_APP_ID,
        };

        firebase.initializeApp(config);

        // View more: https://firebase.google.com/docs/reference/js/firebase.auth.Auth
        this.auth = getAuth();

        // Auth settings
        this.auth.languageCode = 'vi_VN';
        console.log(process.env.VUE_APP_FIREBASE_TENANT_ID);
        if (process.env.VUE_APP_FIREBASE_TENANT_ID) this.auth.tenantId = process.env.VUE_APP_FIREBASE_TENANT_ID;

        this.auth.onAuthStateChanged(function (user) {
            const { firebaseLogin } = useAuth();

            user.getIdToken(true)
                .then(function (idToken) {
                    firebaseLogin(idToken);
                })
                .catch(function (error) {
                    console.error(error);
                });
        });
    },
    signInWithGoogle() {
        return signInWithRedirect(this.auth, this.provider.GOOGLE);
    },
    signInWithFacebook() {
        return signInWithRedirect(this.auth, this.provider.FACEBOOK);
    },
    signInWithEmailAndPassword(email, password) {
        return signInWithEmailAndPassword(this.auth, email, password);
    },
    getRedirectResult() {
        return getRedirectResult(this.auth);
    },
    signOut() {
        return this.auth.signOut();
    },
};

export default mbbFirebase;
