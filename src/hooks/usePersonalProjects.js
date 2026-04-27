import { useQuery } from '@tanstack/react-query';

export function usePersonalProjects() {
  return useQuery({
    queryKey: ['personal'],
    queryFn: async () => {
      const res = await fetch('/data/personal.json');
      if (!res.ok) throw new Error('데이터를 불러오지 못했습니다.');
      return res.json();
    },
    staleTime: Infinity,
  });
}
