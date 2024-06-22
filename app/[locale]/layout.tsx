import { Inter } from "next/font/google";
import { Cairo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../utils/ThemeProvider";
import { notFound } from "next/navigation";
import { useLocale } from "next-intl";
import { Providers } from "../utils/Providers";
import { Toaster } from "../../components/ui/sonner";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const inter = Inter({ subsets: ["latin"] });
const cairo = Cairo({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["arabic", "latin"],
  display: "swap",
});

const locales = ["en", "ar"];

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  if (!locales.includes(locale)) {
    notFound();
  }
  const lang = useLocale();

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={`${lang === "en" ? `ltr` : `rtl`}`}
      suppressHydrationWarning
    >
      <body
        className={`${
          lang === "en" ? `${inter.className}` : `${cairo.className}`
        }`}
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
          </ThemeProvider>
          <Toaster position="top-center" richColors />
        </Providers>
      </body>
    </html>
  );
}
