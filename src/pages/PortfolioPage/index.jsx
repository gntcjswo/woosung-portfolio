import { useEffect } from 'react';
import { ProjectGrid } from '@/components/ProjectGrid';
import { ProjectModal } from '@/components/ProjectModal';
import { useProjects } from '@/hooks/useProjects';
import { useFilterStore } from '@/stores/useFilterStore';
import styles from './PortfolioPage.module.scss';

export function PortfolioPage() {
  const clearFilters = useFilterStore((s) => s.clearFilters);
  useEffect(() => { clearFilters(); }, [clearFilters]);
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.pageHeader}>
          <h1 className={styles.heading}>Portfolio</h1>
          <p className={styles.subHeading}>
            2015년부터 쌓아온 경험으로 완성된 프로젝트들
          </p>
        </header>
        <ProjectGrid useData={useProjects} />
      </div>
      <ProjectModal />
    </main>
  );
}
