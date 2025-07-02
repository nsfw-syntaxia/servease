import { Suspense } from "react";
import SpecificCategory from "./specific-category";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SpecificCategory />
    </Suspense>
  );
}
