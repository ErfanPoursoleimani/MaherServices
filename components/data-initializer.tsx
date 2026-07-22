'use client'
import { useEffect, useState } from 'react';
import { useDataStore } from '../stores/dataStore';

interface DataInitializerProps {
    children: React.ReactNode;
    lang?: string;
}

export const DataInitializer: React.FC<DataInitializerProps> = ({
    children,
    lang = 'en',
}) => {


    

    const initializeStore = useDataStore((state) => state.initializeStore);

    const [hasHydrated, setHasHydrated] = useState(false);
    const [isDataInitialized, setIsDataInitialized] = useState(false);
    useEffect(() => {
        setHasHydrated(true);
    }, []);

    // Main effect that handles initialization and reinitialization
    useEffect(() => {
            const init = async () => {
                try {


                    // Initialize/reinitialize the store
                    await initializeStore(lang);
                    setIsDataInitialized(true)
                    
                } catch (error) {
                    console.error('Data store initialization failed:', error);
                }
            };

            init();
    }, [
        initializeStore,
        lang
    ]);

    if (!hasHydrated/*  || dataLoading */ || !isDataInitialized) {
        return (
        <>
            <div className="flex items-center justify-center fixed top-0 left-0 min-h-screen min-w-screen z-10000 bg-white/60">
                <div className='flex flex-col items-center justify-center bg-white gap-10 rounded-2xl p-10'>
                    <div className="animate-spin rounded-full h-15 w-15 border-b-3 text-(--theme)"></div>
                    <p className='font-bold text-(--theme)'>Maher Services</p>
                </div>
            </div>
            {children}
        </>
        );
    }

    return <>{children}</>;
};