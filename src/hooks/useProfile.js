import { useQuery } from '@tanstack/react-query';

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await fetch('/data/profile.json');
      if (!res.ok) throw new Error('프로필 데이터를 불러오지 못했습니다.');
      return res.json();
    },
    staleTime: Infinity,
  });
}
