"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "../styles/shared-header.module.css";
import { type UserRole } from "../layout"; 

interface HeaderProps {
  avatarUrl: string;
  userRole: UserRole;
  homePath: string;
}

const Header = ({ avatarUrl, userRole, homePath }: HeaderProps) => {
  const router = useRouter();

  return (
    <header className={styles.navigation}>
      <div className={styles.navBrand}>
        <Image
              className={styles.logoIcon}
              width={40}
              height={40}
              alt="Servease Logo"
              src="/Servease Logo.svg"
            />
            <div className={styles.logoText}>
              <span className={styles.serv}>serv</span>
              <span className={styles.ease}>ease</span>
            </div>
      </div>
      <nav className={styles.navLinks}>
        {userRole === 'guest' && (
          <>
          <a className={styles.navLink} onClick={() => router.push(homePath)}>
          Home
        </a>
            <a className={styles.navLink} onClick={() => router.push('/discover')}>Discover</a>
          </>
        )}
        

        {userRole === 'client' && (
          <>
          <a className={styles.navLink} onClick={() => router.push(homePath)}>
          Home
        </a>
            <a className={styles.navLink} onClick={() => router.push('/discover')}>Discover</a>
          </>
        )}
        
        {userRole === 'provider' && (
           <>
             <a className={styles.navLink} onClick={() => router.push('/provider/schedule')}>Schedule</a>
           </>
        )}

        <a className={styles.navLink} onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}>
          Contact Us
        </a>
      </nav>

      {/* Conditionally render the avatar or a "Login" button */}
      <div className={styles.userActions}>
        {userRole === 'guest' ? (
          <button className={styles.loginButton} onClick={() => router.push('/login')}>
            Sign in
          </button>
        ) : (
          <div className={styles.userAvatar}>
            <Image
              key={avatarUrl}
              className={styles.avatarIcon}
              width={40}
              height={40}
              alt="User Avatar"
              src={avatarUrl}
              // Optional: make avatar a link to a profile page
              onClick={() => router.push('/profile')}
              style={{ cursor: 'pointer' }}
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;