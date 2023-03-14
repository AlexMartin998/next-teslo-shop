import { Grid, Typography } from '@mui/material';

interface OrdenSummaryProps {}

const OrdenSummary: React.FC<OrdenSummaryProps> = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Products</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>3 items</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>${155.44}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Taxes</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>${13.12}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }} display="flex" justifyContent="end">
        <Typography variant="subtitle1">${186.12}</Typography>
      </Grid>
    </Grid>
  );
};

export default OrdenSummary;
