"use client";

import type { NextPage } from "next";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../styles/DiscoverPage.module.css";
import { createClient } from "../utils/supabase/client";

interface SearchResult {
  id: string;
  business_name: string;
  category: string; // Let's show the category in the results
}

const DiscoverPage: NextPage = () => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Debounce to prevent firing queries on every keystroke
    const debounceSearch = setTimeout(async () => {
      const trimmedSearchTerm = searchTerm.trim();
      if (trimmedSearchTerm.length > 0) {
        setIsSearching(true);
        setSearchResults([]);

        const supabase = createClient();

        // This query is broader: it searches across all categories
        // for a matching business name or tag.
        const { data, error } = await supabase
          .from("profiles")
          .select("id, business_name, category") // Select only what's needed for the dropdown
          .or(
            `business_name.ilike.%${trimmedSearchTerm}%,tags.ilike.%${trimmedSearchTerm}%`
          )
          .limit(10); // It's good practice to limit dropdown results

        if (error) {
          console.error("Error fetching global search results:", error);
          setSearchResults([]);
        } else {
          setSearchResults(data || []);
        }
        setIsSearching(false);
      } else {
        setSearchResults([]); // Clear results if search is empty
      }
    }, 300); // 300ms delay

    return () => clearTimeout(debounceSearch);
  }, [searchTerm]);

  // --- HOOK TO CLOSE DROPDOWN ON OUTSIDE CLICK ---
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchTerm(""); // Clear search to hide dropdown
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchContainerRef]);

  const onPersonalBeautyClick = useCallback(() => {
    router.push("/discover/categories/personal-beauty-and-care");
  }, [router]);

  const onHealthMedicalClick = useCallback(() => {
    router.push("/discover/categories/health-and-medical");
  }, [router]);

  const onFitnessSportsClick = useCallback(() => {
    router.push("/discover/categories/fitness-and-sports");
  }, [router]);

  const onEducationTutoringClick = useCallback(() => {
    router.push("/discover/categories/education-and-tutoring");
  }, [router]);

  const onRepairTechnicalClick = useCallback(() => {
    router.push("/discover/categories/repair-and-technical");
  }, [router]);

  const onFoodBeveragesClick = useCallback(() => {
    router.push("/discover/categories/food-and-beverages");
  }, [router]);

  const onMiscellaneousClick = useCallback(() => {
    router.push("/discover/categories/miscellaneous");
  }, [router]);

  const isDropdownVisible =
    (isSearching || searchResults.length > 0) && searchTerm.trim().length > 0;

  return (
    <div className={styles.discover1Parent}>
      <div className={styles.discover1}>

        <div className={styles.whatweofferbox} />
        <b className={styles.ourServices}>
          <span>{`Our `}</span>
          <span className={styles.services}>Services</span>
        </b>

        <div className={styles.background1} onClick={onPersonalBeautyClick}>
          <div className={styles.link}>
            <div className={styles.personalBeautyAnd}>
              Personal Beauty and Care
            </div>
            <div className={styles.chevronRight}>
              <Image
                className={styles.icon}
                width={6.8}
                height={13.5}
                sizes="100vw"
                alt=""
                src="Chevron right.svg"
              />
            </div>
          </div>
        </div>

        <div className={styles.background2} onClick={onHealthMedicalClick}>
          <div className={styles.link}>
            <div className={styles.healthAndMedical}>
              Health and Medical Services
            </div>
            <div className={styles.chevronRight}>
              <Image
                className={styles.icon}
                width={6.8}
                height={13.5}
                sizes="100vw"
                alt=""
                src="Chevron right.svg"
              />
            </div>
          </div>
        </div>

        <div className={styles.background3} onClick={onFitnessSportsClick}>
          <div className={styles.link}>
            <div className={styles.fitnessAndSports}>Fitness and Sports</div>
            <div className={styles.chevronRight}>
              <Image
                className={styles.icon}
                width={6.8}
                height={13.5}
                sizes="100vw"
                alt=""
                src="Chevron right.svg"
              />
            </div>
          </div>
        </div>

        <div className={styles.background4} onClick={onEducationTutoringClick}>
          <div className={styles.link}>
            <div className={styles.educationAndTutoring}>
              Education and Tutoring
            </div>
            <div className={styles.svg} />
            <div className={styles.chevronRight}>
              <Image
                className={styles.icon}
                width={6.8}
                height={13.5}
                sizes="100vw"
                alt=""
                src="Chevron right.svg"
              />
            </div>
          </div>
        </div>

        <div className={styles.background5} onClick={onRepairTechnicalClick}>
          <div className={styles.link}>
            <div className={styles.repairAndTechnical}>
              Repair and Technical Services
            </div>
            <div className={styles.chevronRight}>
              <Image
                className={styles.icon}
                width={6.8}
                height={13.5}
                sizes="100vw"
                alt=""
                src="Chevron right.svg"
              />
            </div>
          </div>
        </div>

        <div className={styles.background6} onClick={onFoodBeveragesClick}>
          <div className={styles.link}>
            <div className={styles.foodAndBeverages}>Food and Beverages</div>
            <div className={styles.chevronRight}>
              <Image
                className={styles.icon}
                width={6.8}
                height={13.5}
                sizes="100vw"
                alt=""
                src="/Chevron right.svg"
              />
            </div>
          </div>
        </div>

        <div className={styles.background} onClick={onMiscellaneousClick}>
          <div className={styles.link}>
            <div className={styles.miscellaneous}>Miscellaneous</div>
            <div className={styles.chevronRight}>
              <Image
                className={styles.icon}
                width={6.8}
                height={13.5}
                sizes="100vw"
                alt=""
                src="Chevron right.svg"
              />
            </div>
          </div>
        </div>

        {/* hero img */}
        <div className={styles.heroImage}>
          <div className={styles.image10} />
        </div>

        {/* search */}
        <div
          ref={searchContainerRef}
          className={`${styles.searchBox} ${
            isDropdownVisible ? styles.searchBoxActive : ""
          }`}
        >
          <div className={styles.filtering}>
            <div className={styles.link6}>
              <Image
                className={styles.icon2}
                width={20}
                height={20}
                sizes="100vw"
                alt=""
                src="/filtering.svg"
              />
              <div className={styles.moreFilters}>More Filters</div>
            </div>
          </div>
          <div className={styles.btnfind}>
            <Image
              className={styles.icon3}
              width={15}
              height={15}
              sizes="100vw"
              alt=""
              src="/search.svg"
            />
            <div className={styles.findListing}>Find Listing</div>
          </div>
          <div className={styles.inputBox}>
            <input
              type="text"
              className={styles.enterAService}
              placeholder="Enter a Service Name, Category, or Location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoComplete="off"
            />
          </div>
         {(isSearching || searchResults.length > 0) &&
            searchTerm.trim().length > 0 && (
              <div className={styles.searchResultsDropdown}>
                {isSearching && (
                  <div className={styles.searchResultItem}>Searching...</div>
                )}
                {!isSearching && searchResults.length === 0 && (
                  <div className={styles.searchResultItem}>
                    No results found.
                  </div>
                )}
                {!isSearching &&
                  searchResults.map((result) => (
                    <Link
                      key={result.id}
                      href={`/facility/${result.id}`}
                      className={styles.searchResultLink}
                    >
                      <div className={styles.searchResultItem}>
                        <b>{result.business_name}</b>
                        <small>{result.category}</small>
                      </div>
                    </Link>
                  ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default DiscoverPage;
