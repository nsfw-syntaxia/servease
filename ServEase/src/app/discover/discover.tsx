"use client";

import type { NextPage } from "next";
import { useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "../styles/DiscoverPage.module.css";

const DiscoverPage: NextPage = () => {
  const router = useRouter();

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
      </div>
    </div>
  );
};

export default DiscoverPage;
