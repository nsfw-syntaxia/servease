import { Suspense } from "react";
import SpecificCategory from "./specific-category";

export default function Page() {
  return (
    <Suspense>
      <SpecificCategory />
    </Suspense>
  );
}
