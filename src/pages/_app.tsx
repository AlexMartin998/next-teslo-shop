import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { SWRConfig } from 'swr';
import { SessionProvider } from 'next-auth/react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { SnackbarProvider } from 'notistack';

import { lightTheme } from '@/themes';
import { AuthProvider, CartProvider, UIProvider } from '@/context';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <PayPalScriptProvider
        options={{
          'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
        }}
      >
        <SWRConfig
          value={{
            // refreshInterval: 400,
            fetcher: (resource, init) =>
              fetch(resource, init).then(res => res.json()),
          }}
        >
          <AuthProvider>
            <SnackbarProvider maxSnack={3}>
              <CartProvider>
                <UIProvider>
                  <ThemeProvider theme={lightTheme}>
                    <CssBaseline />

                    <Component {...pageProps} />
                  </ThemeProvider>
                </UIProvider>
              </CartProvider>
            </SnackbarProvider>
          </AuthProvider>
        </SWRConfig>
      </PayPalScriptProvider>
    </SessionProvider>
  );
}
