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
    </div>
  );
};

export default SpecificCategoryClientPage;
