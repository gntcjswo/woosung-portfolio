import { useMemo } from 'react';
import { useFilterStore } from '@/stores/useFilterStore';
import { ProjectCard } from '@/components/ProjectCard';
import { FilterBar } from '@/components/FilterBar';
import { Spinner } from '@/components/Spinner';
import styles from './ProjectGrid.module.scss';

export function ProjectGrid({ useData, variant = 'portfolio' }) {
  const { data: projects, isLoading, isError } = useData();
  const { selectedTags, searchQuery } = useFilterStore();

  const filtered = useMemo(() => {
    if (!projects) return [];
    return projects.filter((project) => {
      const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => project.tags.includes(tag));
      return matchesSearch && matchesTags;
    });
  }, [projects, searchQuery, selectedTags]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div className={styles.errorState} role="alert">
        <p>데이터를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  return (
    <section aria-label="프로젝트 목록">
      <FilterBar variant={variant} />
      <div className={styles.resultInfo} aria-live="polite" aria-atomic="true">
        <span className={styles.count}>{filtered.length}</span>
        <span className={styles.countLabel}>개의 프로젝트</span>
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty} role="status">
          <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" />
            <path d="M16 24h16M24 16v16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <p>조건에 맞는 프로젝트가 없습니다.</p>
        </div>
      ) : (
        <ul className={styles.grid}>
          {filtered.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
