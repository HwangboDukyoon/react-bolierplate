import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRouter } from '@/app/router';
import { AuthContextProvider } from '@/app/provider/authProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const rootNode = document.getElementById('root') as HTMLElement;
const queryClient = new QueryClient();

ReactDOM.createRoot(rootNode).render(
    // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
            <AppRouter />
        </AuthContextProvider>
    </QueryClientProvider>,
    //</React.StrictMode>,
);