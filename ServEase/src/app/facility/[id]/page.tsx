"use client";

import type { NextPage } from "next";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { createClient } from "../../lib/supabase/client";

import styles from "../../styles/facilitydetails.module.css"; 

// --- TYPE DEFINITIONS ---
interface Profile {
  id: string;
  business_name: string;
  address: string;
  contact_number: string;
  category: string;
  working_days: string[];
  start_time: string;
  end_time: string;
  facility_image_url: string | null;
  // Assuming you have an email field in your profiles table
  email?: string; 
}

interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  author: {
    full_name: string;
    avatar_url: string;
  };
}

interface LoggedInUser {
    id: string;
    avatar_url: string | null;
}

// --- HELPER COMPONENTS ---

// A reusable component to display star ratings
const StarRating = ({ rating, size = 20 }: { rating: number; size?: number }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<Image key={i} src="/Star 31.svg" alt="full star" width={size} height={size} />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      // This is a placeholder for a half-star image if you have one
      stars.push(<Image key={i} src="/Star 4.svg" alt="half star" width={size} height={size} />);
    } else {
      stars.push(<Image key={i} src="/Star 4.svg" alt="empty star" width={size} height={size} />);
    }
  }
  return <div className={styles.starRatingContainer}>{stars}</div>;
};


// --- DYNAMICALLY IMPORTED MAP ---
const Map = dynamic(() => import("./Map"), { 
  ssr: false,
  loading: () => <div className={styles.mapLoading}>Loading map...</div> 
});


