"use client";

import { useRouter } from "next/navigation";
import { useLoading } from "src/components/loading-context";

export const useRedirectLoading = () => {
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
