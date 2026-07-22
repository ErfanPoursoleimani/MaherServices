import { Tag, UnderTag } from '@/types/types';
import axios from 'axios';
import { create } from 'zustand';

interface dataStore {
    // State
    tags: Tag[];
    underTags: UnderTag[];
    loading: boolean;
    error: string | null;

    // Configuration
    lang: string;

    // Actions
    setError: (error: string) => void;
    setLoading: (loading: boolean) => void;
    setTags: (tags: Tag[]) => void;

    // API Actions
    fetchTags: (lang: string) => Promise<void>;
    fetchUnderTags: (lang: string) => Promise<void>;
    // Utility Actions
    initializeStore: (lang: string) => Promise<void>;
    clearError: () => void;
    reset: () => void;
}

const initialState = {
    loading: false,
    error: null,
    tags: [],
    underTags: [],
    lang: 'en',
    cartId: null,
    products: [],
};

export const useDataStore = create<dataStore>()((set, get) => ({
    ...initialState,

    setError: (error) => set({ error }),
    setLoading: (loading) => set({ loading }),
    setTags: (tags) => set({ tags }),

    // API Actions
    fetchTags: async (lang: string) => {
        try {
            set({ loading: true });
            const { data }: { data: Tag[] } = await axios.get(`/${lang}/api/tags`);
            const findProductsQuantity = (tag: Tag) => {
                return (tag.underTags).reduce((sum: number, underTag: UnderTag) => {return sum+=underTag.products.length}, 0)
            }
            data.sort((a: Tag, b: Tag) => findProductsQuantity(a) - findProductsQuantity(b))
            console.log(data)
            set({ tags: data, loading: false });
        } catch (err) {
            set({ error: err as string, loading: false });
        }
    },
    
    fetchUnderTags: async (lang: string) => {
        try {
            set({ loading: true });
            const { data } = await axios.get(`/${lang}/api/UnderTags`);
            set({ underTags: data, loading: false });
        } catch (err) {
            set({ error: err as string, loading: false });
        }
    },

    initializeStore: async (lang: string) => {
        set({ lang});
        
        // Fetch all data in parallel
        const promises = [
            get().fetchTags(lang),
        ];

        try {
            await Promise.all(promises);
        } catch (error) {
            console.error('Error initializing store:', error);
            set({ error: 'Failed to initialize store', loading: false });
        }
    },

    // Utility Actions
    clearError: () => set({ error: '' }),

    // Reset function - restores all state to initial values (no localStorage clearing)
    reset: () => {
        set(initialState);
    }
}));


export const selectError = (state: dataStore) => state.error;
export const selectLoading = (state: dataStore) => state.loading;
