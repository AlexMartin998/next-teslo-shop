import { useSnackbar } from 'notistack';

interface IUiSnackbar {
  message: string;
  variant: 'default' | 'error' | 'success' | 'warning' | 'info' | undefined;
  bgColor?: string;
  vertial?: 'bottom' | 'top';
  horizontal?: 'center' | 'left' | 'right';
}

export const useUiSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar();

  const createSnackbar = ({
    message,
    variant,
    bgColor,
    vertial,
    horizontal,
  }: IUiSnackbar) => {
    enqueueSnackbar(message, {
      variant,
      style: { backgroundColor: bgColor },
      autoHideDuration: 1500,
      anchorOrigin: {
        vertical: vertial || 'top',
        horizontal: horizontal || 'right',
      },
    });
  };

  return { createSnackbar };
};
