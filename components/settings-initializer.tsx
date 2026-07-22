'use client'
import { useEffect, useRef, useState } from 'react';
import { useSettingsStore } from '../stores/settingsStore';

interface SettingsInitializerProps {
    children: React.ReactNode;
    lang?: string;
}

export const SettingsInitializer: React.FC<SettingsInitializerProps> = ({
    children,
    lang = 'en',
}) => {
    const hasInitializedRef = useRef(false);
    
    // Settings store selectors
    const initializeStore = useSettingsStore((state) => state.initializeStore);
    const loading = useSettingsStore((state) => state.loading);
    const currentLang = useSettingsStore((state) => state.lang);
    const reset = useSettingsStore((state) => state.reset);

    const [hasHydrated, setHasHydrated] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    
    useEffect(() => {
        setHasHydrated(true);
    }, []);

    // Track previous lang to detect changes
    const prevLangRef = useRef<string>(lang);

    // Main effect that handles initialization and reinitialization
    useEffect(() => {
        if (!hasHydrated) return;

        const prevLang = prevLangRef.current;
        const isFirstInit = !hasInitializedRef.current;
        const langChanged = prevLang !== lang;

        const shouldInitialize = isFirstInit || langChanged;

        if (shouldInitialize) {
            const init = async () => {
                try {
                    // If language changed, you might want to reset first
                    if (langChanged && hasInitializedRef.current) {
                        reset();
                    }

                    // Initialize/reinitialize the store
                    await initializeStore(lang);
                    
                    // Update refs after successful initialization
                    prevLangRef.current = lang;
                    hasInitializedRef.current = true;
                    setIsInitialized(true);
                    
                } catch (error) {
                    console.error('Settings store initialization failed:', error);
                }
            };

            init();
        }
    }, [
        hasHydrated,
        lang,
        initializeStore,
        reset
    ]);

    if (!hasHydrated || loading || !isInitialized) {
        return (
            <>
                <div className="flex items-center justify-center fixed top-0 left-0 min-h-screen min-w-screen z-10000 bg-white/60">
                    <div className='flex flex-col items-center justify-center bg-white gap-10 rounded-2xl p-10'>
                        <div className="animate-spin rounded-full h-15 w-15 border-b-3 border-(--theme)"></div>
                        <p className='font-bold text-(--theme)'>Maher Services</p>
                    </div>
                </div>
                {children}
            </>
        );
    }

    return <>{children}</>;
};