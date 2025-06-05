"use client";
<<<<<<< HEAD
import { useRouter, usePathname } from "@/shared/lib/next-intl/navigaiton";
=======
import { usePathname, useRouter } from "@/shared/lib/next-intl/navigaiton";
>>>>>>> 24632a0 (feat: laguage query)
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/shared/ui/select";
import { Locale, useLocale } from "next-intl";
<<<<<<< HEAD
import { useParams } from "next/navigation";
=======
import { useSearchParams } from "next/navigation";
>>>>>>> 24632a0 (feat: laguage query)
import React, { useTransition } from "react";

const LanguageSwitcher = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
<<<<<<< HEAD
  const params = useParams();
  const locale = useLocale();
=======
  const params = useSearchParams();
  const locale = useLocale();
  const paramsObj = Object.fromEntries(params.entries());
>>>>>>> 24632a0 (feat: laguage query)

  function onSelectChange(value: string) {
    const nextLocale = value as Locale;
    startTransition(() => {
<<<<<<< HEAD
      router.replace({ pathname, query: params }, { locale: nextLocale });
=======
      router.replace({ pathname, query: { ...paramsObj } }, { locale: nextLocale });
>>>>>>> 24632a0 (feat: laguage query)
    });
  }
  console.log("Locale switcher");
  return (
    <Select defaultValue={locale} onValueChange={onSelectChange} disabled={isPending}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="tk">Türkmen</SelectItem>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="ru">Russian</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
