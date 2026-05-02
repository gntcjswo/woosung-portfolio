import { useRef } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './ProfilePage.module.scss';

function calcCareer(startDateStr) {
  const start = new Date(startDateStr);
  const now = new Date();
  const totalMonths =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  return { years, months };
}

export function ProfilePage() {
  const { data: profile, isLoading, isError } = useProfile();
  const innerRef = useRef(null);
  useScrollReveal(innerRef, !isLoading && !!profile);

  if (isLoading) {
    return (
      <main className={styles.page}>
        <div className={styles.inner}>
          <div className={styles.loadingState} aria-label="프로필 로딩 중">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={styles.skeleton} />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (isError || !profile) {
    return (
      <main className={styles.page}>
        <div className={styles.inner}>
          <p role="alert" className={styles.error}>프로필을 불러오지 못했습니다.</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div ref={innerRef} className={styles.inner}>
        <section className={styles.hero} aria-label="소개">
          <div className={styles.heroLeft}>
            <div className={styles.badge}>Frontend Developer &amp; Web Publisher</div>
            <h1 className={styles.name}>
              <span className={styles.nameEn}>{profile.nameEn}</span>
              <span className={styles.nameKo}>{profile.name}</span>
            </h1>
            <p className={styles.bio}>{profile.bio}</p>
            <div className={styles.contactList}>
              <a
                href={`mailto:${profile.contact.email}`}
                className={styles.contactItem}
                aria-label="이메일 보내기"
              >
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M2 4a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V4z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M2 7l8 5 8-5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                {profile.contact.email}
              </a>
              <a
                href={profile.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactItem}
                aria-label="GitHub 프로필 (새 창)"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
                GitHub
              </a>
            </div>
          </div>
          <div className={styles.heroRight}>
            {(() => {
              const { years, months } = calcCareer(profile.careerStartDate || '2015-04-01');
              return (
                <div className={styles.statGrid}>
                  <div className={styles.statItem}>
                    <span className={styles.statNum}>
                      {years}
                      <span>yr</span>
                      {months > 0 && <>{months}<span>mo</span></>}
                    </span>
                    <span className={styles.statLabel}>Career</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNum}>40<span>+</span></span>
                    <span className={styles.statLabel}>Projects</span>
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        <div className={styles.divider} aria-hidden="true" />

        {/* Summary */}
        {profile.summary && (
          <section className={styles.section} aria-labelledby="summary-title">
            <h2 id="summary-title" className={styles.sectionTitle}>
              <span>About Me</span>
            </h2>
            <ul className={styles.summaryList}>
              {profile.summary.map((item) => (
                <li key={item} className={styles.summaryItem}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        <div className={styles.divider} aria-hidden="true" />

        {/* Skills */}
        <section className={styles.section} aria-labelledby="skills-title">
          <h2 id="skills-title" className={styles.sectionTitle}>
            <span>Skills</span>
          </h2>
          <div className={styles.skillCategories}>
            {profile.skills.map((cat) => (
              <div key={cat.category} className={styles.skillCategory}>
                {profile.skills.length > 1 && (
                  <h3 className={styles.skillCategoryName}>{cat.category}</h3>
                )}
                <ul className={styles.skillList}>
                  {cat.skills.map((skill) => (
                    <li key={skill} className={styles.skillBadge}>{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className={styles.divider} aria-hidden="true" />

        {/* Career */}
        <section className={styles.section} aria-labelledby="career-title">
          <h2 id="career-title" className={styles.sectionTitle}>
            <span>Career</span>
          </h2>
          <ol className={styles.careerList}>
            {profile.career.map((item) => (
              <li key={item.company} className={styles.careerItem}>
                <div className={styles.careerHeader}>
                  <div>
                    <h3 className={styles.careerCompany}>{item.company}</h3>
                    <p className={styles.careerPosition}>{item.position}</p>
                  </div>
                  <span className={styles.careerPeriod}>{item.period}</span>
                </div>
                <p className={styles.careerDesc}>{item.description}</p>
                <ul className={styles.taskList}>
                  {item.tasks.map((task) => (
                    <li key={task}>{task}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <div className={styles.divider} aria-hidden="true" />

        {/* FAQ */}
        {profile.faq && (
          <section className={styles.section} aria-labelledby="faq-title">
            <h2 id="faq-title" className={styles.sectionTitle}>
              <span>FAQ</span>
            </h2>
            <dl className={styles.faqList}>
              {profile.faq.map((item) => (
                <div key={item.question} className={styles.faqItem}>
                  <dt className={styles.faqQ}>{item.question}</dt>
                  <dd className={styles.faqA}>{item.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <div className={styles.divider} aria-hidden="true" />

        {/* Education */}
        <section className={styles.section} aria-labelledby="edu-title">
          <h2 id="edu-title" className={styles.sectionTitle}>
            <span>Education</span>
          </h2>
          <ul className={styles.eduList}>
            {profile.education.map((item) => (
              <li key={item.school} className={styles.eduItem}>
                <div className={styles.eduLeft}>
                  <h3 className={styles.eduSchool}>{item.school}</h3>
                  <p className={styles.eduMajor}>{item.major} · {item.degree}</p>
                </div>
                <span className={styles.eduPeriod}>{item.period}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
