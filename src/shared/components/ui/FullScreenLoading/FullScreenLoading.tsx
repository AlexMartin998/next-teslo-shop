import { Box, CircularProgress, Typography } from '@mui/material';

export interface FullScreenLoadingProps {}

const FullScreenLoading: React.FC<FullScreenLoadingProps> = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 200px)"
    >
      <Typography sx={{ mb: 3, fontSize: '24px', fontWeight: 200 }}>
        Loading...
      </Typography>

      <CircularProgress thickness={2} />
    </Box>
  );
};

export default FullScreenLoading;
