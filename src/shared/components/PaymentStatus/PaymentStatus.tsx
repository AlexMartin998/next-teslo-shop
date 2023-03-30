import { Chip } from '@mui/material';
import CreditCardOffOutlinedIcon from '@mui/icons-material/CreditCardOffOutlined';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';

export interface PaymentStatusProps {
  isPaid: boolean;
}

const PaymentStatus: React.FC<PaymentStatusProps> = ({ isPaid }) => {
  return (
    <>
      {!isPaid ? (
        <Chip
          sx={{ my: 2 }}
          label="Pending payment"
          variant="outlined"
          color="error"
          icon={<CreditCardOffOutlinedIcon />}
        />
      ) : (
        <Chip
          sx={{ my: 2 }}
          label="Paid purchase order"
          variant="outlined"
          color="success"
          icon={<CreditScoreOutlinedIcon />}
        />
      )}
    </>
  );
};

export default PaymentStatus;
