"use client";

import { useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../styles/specific-category.module.css";

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

  const chunkArray = (arr: any[], size: number) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

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

      <div className={styles.footer}>
        <div className={styles.footerChild} />
        <div className={styles.yourTrustedPlatform}>
          Your trusted platform to discover, book, and manage local
          services—anytime, anywhere.
        </div>
        <b className={styles.contactUs}>Contact Us</b>
        <div className={styles.supportserveasecom}>support@servease.com</div>
        <div className={styles.contactNumber}>+63 9XX-XXX-XXXX</div>
        <b className={styles.support}>Support</b>
        <div className={styles.faqs}>FAQs</div>
        <div className={styles.privacyPolicy}>Privacy Policy</div>
        <div className={styles.termsConditions}>{`Terms & Conditions`}</div>
        <div className={styles.aboutUs}>About Us</div>
        <b className={styles.quickLinks}>Quick Links</b>
        <div className={styles.servease} onClick={() => router.push("/home")}>
          <span className={styles.serv}>serv</span>
          <b>ease</b>
        </div>
        <div className={styles.home} onClick={() => router.push("/home")}>
          Home
        </div>
        <div className={styles.discover}>Discover</div>
        <div
          className={styles.createAnAccount}
          onClick={() => router.push("/signup")}
        >
          Create an Account
        </div>
        <div className={styles.lineParent}>
          <div className={styles.lineDiv} />
          <div className={styles.servease2025}>
            servease 2025 © All rights reserved
          </div>
        </div>
        <Image
          className={styles.serveaseLogoAlbumCover31}
          width={40}
          height={40}
          sizes="100vw"
          alt="Servease Logo"
          src="/logo.svg"
          onClick={() => router.push("/home")}
        />
      </div>
    </div>
  );
};

export default SpecificCategoryClientPage;
