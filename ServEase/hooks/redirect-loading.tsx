"use client";

import { useRouter } from "next/navigation";
import { useLoading } from "@/components/components/ui/loading-context";

export const useRedirectWithLoading = () => {
  const router = useRouter();
  const { showLoading } = useLoading();

  const redirect = (path: string, delay = 200) => {
    showLoading();
    setTimeout(() => {
      router.push(path);
    }, delay); // delay before navigation
  };

  return redirect;
};
