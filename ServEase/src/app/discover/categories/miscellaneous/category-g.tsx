"use client";

import { useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../../../styles/discover-2-g.module.css";
import { createClient } from "../../../utils/supabase/client";

interface Profile {
  id: string;
  business_name: string;
  full_name: string;
  address: string;
  facility_image_url: string | null;
  avatar_url: string | null;
  created_at: string;
  rating: number;
}

interface SearchResult {
  id: string;
  business_name: string;
  specific_category: string; 
}

const PopularServiceCard = ({ service }: { service: Profile }) => {
  const router = useRouter();
  return (
    <div
      className={styles.serviceCard}
      onClick={() => router.push(`/facility/${service.id}`)}
    >
      <div className={styles.serviceImage}>
        <Image
          src={service.facility_image_url || "/placeholder-facility.jpg"}
          alt={service.business_name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={styles.serviceCardContent}>
        <div className={styles.serviceProvider}>
          <div className={styles.providerAvatar}>
            <Image
              src={service.avatar_url || "/avatar.svg"}
              alt={service.full_name}
              layout="fill"
              objectFit="cover"
              className={styles.avatarImage}
            />
          </div>
          <div className={styles.providerInfo}>
            <h3 className={styles.providerName}>{service.business_name}</h3>
            <div className={styles.rating}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <Image
                    key={i}
                    width={20}
                    height={20}
                    sizes="100vw"
                    src={
                      i < Math.round(service.rating)
                        ? "/Star 3.svg"
                        : "/Star 4.svg"
                    }
                    alt="Star"
                  />
                ))}
              </div>
              <span className={styles.ratingScore}>
                {service.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedServiceCard = ({ service }: { service: Profile }) => {
  const router = useRouter();
  return (
    <div
      className={styles.serviceCard}
      onClick={() => router.push(`/facility/${service.id}`)}
    >
      <div className={styles.serviceImage}>
        <Image
          src={service.facility_image_url || "/placeholder-facility.jpg"}
          alt={service.business_name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={styles.serviceCardContent}>
        <div className={styles.serviceProvider}>
          <div className={styles.providerAvatar}>
            <Image
              src={service.avatar_url || "/avatar.svg"}
              alt={service.full_name}
              layout="fill"
              objectFit="cover"
              className={styles.avatarImage}
            />
          </div>
          <div className={styles.providerInfo}>
            <h3 className={styles.providerName}>{service.business_name}</h3>
            <div className={styles.rating}>
              <span className={styles.ratingScore}>{service.address}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AllServiceCard = ({ service }: { service: Profile }) => {
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
              src={service.avatar_url || "/avatar.svg"}
              alt={service.full_name}
              layout="fill"
              objectFit="cover"
              className={styles.avatarImage}
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

const MS: NextPage<{
  initialPopularServices: Profile[];
  initialNewServices: Profile[];
  initialAllServices: Profile[];
}> = ({ initialPopularServices, initialNewServices, initialAllServices }) => {
  const router = useRouter();

  const top6PopularServices = initialPopularServices.slice(0, 6);
  const top6NewServices = initialNewServices.slice(0, 6);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex1, setCurrentIndex1] = useState(0);
  const visibleServices = 3;
  const visibleServices1 = 3;

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Search functionality
  useEffect(() => {
    // Debounce to prevent firing queries on every keystroke
    const debounceSearch = setTimeout(async () => {
      const trimmedSearchTerm = searchTerm.trim();
      if (trimmedSearchTerm.length > 0) {
        setIsSearching(true);
        setSearchResults([]);

        const supabase = createClient();

        // Search specifically in Personal Beauty and Care category
        const { data, error } = await supabase
          .from("profiles")
          .select("id, business_name, specific_category")
          .eq("category", "Personal Care & Beauty Services")
          .or(
            `business_name.ilike.%${trimmedSearchTerm}%,tags.ilike.%${trimmedSearchTerm}%,specific_category.ilike.%${trimmedSearchTerm}%`
          )
          .limit(10);

        if (error) {
          console.error("Error fetching search results:", error);
          setSearchResults([]);
        } else {
          console.log("Search results received:", data);
          setSearchResults(data || []);
        }
        setIsSearching(false);
      } else {
        setSearchResults([]); // Clear results if search is empty
        setIsSearching(false);
      }
    }, 300); // 300ms delay

    return () => clearTimeout(debounceSearch);
  }, [searchTerm]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchTerm(""); // Clear search to hide dropdown
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchContainerRef]);

  const handleNext = () => {
    if (currentIndex < top6PopularServices.length - visibleServices) {
      setCurrentIndex((prevIndex) => prevIndex + 3);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 3);
    }
  };

  const handleNext1 = () => {
    if (currentIndex1 < top6NewServices.length - visibleServices1) {
      setCurrentIndex1((prevIndex1) => prevIndex1 + 3);
    }
  };

  const handlePrev1 = () => {
    if (currentIndex1 > 0) {
      setCurrentIndex1((prevIndex1) => prevIndex1 - 3);
    }
  };

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
          <div className={styles.personalBeautyAnd}>Miscellaneous Services</div>
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
              placeholder="Search in Personal Beauty and Care..."
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
                        <small>{result.specific_category}</small>
                      </div>
                    </Link>
                  ))}
              </div>
            )}
        </div>

        <div className={styles.icons}>
          <Link
            href={{
              pathname: "/specific-category",
              query: { name: "Funeral Homes" },
            }}
          >
            <div className={styles.iconContainer}>
              <div className={styles.iconWrapper}>
                <Image
                  className={styles.funeralIcon}
                  src="/Funeral Homes.svg"
                  alt=""
                  width={75}
                  height={75}
                />
              </div>
              <div className={styles.label}>Funeral Homes</div>
            </div>
          </Link>
          <Link
            href={{ pathname: "/specific-category", query: { name: "Hotels" } }}
          >
            <div className={styles.iconContainer}>
              <div className={styles.iconWrapper}>
                <Image
                  className={styles.hotelIcon}
                  src="/Hotels.svg"
                  alt=""
                  width={75}
                  height={75}
                />
              </div>
              <div className={styles.label}>Hotels</div>
            </div>
          </Link>
          <Link
            href={{
              pathname: "/specific-category",
              query: { name: "Laundry Shops" },
            }}
          >
            <div className={styles.iconContainer}>
              <div className={styles.iconWrapper}>
                <Image
                  className={styles.laundryIcon}
                  src="/Laundry Shops.svg"
                  alt=""
                  width={75}
                  height={75}
                />
              </div>
              <div className={styles.label}>Laundry Shops</div>
            </div>
          </Link>
          <Link
            href={{
              pathname: "/specific-category",
              query: { name: "Tailor & Dress Shops" },
            }}
          >
            <div className={styles.iconContainer}>
              <div className={styles.iconWrapper}>
                <Image
                  className={styles.maniqIcon}
                  src="/Tailor & Dress Shops.svg"
                  alt=""
                  width={75}
                  height={75}
                />
              </div>
              <div className={styles.label}>Tailor & Dress Shops</div>
            </div>
          </Link>
        </div>
      </div>

      <div className={styles.popularServices}>
        <b className={styles.allServices1}>
          <span>Popular</span>
          <span className={styles.services}> Services</span>
        </b>
        <div className={styles.servicesCarousel}>
          {currentIndex > 0 && (
            <button
              className={`${styles.carouselButton} ${styles.prevButton}`}
              onClick={handlePrev}
            >
              <Image
                width={28}
                height={28}
                src="/Chevron right.svg"
                alt="Previous"
              />
            </button>
          )}
          <div className={styles.carouselViewport}>
            <div
              className={styles.carouselTrack}
              style={{
                transform: `translateX(calc(-${
                  currentIndex * (100 / visibleServices)
                }%))`,
              }}
            >
              {top6PopularServices.map((service) => (
                <PopularServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
          {currentIndex < top6PopularServices.length - visibleServices && (
            <button
              className={`${styles.carouselButton} ${styles.nextButton}`}
              onClick={handleNext}
            >
              <Image
                width={28}
                height={28}
                src="/Chevron right.svg"
                alt="Next"
              />
            </button>
          )}
        </div>
        <div className={styles.line1} />
      </div>

      <div className={styles.newServices}>
        <b className={styles.allServices1}>
          <span>New</span>
          <span className={styles.services}> Services</span>
        </b>
        <div className={styles.servicesCarousel}>
          {currentIndex1 > 0 && (
            <button
              className={`${styles.carouselButton} ${styles.prevButton}`}
              onClick={handlePrev1}
            >
              <Image
                width={28}
                height={28}
                src="/Chevron right.svg"
                alt="Previous"
              />
            </button>
          )}
          <div className={styles.carouselViewport}>
            <div
              className={styles.carouselTrack}
              style={{
                transform: `translateX(calc(-${
                  currentIndex1 * (100 / visibleServices1)
                }%))`,
              }}
            >
              {top6NewServices.map((service) => (
                <FeaturedServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
          {currentIndex1 < top6NewServices.length - visibleServices1 && (
            <button
              className={`${styles.carouselButton} ${styles.nextButton}`}
              onClick={handleNext1}
            >
              <Image
                width={28}
                height={28}
                src="/Chevron right.svg"
                alt="Next"
              />
            </button>
          )}
        </div>
        <div className={styles.line1} />
      </div>

      <div className={styles.allServices}>
        <b className={styles.allServices1}>
          <span>All</span>
          <span className={styles.services}> Services</span>
        </b>
        <div className={styles.allView}>
          <div className={styles.allCards}>
            {chunkArray(initialAllServices, 2).map((row, rowIndex) => (
              <div className={styles.cards} key={rowIndex}>
                {row.map((service) => (
                  <AllServiceCard key={service.id} service={service} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MS;
