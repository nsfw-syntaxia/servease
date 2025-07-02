// app/categories/personal-beauty-and-care/ClientPage.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../../../styles/discover-2-a.module.css";

// --- TYPE DEFINITION ---
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

// --- DYNAMIC CARD COMPONENTS (RESTORED TO MATCH OLD UI EXACTLY) ---

const PopularServiceCard = ({ service }: { service: Profile }) => {
  const router = useRouter();
  return (
    <div className={styles.serviceCard} onClick={() => router.push(`/facility/${service.id}`)}>
      <div className={styles.serviceImage}>
        <Image src={service.facility_image_url || '/placeholder.jpg'} alt={service.business_name} layout="fill" objectFit="cover" />
      </div>
      <div className={styles.serviceCardContent}>
        <div className={styles.serviceProvider}>
          <div className={styles.providerAvatar}>
             <Image src={service.avatar_url || '/avatar.svg'} alt={service.full_name} layout="fill" objectFit="cover" className={styles.avatarImage}/>
          </div>
          <div className={styles.providerInfo}>
            <h3 className={styles.providerName}>{service.business_name}</h3>
            <div className={styles.rating}>
              <div className={styles.stars}>
                {/* Simplified star logic for exact UI match */}
                {[...Array(5)].map((_, i) => (
                  <Image key={i} width={20} height={20} src={i < Math.round(service.rating) ? "/Star 3.svg" : "/Star 4.svg"} alt="Star" />
                ))}
              </div>
              <span className={styles.ratingScore}>{service.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Renamed to 'NewServiceCard' to match the section name
const NewServiceCard = ({ service }: { service: Profile }) => {
  const router = useRouter();
  return (
    <div className={styles.serviceCard} onClick={() => router.push(`/facility/${service.id}`)}>
      <div className={styles.serviceImage}>
        <Image src={service.facility_image_url || '/placeholder.jpg'} alt={service.business_name} layout="fill" objectFit="cover" />
      </div>
      <div className={styles.serviceCardContent}>
        <div className={styles.serviceProvider}>
          <div className={styles.providerAvatar}>
             <Image src={service.avatar_url || '/avatar.svg'} alt={service.full_name} layout="fill" objectFit="cover" className={styles.avatarImage}/>
          </div>
          <div className={styles.providerInfo}>
            <h3 className={styles.providerName}>{service.business_name}</h3>
            <div className={styles.rating}>
              {/* Using address as per original 'featured' card */}
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
         <Image src={service.facility_image_url || '/placeholder.jpg'} alt={service.business_name} layout="fill" objectFit="cover" />
      </div>
      <div className={styles.info}>
        <div className={styles.avatar}>
          <div className={styles.avatar1}>
            <Image src={service.avatar_url || '/avatar.svg'} alt={service.full_name} layout="fill" objectFit="cover" className={styles.avatarImage}/>
          </div>
          <div className={styles.avatar5}>
            <div className={styles.serviceFacilityNameParent}>
              <div className={styles.serviceFacilityName}>{service.business_name}</div>
              <div className={styles.location}>{service.address}</div>
            </div>
            <div className={styles.avatar2} />
            <div className={styles.avatar3}>
              <div className={styles.groupParent}>
                <div className={styles.parent}>
                  <div className={styles.div}>{service.rating.toFixed(1)}</div>
                  <Image className={styles.groupChild} width={23.7} height={20} alt="" src="/starFilled.svg" />
                </div>
                <div className={styles.link} onClick={() => router.push(`/facility/${service.id}`)}>
                  <div className={styles.viewDetails}>View Details</div>
                  <Image className={styles.svgIcon} width={14} height={14} alt="" src="/gs2.svg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN CLIENT COMPONENT ---
export default function ClientPage({
  initialPopularServices,
  initialNewServices,
  initialAllServices,
}: {
  initialPopularServices: Profile[];
  initialNewServices: Profile[];
  initialAllServices: Profile[];
}) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex1, setCurrentIndex1] = useState(0);
  const visibleServices = 3;
  const visibleServices1 = 3;

  useEffect(() => {
    // ... (Your existing useEffect for dropdown)
  }, []);

  const handleNext = () => {
    if (currentIndex < initialPopularServices.length - visibleServices) {
      setCurrentIndex((prevIndex) => prevIndex + 1); // Changed back to +1 for smoother carousel
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1); // Changed back to -1
    }
  };

  const handleNext1 = () => {
    if (currentIndex1 < initialNewServices.length - visibleServices1) {
      setCurrentIndex1((prevIndex1) => prevIndex1 + 1);
    }
  };

  const handlePrev1 = () => {
    if (currentIndex1 > 0) {
      setCurrentIndex1((prevIndex1) => prevIndex1 - 1);
    }
  };

  return (
    <div className={styles.pbacs}>
         <div className={styles.bg}>
        {/* hero img */}
        <div className={styles.heroImg}>
          <div className={styles.personalBeautyAnd}>
            Personal Beauty and Care Services
          </div>
        </div>

        {/* search */}
        <div className={styles.searchBox}>
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
            />
          </div>
        </div>

        {/* icons */}
        <div className={styles.icons}>
          <Link
            href={{
              pathname: "/specific-category",
              query: { name: "Barbershops" },
            }}
          >
            <div className={styles.iconContainer}>
              <div className={styles.iconWrapper}>
                <Image
                  className={styles.barbershopIcon}
                  src="/Barbershops.svg"
                  alt=""
                  width={75}
                  height={75}
                />
              </div>
              <div className={styles.label}>Barbershops</div>
            </div>
          </Link>

          <Link
            href={{
              pathname: "/specific-category",
              query: { name: "Hair Salons" },
            }}
          >
            <div className={styles.iconContainer}>
              <div className={styles.iconWrapper}>
                <Image
                  className={styles.hairSalonIcon}
                  src="/Hair Salons.svg"
                  alt=""
                  width={75}
                  height={75}
                />
              </div>
              <div className={styles.label}>Hair Salons</div>
            </div>
          </Link>

          <Link
            href={{
              pathname: "/specific-category",
              query: { name: "Nail Salons" },
            }}
          >
            <div className={styles.iconContainer}>
              <div className={styles.iconWrapper}>
                <Image
                  className={styles.nailSalonIcon}
                  src="/Nail Salons.svg"
                  alt=""
                  width={75}
                  height={75}
                />
              </div>
              <div className={styles.label}>Nail Salons</div>
            </div>
          </Link>

          <Link
            href={{
              pathname: "/specific-category",
              query: { name: "Spa & Massage Centers" },
            }}
          >
            <div className={styles.iconContainer}>
              <div className={styles.iconWrapper}>
                <Image
                  className={styles.spaIcon}
                  src="/Spa & Massage Centers.svg"
                  alt=""
                  width={75}
                  height={75}
                />
              </div>
              <div className={styles.label}>Spa & Massage Centers</div>
            </div>
          </Link>

          <Link
            href={{
              pathname: "/specific-category",
              query: { name: "Tattoo & Piercing Parlors" },
            }}
          >
            <div className={styles.iconContainer}>
              <div className={styles.iconWrapper}>
                <Image
                  className={styles.piercingIcon}
                  src="/Tattoo & Piercing Parlors.svg"
                  alt=""
                  width={75}
                  height={75}
                />
              </div>
              <div className={styles.label}>Tattoo & Piercing Parlors</div>
            </div>
          </Link>
        </div>
      </div>

        {/* --- POPULAR SERVICES --- */}
        <div className={styles.popularServices}>
            <b className={styles.allServices1}><span>Popular</span><span className={styles.services}> Services</span></b>
            {initialPopularServices.length > 0 ? (
                <div className={styles.servicesCarousel}>
                    {currentIndex > 0 && (
                        <button className={`${styles.carouselButton} ${styles.prevButton}`} onClick={handlePrev}>
                            <Image width={28} height={28} src="/Chevron right.svg" alt="Previous" style={{ transform: 'rotate(180deg)' }}/>
                        </button>
                    )}
                    <div className={styles.carouselViewport}>
                        <div className={styles.carouselTrack} style={{ transform: `translateX(-${currentIndex * (100 / visibleServices)}%)` }}>
                            {initialPopularServices.map((service) => (
                                <PopularServiceCard key={service.id} service={service} />
                            ))}
                        </div>
                    </div>
                    {currentIndex < initialPopularServices.length - visibleServices && (
                        <button className={`${styles.carouselButton} ${styles.nextButton}`} onClick={handleNext}>
                            <Image width={28} height={28} src="/Chevron right.svg" alt="Next" />
                        </button>
                    )}
                </div>
            ) : (
                <div className={styles.noServicesMessage}>No popular services at the moment</div>
            )}
            <div className={styles.line1} />
        </div>

        {/* --- NEW SERVICES --- */}
        <div className={styles.newServices}>
             <b className={styles.allServices1}><span>New</span><span className={styles.services}> Services</span></b>
             {initialNewServices.length > 0 ? (
                <div className={styles.servicesCarousel}>
                    {currentIndex1 > 0 && (
                        <button className={`${styles.carouselButton} ${styles.prevButton}`} onClick={handlePrev1}>
                            <Image width={28} height={28} src="/Chevron right.svg" alt="Previous" style={{ transform: 'rotate(180deg)' }}/>
                        </button>
                    )}
                    <div className={styles.carouselViewport}>
                        <div className={styles.carouselTrack} style={{ transform: `translateX(-${currentIndex1 * (100 / visibleServices1)}%)` }}>
                            {initialNewServices.map((service) => (
                                <NewServiceCard key={service.id} service={service} />
                            ))}
                        </div>
                    </div>
                    {currentIndex1 < initialNewServices.length - visibleServices1 && (
                        <button className={`${styles.carouselButton} ${styles.nextButton}`} onClick={handleNext1}>
                            <Image width={28} height={28} src="/Chevron right.svg" alt="Next" />
                        </button>
                    )}
                </div>
             ) : (
                <div className={styles.noServicesMessage}>No new services at the moment</div>
             )}
             <div className={styles.line1} />
        </div>

        {/* --- ALL SERVICES --- */}
        <div className={styles.allServices}>
            <b className={styles.allServices1}><span>All</span><span className={styles.services}> Services</span></b>
            {initialAllServices.length > 0 ? (
                <div className={styles.allView}>
                    {/* Replicated the original grid structure */}
                    <div className={styles.allCards}>
                        <div className={styles.cards}>
                            {initialAllServices.slice(0, 3).map((service) => <AllServiceCard key={service.id} service={service} />)}
                        </div>
                        <div className={styles.cards}>
                            {initialAllServices.slice(3, 6).map((service) => <AllServiceCard key={service.id} service={service} />)}
                        </div>
                        <div className={styles.cards}>
                            {initialAllServices.slice(6, 9).map((service) => <AllServiceCard key={service.id} service={service} />)}
                        </div>
                    </div>
                    {initialAllServices.length > 9 && (
                        <div className={styles.button}><div className={styles.viewAll}>View All</div></div>
                    )}
                </div>
            ) : (
                <div className={styles.noServicesMessage}>No services available in this category yet</div>
            )}
        </div>
    </div>
  );
}