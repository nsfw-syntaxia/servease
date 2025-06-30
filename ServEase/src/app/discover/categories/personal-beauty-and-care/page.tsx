"use client";
import { useSearchParams } from "next/navigation";

const SpecificCategoryPage = () => {
  const searchParams = useSearchParams();
  const categoryName = searchParams.get("name");

  const renderContent = () => {
    switch (categoryName) {
      case "Barbershops":
        return <p>Welcome to Barbershop services!</p>;
      case "Hair Salons":
        return <p>Find the best Hair Salons here.</p>;
      default:
        return <p>Select a category to view services.</p>;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{categoryName}</h1>
      {renderContent()}
    </div>
  );
};

export default SpecificCategoryPage;
