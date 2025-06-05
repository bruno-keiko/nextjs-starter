import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/shared/lib/next-intl/routing";
import Header from "@/widgets/header";
import { Nunito } from "next/font/google";

const geist = Nunito({
  subsets: ["latin"],
  weight: ["400"], // Add the required font weight(s)
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={geist.className}>
      <body className=" bg-teal-50">
        <NextIntlClientProvider>
          <Header />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
