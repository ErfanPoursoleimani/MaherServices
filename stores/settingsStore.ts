import { Dict } from "@/types/dict";
import axios from 'axios';
import { create } from 'zustand';
import { initialDict } from './initialData';

interface settingsStore {
    // State
    dict: Dict
    isRTL: boolean
    loading: boolean
    error: string | null
    openCategory: number | null

    // Configuration
    lang: string

    // Actions
    setLang: (lang: string) => void
    setDict: (dict: Dict) => void
    setError: (error: string) => void
    setLoading: (loading: boolean) => void
    setOpenCategory: (openCategory: number) => void

    // API Actions
    fetchDict: (lang: string) => Promise<void>
    
    // Utility Actions
    initializeStore: (lang: string) => Promise<void>
    clearError: () => void
    reset: () => void
}



const initialState = {
    dict: initialDict,
    isRTL: false,
    lang: 'en',
    loading: false,
    error: null,
    openCategory: null
};

export const useSettingsStore = create<settingsStore>()((set, get) => ({
    ...initialState,

    setLang: (lang) => {
        set({ lang, isRTL: lang === 'fa' });
        get().fetchDict(lang);
    },
    setDict: (dict) => set({ dict }),
    setError: (error) => set({ error }),
    setLoading: (loading) => set({ loading }),
    setOpenCategory: (openCategory) => set({ openCategory }),
    
    fetchDict: async (lang) => {
        try {
            set({ loading: true });
            const { data } = await axios.get(`/${lang}/api/dictionary?locale=${lang}`);
            set({ dict: data, loading: false });
        } catch (err) {
            set({ error: err as string, loading: false });
        }
    },

    initializeStore: async (lang: string) => {
        set({ lang, isRTL: lang === 'fa'});
        
        const promises = [
            get().fetchDict(lang),
        ];

        try {
            await Promise.all(promises);
        } catch (error) {
            console.error('Error initializing store:', error);
            set({ error: 'Failed to initialize store', loading: false });
        }
    },

    clearError: () => set({ error: null }),
    reset: () => {
        set(initialState);
    }
}));