// --- MAIN PAGE COMPONENT ---
const FacilityDetailsPage: NextPage = () => {
  const router = useRouter();
  const params = useParams();
  const facilityId = params.id as string;

  // --- STATE MANAGEMENT ---
  const [facility, setFacility] = useState<Profile | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [relatedFacilities, setRelatedFacilities] = useState<Profile[]>([]);
  const [currentUser, setCurrentUser] = useState<LoggedInUser | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [reviewPage, setReviewPage] = useState(1);

  // --- DATA FETCHING ---
  useEffect(() => {
    const fetchData = async () => {
      if (!facilityId) {
        setError("Facility ID is missing.");
        setLoading(false);
        return;
      }
      
      const supabase = createClient();
      setLoading(true);

      try {
        // Fetch all data in parallel for performance
        const [userRes, facilityRes] = await Promise.all([
            supabase.auth.getUser(),
            supabase.from('profiles').select('*').eq('id', facilityId).eq('role', 'provider').single(),
        ]);

        // 1. Set current user
        if (userRes.data.user) {
            setCurrentUser({
                id: userRes.data.user.id,
                avatar_url: userRes.data.user.user_metadata.avatar_url,
            });
        }
        
        // 2. Set facility data
        if (facilityRes.error) throw facilityRes.error;
        if (!facilityRes.data) throw new Error("Facility not found.");
        setFacility(facilityRes.data);

        // --- MOCK DATA (Replace with real fetches) ---
        // TODO: Create a 'services' table linked to profiles and fetch real services
        const mockServices: Service[] = [
          { id: '1', name: 'Standard Haircut', price: 350.00, description: '...' },
          { id: '2', name: 'Haircut with Wash', price: 450.00, description: '...' },
          { id: '3', name: 'Beard Trim', price: 200.00, description: '...' },
          { id: '4', name: 'Hot Towel Shave', price: 500.00, description: '...' },
        ];
        setServices(mockServices);
        if(mockServices.length > 0) setActiveService(mockServices[0]);

        // TODO: Create a 'reviews' table linked to profiles and fetch real reviews
        const mockReviews: Review[] = [
          { id: 'r1', rating: 5, comment: 'Amazing service! Very professional and clean. Will definitely come back.', created_at: '2023-10-26T10:00:00Z', author: { full_name: 'John Doe', avatar_url: '/avatar.svg' } },
          { id: 'r2', rating: 4, comment: 'Good haircut, but the wait was a bit long. Overall a great experience.', created_at: '2023-10-25T14:30:00Z', author: { full_name: 'Jane Smith', avatar_url: '/avatar.svg' } },
        ];
        setReviews(mockReviews);

        // TODO: Fetch real related facilities (e.g., same category, nearby)
        const mockRelated: Profile[] = []; // You can add mock data here if needed
        setRelatedFacilities(mockRelated);

      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message || "Could not load facility details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [facilityId]);
  
  // --- HELPERS & MEMOS ---
  const formatTime = (timeString: string | null) => {
    if (!timeString) return "N/A";
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };
  
  const facilityImage = useMemo(() => facility?.facility_image_url || "/placeholder.jpg", [facility]);
  const averageRating = useMemo(() => {
      if (!reviews || reviews.length === 0) return 0;
      const total = reviews.reduce((acc, review) => acc + review.rating, 0);
      return (total / reviews.length).toFixed(1);
  }, [reviews]);


  // --- RENDER LOGIC ---
  if (loading) return <div className={styles.centeredMessage}>Loading...</div>;
  if (error) return <div className={styles.centeredMessage}>{error}</div>;
  if (!facility) return <div className={styles.centeredMessage}>Facility not found.</div>;

  return (
    <div className={styles.facilityDetailsParent}>
      <div className={styles.facilityDetails}>
        <div className={styles.navigation}>
          {/* ... (Your static nav JSX can go here, but with dynamic avatar) ... */}
          <Link href="/home" className={styles.logoLink}>
            <Image className={styles.serveaseLogoAlbumCover3} width={40} height={40} alt="ServEase Logo" src="/landingLogo.svg" />
            <div className={styles.servease}><span className={styles.serv}>serv</span><b>ease</b></div>
          </Link>
          <div className={styles.navigationChild} />
          <div className={styles.homeParent}>
            <Link href="/home" className={styles.home}>Home</Link>
            <div className={styles.home}>Discover</div>
            <div className={styles.contactUs}>Contact Us</div>
          </div>
          <div className={styles.navigationChild} />
          <Image className={styles.avatar} width={40} height={40} alt="User Avatar" src={currentUser?.avatar_url || "/avatar.svg"} />
        </div>

        <div className={styles.frameParent}>
          <div className={styles.image7Parent}>
            <div className={styles.image7}><Image src={facilityImage} alt={`${facility.business_name} main view`} layout="fill" objectFit="cover" /></div>
            <div className={styles.image7Group}>
              {/* Image gallery can be made dynamic later */}
              <div className={styles.image71}><Image src={facilityImage} alt="Gallery view 1" layout="fill" objectFit="cover" /></div>
              <div className={styles.image71}><Image src={facilityImage} alt="Gallery view 2" layout="fill" objectFit="cover" /></div>
              <div className={styles.image71}><Image src={facilityImage} alt="Gallery view 3" layout="fill" objectFit="cover" /></div>
            </div>
          </div>

          <div className={styles.frameGroup}>
            <div className={styles.barbershopParent}>
              <div className={styles.barbershop}>{facility.category}</div>
              <h1>{facility.business_name}</h1>
              
              <div className={styles.groupContainer}>
                <div className={styles.parent}>
                  <b className={styles.kReviews}>{averageRating}</b>
                  <StarRating rating={parseFloat(averageRating)} size={25} />
                </div>
                <div className={styles.kReviewsWrapper}>
                  <b className={styles.kReviews}>({reviews.length} Reviews)</b>
                </div>
              </div>
              
              <div className={styles.paraContentWrapper}>
                <div className={styles.paraContent1}>
                  <Image src="/location-point.svg" width={25} height={25} alt="Location" />
                  <div className={styles.nBacalsoAve}>{facility.address}</div>
                </div>
              </div>

              <div className={styles.paraContentParent}>
                <div className={styles.paraContent1}>
                  <Image src="/Phone.svg" width={20.7} height={20.8} alt="Phone" />
                  <div className={styles.nBacalsoAve}>{facility.contact_number}</div>
                </div>
                {facility.email && (
                  <div className={styles.paraContent1}>
                    <Image src="/Mail.svg" width={20.8} height={16.7} alt="Email" />
                    <div className={styles.nBacalsoAve}>{facility.email}</div>
                  </div>
                )}
              </div>
              
              <Image className={styles.dividerIcon1} width={629} height={1} alt="" src="/Divider1.svg" />
              
              <div className={styles.paraContentContainer}><b className={styles.workSchedule}>Work Schedule</b></div>
              <div className={styles.buttonGroup}>
                <div className={styles.button1}><div className={styles.mondayFriday}>{facility.working_days.join(' & ')}</div></div>
                <div className={styles.paraContent7}><div className={styles.nBacalsoAve}>{`${formatTime(facility.start_time)} - ${formatTime(facility.end_time)}`}</div></div>
              </div>

              <Image className={styles.dividerIcon2} width={629} height={1} alt="" src="/Divider1.svg" />
              
              <div className={styles.paraContentFrame}><b className={styles.workSchedule}>Available Services</b></div>
              {activeService && (
                <div className={styles.frameDiv}>
                  <b className={styles.b}>₱{activeService.price.toFixed(2)}</b>
                </div>
              )}

              <div className={styles.buttonContainer}>
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={`${styles.button3} ${activeService?.id === service.id ? styles.active : ''}`}
                    onClick={() => setActiveService(service)}
                  >
                    <div className={styles.mondayFriday}>{service.name}</div>
                  </div>
                ))}
              </div>
            </div>
            <Image className={styles.dividerIcon3} width={629} height={1} alt="" src="/Divider1.svg" />
            
            <div className={styles.buttonParent2}>
              <div className={styles.button9} onClick={() => setIsLiked(!isLiked)}>
                <Image src={isLiked ? "/Heart1.svg" : "/Heart.svg"} alt="Favorite" width={30.5} height={26.6} />
                <div className={styles.favorite11k}>Favorite</div>
              </div>
              <div className={styles.button4} onClick={() => router.push(`/appointment-booking/${facility.id}`)}>
                <div className={styles.mondayFriday}>Book Now</div>
              </div>
            </div>
          </div>
        </div>
        
        <section id="location">
          <div className={styles.whatweofferbox}>
            <div className={styles.location}>
              <b className={styles.location1}>Location</b>
              <div className={styles.paraContentWrapper1}>
                <div className={styles.paraContent6}><div className={styles.nBacalsoAve}>{facility.address}</div></div>
              </div>
              <div className={styles.paraContent14} />
              <div className={styles.map}><Map address={facility.address} facilityName={facility.business_name} /></div>
            </div>
          </div>
        </section>

        <div className={styles.location2}>
          <section id="ratings"><b className={styles.serviceRatings}>Service Ratings</b></section>
          <div className={styles.paraContent14} />
          
          <div className={styles.group}>
            <div className={styles.parent2}>
              <b className={styles.b8}>{averageRating}</b>
              <div className={styles.outOf5}>Out of 5</div>
            </div>
            {/* You can create a dynamic SVG here if you want */}
            <Image className={styles.icon5} width={160} height={160} alt="" src="/75.svg" />
            <div className={styles.paraContentGroup}>
              <b className={styles.workSchedule}>{reviews.length} Reviews</b>
            </div>
          </div>
          
          {reviews.map(review => (
            <div key={review.id} className={styles.locationInner}>
              <div className={styles.frameContainer}>
                <div className={styles.paraContentParent1}>
                  <div className={styles.paraContent19}>
                    <div className={styles.xxxxxxxx}>{new Date(review.created_at).toLocaleDateString()}</div>
                  </div>
                  <div className={styles.paraContent19}>
                    <StarRating rating={review.rating} size={20} />
                    <div className={styles.name}>{review.author.full_name}</div>
                  </div>
                </div>
                <div className={styles.paraContentWrapper2}>
                  <div className={styles.paraContent21}>
                    <div className={styles.blahBlahBlah}>{review.comment}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacilityDetailsPage;