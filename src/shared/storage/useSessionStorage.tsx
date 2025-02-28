import { useCallback, useSyncExternalStore } from 'react';

export const useSessionStorage = (key: string) => {
    const setStorage = useCallback(
        (newValue: string) => {
            sessionStorage.setItem(key, newValue);
            dispatchEvent(new StorageEvent('storage', { key: key, newValue }));
        },
        [key],
    );

    const removeStorage = useCallback(() => {
        sessionStorage.removeItem(key);
        dispatchEvent(new StorageEvent('storage', { key: key }));
    }, [key]);

    const getSnapshot = () => sessionStorage.getItem(key);

    const subscribe = (listener: () => void) => {
        window.addEventListener('storage', listener);
        return () => window.removeEventListener('storage', listener);
    };

    const store = useSyncExternalStore(subscribe, getSnapshot);

    return { value: store, setSessionStorage: setStorage, removeSessionStorage: removeStorage };
};
