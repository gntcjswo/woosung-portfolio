import { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useModalStore } from '@/stores/useModalStore';
import styles from './ProjectModal.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function ProjectModal() {
  const { isOpen, selectedProject, closeModal } = useModalStore();
  const overlayRef = useRef(null);
  const firstFocusRef = useRef(null);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') closeModal();
    },
    [closeModal]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      firstFocusRef.current?.focus();
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !selectedProject) return null;

  const project = selectedProject;

  // thumbnails 배열 > thumbnail 배열 > thumbnail 문자열 순으로 정규화
  const images = (() => {
    if (project.thumbnails?.length) return project.thumbnails;
    if (Array.isArray(project.thumbnail)) return project.thumbnail;
    if (project.thumbnail) return [project.thumbnail];
    return [];
  })();

  const hasImages = images.length > 0;
  const isMultiple = images.length > 1;

  return createPortal(
    <div
      className={styles.overlay}
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) closeModal();
      }}
      aria-hidden={!isOpen}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className={styles.header}>
          <div className={styles.titleArea}>
            <p className={styles.period}>{project.period}</p>
            <h2 id="modal-title" className={styles.title}>{project.name}</h2>
          </div>
          <button
            ref={firstFocusRef}
            className={styles.closeBtn}
            onClick={closeModal}
            aria-label="모달 닫기"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className={styles.body}>
          {hasImages && (
            <div className={styles.imageWrap}>
              {isMultiple ? (
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true }}
                  loop={isMultiple}
                  className={styles.swiper}
                >
                  {images.map((src, idx) => (
                    <SwiperSlide key={idx}>
                      <div className={styles.slide}>
                        <img src={src} alt={`${project.name} 이미지 ${idx + 1}`} />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className={styles.singleImage}>
                  <img src={images[0]} alt={project.name} />
                </div>
              )}
            </div>
          )}

          <div className={styles.infoGrid}>
            <table className={styles.table}>
              <tbody>
                {project.period && (
                  <tr>
                    <th scope="row">수행 기간</th>
                    <td>{project.period}</td>
                  </tr>
                )}
                <tr>
                  <th scope="row">기술 스택</th>
                  <td>
                    <div className={styles.techList}>
                      {project.techStack.map((tech) => (
                        <span key={tech} className={styles.techBadge}>{tech}</span>
                      ))}
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">주요 역할</th>
                  <td>
                    <ul className={styles.list}>
                      {project.roles.map((role) => (
                        <li key={role}>{role}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th scope="row">업무 성과</th>
                  <td>
                    <ul className={styles.list}>
                      {project.achievements.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {project.links.length > 0 && (
            <div className={styles.links}>
              {project.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkBtn}
                  aria-label={`${project.name} ${link.label} 바로 가기 (새 창)`}
                >
                  {link.label} 바로 가기
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M3 2h10v10M13 2L3 12"
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
      </div>
    </div>,
    document.body
  );
}
