import { useSnackbar } from 'notistack';

export const useUiSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar();

  const createSnackbar = (
    message: string,
    variant: 'default' | 'error' | 'success' | 'warning' | 'info' | undefined,
    bgColor: string
  ) => {
    enqueueSnackbar(message, {
      variant,
      style: { backgroundColor: bgColor },
      autoHideDuration: 1500,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
      },
    });
  };

  return { createSnackbar };
};
