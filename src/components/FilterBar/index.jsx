import { useFilterStore } from '@/stores/useFilterStore';
import styles from './FilterBar.module.scss';

const PORTFOLIO_TAGS = [
  'React', 'TypeScript', 'Next.js', 'HTML5', 'CSS3', 'SCSS',
  'jQuery', 'JavaScript', 'Canvas', '반응형', '이벤트',
];

const PERSONAL_TAGS = [
  'React', 'JavaScript', 'HTML5', 'CSS3', 'SCSS',
  'Node.js', 'Firebase', 'Vite', 'Bootstrap', 'Lottie',
  'API', 'GSAP', 'GitHub Actions', '오픈소스',
];

export function FilterBar({ variant = 'portfolio' }) {
  const { selectedTags, searchQuery, toggleTag, setSearchQuery, clearFilters } = useFilterStore();
  const hasActiveFilter = selectedTags.length > 0 || searchQuery.length > 0;
  const tags = variant === 'personal' ? PERSONAL_TAGS : PORTFOLIO_TAGS;

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchRow}>
        <div className={styles.searchBox}>
          <svg className={styles.searchIcon} viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M8.5 3a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 8.5a6.5 6.5 0 1111.6 4.01l3.7 3.7a.75.75 0 11-1.06 1.06l-3.7-3.7A6.5 6.5 0 012 8.5z"
              fill="currentColor"
            />
          </svg>
          <input
            type="search"
            className={styles.searchInput}
            placeholder="프로젝트 이름으로 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="프로젝트 검색"
          />
        </div>
        {hasActiveFilter && (
          <button className={styles.clearBtn} onClick={clearFilters} aria-label="필터 초기화">
            초기화
          </button>
        )}
      </div>

      <div className={styles.tagRow} role="group" aria-label="기술 스택 필터">
        {tags.map((tag) => {
          const isChecked = selectedTags.includes(tag);
          return (
            <label key={tag} className={`${styles.tag} ${isChecked ? styles.tagActive : ''}`}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={isChecked}
                onChange={() => toggleTag(tag)}
                aria-label={`${tag} 필터`}
              />
              {tag}
            </label>
          );
        })}
      </div>
    </div>
  );
}
