import '../lib/dayjs';
import type { AppProps } from 'next/app';
import { globalStyles } from '@/styles/global';
import { SessionProvider } from 'next-auth/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/reacy-query';
import { DefaultSeo } from 'next-seo';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        <DefaultSeo
          openGraph={{
            type: 'website',
            locale: 'pt_BR',
            url: 'https://www.url.ie/',
            siteName: 'Ignite Call',
          }}
          defaultTitle='Ignite Call'
        />
        <Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  );
}
