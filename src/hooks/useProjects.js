import { useQuery } from '@tanstack/react-query';

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await fetch('/data/projects.json');
      if (!res.ok) throw new Error('프로젝트 데이터를 불러오지 못했습니다.');
      return res.json();
    },
    staleTime: Infinity,
  });
}
