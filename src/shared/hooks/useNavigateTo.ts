import { useRouter } from 'next/router';

export const useNavigateTo = () => {
  const router = useRouter();

  const navigateToPath = (path: string) => router.push(path);

  return { navigateToPath };
};
