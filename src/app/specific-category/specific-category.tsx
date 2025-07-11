"use client";

import { useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../styles/specific-category.module.css";
import { createClient } from "../utils/supabase/client";

interface Profile {
  id: string;
  business_name: string;
  full_name: string;
  address: string;
  facility_image_url: string | null;
  avatar_url: string | null;
  created_at: string;
  rating: number;
  tags?: string | null;
}

interface SearchResult {
  id: string;
  business_name: string;
  address: string;
}

const AllServiceCard = ({
  service,
  iconName,
}: {
  service: Profile;
  iconName: string;
}) => {
  const router = useRouter();
  return (
    <div className={styles.service}>
      <div className={styles.image}>
        <Image
          src={service.facility_image_url || "/placeholder-facility.jpg"}
          alt={service.business_name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={styles.info}>
        <div className={styles.avatar}>
          <div className={styles.avatar1}>
            <Image
              className={styles.icons}
              width={35}
              height={35}
              alt={iconName}
              src={`/${iconName}.svg`}
            />
          </div>
          <div className={styles.avatar5}>
            <div className={styles.serviceFacilityNameParent}>
              <div className={styles.serviceFacilityName}>
                {service.business_name}
              </div>
              <div className={styles.location}>{service.address}</div>
            </div>
            <div className={styles.avatar2} />
            <div className={styles.avatar3}>
              <div className={styles.groupParent}>
                <div className={styles.parent}>
                  <div className={styles.div}>{service.rating.toFixed(1)}</div>
                  <Image
                    className={styles.groupChild}
                    width={23.7}
                    height={20}
                    sizes="100vw"
                    alt=""
                    src="/starFilled.svg"
                  />
                </div>
                <div
                  className={styles.link}
                  onClick={() => router.push(`/facility/${service.id}`)}
                >
                  <div className={styles.viewDetails}>View Details</div>
                  <Image
                    className={styles.svgIcon}
                    width={14}
                    height={14}
                    sizes="100vw"
                    alt=""
                    src="/gs2.svg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SpecificCategoryClientPage: NextPage<{
  services: Profile[];
  subCategoryName: string;
}> = ({ services, subCategoryName }) => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Debounce function to prevent API calls on every keystroke
    const debounceSearch = setTimeout(async () => {
      const trimmedSearchTerm = searchTerm.trim();
      if (trimmedSearchTerm.length > 0) {
        setIsSearching(true);
        setSearchResults([]); // Clear previous results

        const supabase = createClient();

        // Query profiles where the specific_category matches,
        // and the business_name or tags contain the search term.
        // The 'ilike' operator is case-insensitive.
        const { data, error } = await supabase
          .from("profiles")
          .select("id, business_name, address")
          .eq("specific_category", subCategoryName)
          .or(
            `business_name.ilike.%${trimmedSearchTerm}%,tags.ilike.%${trimmedSearchTerm}%`
          );

        if (error) {
          console.error("Error fetching search results:", error);
          setSearchResults([]);
        } else {
          setSearchResults(data || []);
        }
        setIsSearching(false);
      } else {
        setSearchResults([]); // Clear results if search term is empty
      }
    }, 300); // 300ms delay

    // Cleanup function to clear the timeout if the user types again
    return () => clearTimeout(debounceSearch);
  }, [searchTerm, subCategoryName]);

  // --- HOOK TO CLOSE DROPDOWN ON OUTSIDE CLICK ---
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchTerm(""); // Clear search term to hide dropdown
        setSearchResults([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchContainerRef]);

  const chunkArray = (arr: any[], size: number) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

   const isDropdownVisible = (isSearching || searchResults.length > 0) && searchTerm.trim().length > 0;

  return (
    <div className={styles.pbacs}>
      <div className={styles.bg}>
        <div className={styles.heroImg}>
          <Image
            width={1300}
            height={331}
            alt={subCategoryName}
            src={`/${subCategoryName}.png`}
          />
          <div className={styles.personalBeautyAnd}>{subCategoryName}</div>
        </div>
        <div 
          ref={searchContainerRef}
          className={`${styles.searchBox} ${isDropdownVisible ? styles.searchBoxActive : ''}`}
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
              placeholder="Enter a Service Name or Tag"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoComplete="off" // Prevent browser's default autocomplete
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
                        <small>{result.address}</small>
                      </div>
                    </Link>
                  ))}
              </div>
            )}
        </div>
      </div>

      <div className={styles.allServices}>
        <b className={styles.allServices1}>
          <span>All</span>
          <span className={styles.services}> Services</span>
        </b>
        <div className={styles.allView}>
          <div className={styles.allCards}>
            {chunkArray(services, 2).map((row, rowIndex) => (
              <div className={styles.cards} key={rowIndex}>
                {row.map((service) => (
                  <AllServiceCard
                    key={service.id}
                    service={service}
                    iconName={subCategoryName}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificCategoryClientPage;
