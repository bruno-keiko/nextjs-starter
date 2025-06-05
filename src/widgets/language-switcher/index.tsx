"use client";
import { useRouter, usePathname } from "@/shared/lib/next-intl/navigaiton";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/shared/ui/select";
import { Locale, useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import React, { useTransition } from "react";

const LanguageSwitcher = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useSearchParams();
  const locale = useLocale();
  const paramsObj = Object.fromEntries(params.entries());

  function onSelectChange(value: string) {
    const nextLocale = value as Locale;
    startTransition(() => {
      router.replace({ pathname, query: { ...paramsObj } }, { locale: nextLocale });
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
