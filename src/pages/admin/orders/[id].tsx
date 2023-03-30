import { GetServerSideProps, NextPage } from 'next';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';

import { AdminLayout } from '@/layouts';
import { dbOrders } from '@/api';
import { CartList, OrderSummary } from '@/teslo-shop';
import { PaymentStatus } from '@/shared/components';
import { IOrder } from '@/interfaces';

interface OrderAdminPageProps {
  order: IOrder;
}

const OrderAdminPage: NextPage<OrderAdminPageProps> = ({ order }) => {
  const {
    firstName,
    lastName,
    address,
    address2 = '',
    country,
    city,
    phone,
    zipCode,
  } = order.shippingAddress;
  const { orderSummary } = order;

  return (
    <AdminLayout
      title="Order Summary"
      subTitle={` Order: ${order._id}`}
      icon={<ConfirmationNumberOutlinedIcon />}
    >
      <PaymentStatus isPaid={order.isPaid} />

      <Grid container spacing={3} className="fadeIn">
        <Grid item xs={12} sm={7}>
          <CartList products={order.orderItems} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography>
                Summary ({order.orderSummary.numberOfItems}{' '}
                {order.orderSummary.numberOfItems > 1 ? 'products' : 'product'})
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">Delivery address</Typography>
              </Box>

              <Typography>
                {firstName} {lastName}
              </Typography>
              <Typography>
                {address}
                {address2 && `, ${address2}`}
              </Typography>
              <Typography>
                {city}, {zipCode}
              </Typography>
              <Typography>{country}</Typography>
              <Typography>{phone}</Typography>

              <Divider sx={{ my: 2 }} />

              {/* Order Summary */}
              <OrderSummary orderData={{ orderSummary }} />

              <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                <PaymentStatus isPaid={order.isPaid} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const { id = '' } = query;
  const order = await dbOrders.getOrderByID(id.toString());
  if (!order)
    return {
      redirect: {
        destination: `/admin/orders`,
        permanent: false,
      },
    };

  return {
    props: {
      order,
    },
  };
};

export default OrderAdminPage;
