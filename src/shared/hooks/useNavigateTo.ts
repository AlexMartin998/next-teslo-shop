import { useRouter } from 'next/router';

export const useNavigateTo = () => {
  const router = useRouter();

  const navigateToPath = (path: string) => router.push(path);
  const navigateAndReplace = (path: string) => router.replace(path);

  return { navigateToPath, navigateAndReplace };
};
