import { useEffect } from 'react';
import { ProjectGrid } from '@/components/ProjectGrid';
import { ProjectModal } from '@/components/ProjectModal';
import { usePersonalProjects } from '@/hooks/usePersonalProjects';
import { useFilterStore } from '@/stores/useFilterStore';
import { usePageAnimation } from '@/hooks/usePageAnimation';
import styles from './PersonalPage.module.scss';

export function PersonalPage() {
  const clearFilters = useFilterStore((s) => s.clearFilters);
  const pageHeaderRef = usePageAnimation();
  useEffect(() => {
    clearFilters();
  }, [clearFilters]);
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <header ref={pageHeaderRef} className={styles.pageHeader}>
          <h1 className={styles.heading}>Personal</h1>
          <p className={styles.subHeading}>개인적으로 진행한 사이드 프로젝트와 실험적인 작업들입니다.</p>
        </header>
        <ProjectGrid useData={usePersonalProjects} variant='personal' />
      </div>
      <ProjectModal />
    </main>
  );
}
