import { useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import styles from './Header.module.scss';

let headerAnimated = false;

const NAV_ITEMS = [
  { label: 'Profile', to: '/profile' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Personal', to: '/personal' },
  { label: 'GitHub', href: 'https://github.com/gntcjswo', external: true },
];

export function Header() {
  const location = useLocation();
  const headerRef = useRef(null);

  useEffect(() => {
    if (headerAnimated || !headerRef.current) return;
    headerAnimated = true;
    gsap.from(headerRef.current, {
      y: -80,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
  }, []);

  return (
    <header ref={headerRef} className={styles.header}>
      <div className={styles.inner}>
        <NavLink to='/' className={styles.logo} aria-label='홈으로 이동'>
          {/* <img src='/img/portfolio/logo.svg' alt='WOOSUNG' width={36} height={36} /> */}
          <span className={styles.logoText}>WOOSUNG</span>
        </NavLink>

        <nav className={styles.nav} aria-label='주요 메뉴'>
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) =>
              item.external ? (
                <li key={item.label} className={styles.githubLink}>
                  <a href={item.href} target='_blank' rel='noopener noreferrer' className={styles.navLink}>
                    {item.label}
                    <span className={styles.externalIcon} aria-hidden='true'>
                      ↗
                    </span>
                  </a>
                </li>
              ) : (
                <li key={item.label}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => {
                      const isPortfolioOnRoot = item.to === '/portfolio' && location.pathname === '/';
                      return `${styles.navLink} ${isActive || isPortfolioOnRoot ? styles.active : ''}`;
                    }}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
