import { Grid, Typography } from '@mui/material';

import { useCart } from '@/context';
import { currency } from '@/shared/utils';
import { TesloConstantKey, tesloConstants } from '@/shared/constants';
import { IOrderSummary } from '@/interfaces';

interface OrdenSummaryProps {
  orderData?: {
    orderSummary: IOrderSummary;
  };
}

const OrdenSummary: React.FC<OrdenSummaryProps> = ({ orderData }) => {
  const cartState = useCart();
  const {
    orderSummary: { numberOfItems, subTotal, tax, total },
  } = orderData || cartState;

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Products</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>
          {numberOfItems} {numberOfItems > 1 ? 'prodcuts' : 'product'}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{`${currency.format(subTotal)}`}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>
          Taxes ({tesloConstants.get(TesloConstantKey.taxtRate)! * 100}%)
        </Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{`${currency.format(tax)}`}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }} display="flex" justifyContent="end">
        <Typography variant="subtitle1">{currency.format(total)}</Typography>
      </Grid>
    </Grid>
  );
};

export default OrdenSummary;
