import { useQuery } from '@tanstack/react-query';

/**
 * @typedef {import('@/types/project').Project} Project
 */

export function usePersonalProjects() {
  return useQuery({
    queryKey: ['personal'],
    queryFn: async () => {
      const res = await fetch('/data/personal.json');
      if (!res.ok) throw new Error('데이터를 불러오지 못했습니다.');
      /** @type {Project[]} */
      const projects = await res.json();
      
      // 개발 모드에서 숨겨진 프로젝트 표시 여부 확인
      const showHidden = import.meta.env.VITE_SHOW_HIDDEN_PROJECTS === 'true';
      
      if (showHidden) {
        return projects; // 숨겨진 프로젝트도 모두 표시
      }
      
      // visible이 false인 프로젝트는 제외 (기본값은 true로 처리)
      return projects.filter(project => project.visible !== false);
    },
    staleTime: Infinity,
  });
}
