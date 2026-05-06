import { useEffect } from 'react';
import { ProjectGrid } from '@/components/ProjectGrid';
import { ProjectModal } from '@/components/ProjectModal';
import { useProjects } from '@/hooks/useProjects';
import { useFilterStore } from '@/stores/useFilterStore';
import { usePageAnimation } from '@/hooks/usePageAnimation';
import styles from './PortfolioPage.module.scss';

export function PortfolioPage() {
  const clearFilters = useFilterStore((s) => s.clearFilters);
  const pageHeaderRef = usePageAnimation();
  useEffect(() => {
    clearFilters();
  }, [clearFilters]);
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <header ref={pageHeaderRef} className={styles.pageHeader}>
          <h1 className={styles.heading}>Portfolio</h1>
          <p className={styles.subHeading}>2024년 이후 진행한 프로젝트만 선별하여 수록했습니다.</p>
        </header>
        <ProjectGrid useData={useProjects} />
      </div>
      <ProjectModal />
    </main>
  );
}
