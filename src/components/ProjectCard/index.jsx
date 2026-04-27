import { useModalStore } from '@/stores/useModalStore';
import styles from './ProjectCard.module.scss';

export function ProjectCard({ project }) {
  const openModal = useModalStore((s) => s.openModal);

  // thumbnail이 배열이면 첫 번째 이미지를 카드 썸네일로 사용
  const thumbSrc = Array.isArray(project.thumbnail)
    ? project.thumbnail[0]
    : project.thumbnail;

  return (
    <article className={styles.card} onClick={() => openModal(project)}>
      <div className={styles.thumbnail}>
        <img
          src={thumbSrc}
          alt={project.name}
          loading="lazy"
        />
        <div className={styles.overlay}>
          <span className={styles.viewDetail}>자세히 보기</span>
        </div>
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{project.name}</h3>

        <div className={styles.tags}>
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
          {project.tags.length > 4 && (
            <span className={styles.tagMore}>+{project.tags.length - 4}</span>
          )}
        </div>

        {project.links.length > 0 && (
          <div className={styles.links} onClick={(e) => e.stopPropagation()}>
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
                aria-label={`${project.name} ${link.label} 링크 (새 창)`}
              >
                {link.label}
                <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path
                    d="M2.5 1h8v8M10.5 1L1.5 10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
