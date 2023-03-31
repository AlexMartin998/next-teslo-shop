import { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { getServerSession } from 'next-auth';
import { useRouter } from 'next/router';
import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import { PayPalButtons } from '@paypal/react-paypal-js';

import { ShopLayout } from '@/layouts';
import { dbOrders } from '@/api';
import { CartList, OrderSummary } from '@/teslo-shop';
import { authOptions } from '../api/auth/[...nextauth]';
import { tesloApi } from '@/api/axios-client';
import { PaymentStatus } from '@/shared/components';
import { IOrder } from '@/interfaces';

interface OrderPageProps {
  order: IOrder;
}

export type OrderResponseBody = {
  id: string;
  status:
    | 'COMPLETED'
    | 'SAVED'
    | 'APPROVED'
    | 'VOIDED'
    | 'PAYER_ACTION_REQUIRED';
};

const OrderPage: NextPage<OrderPageProps> = ({ order }) => {
  const [isPaying, setIsPaying] = useState(false);
  const router = useRouter();
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

  const onOrderCompleted = async (details: OrderResponseBody) => {
    if (details.status !== 'COMPLETED') return alert('No hay pago en PayPal');
    setIsPaying(true);

    try {
      const { data } = await tesloApi.post(`/orders/pay`, {
        transactionId: details.id,
        orderId: order._id,
      });

      router.reload();
    } catch (error) {
      setIsPaying(false);
      console.log(error);
      alert(error);
    }
  };

  return (
    <ShopLayout
      title="Order Summary"
      pageDescription="TesloShop is an E-commerce with over 213,000 products and 6 million customers worldwide."
    >
      <Typography variant="h1" component="h1" mb={4}>
        Order: {order._id}
      </Typography>

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
                {isPaying && (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    my={2}
                  >
                    <CircularProgress />
                  </Box>
                )}

                {!isPaying && (
                  <>
                    {!order.isPaid ? (
                      <PayPalButtons
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  value: `${order.orderSummary.total}`,
                                },
                              },
                            ],
                          });
                        }}
                        onApprove={(data, actions) => {
                          return actions.order!.capture().then(details => {
                            // console.log({ details });
                            // const name = details.payer.name!.given_name;

                            onOrderCompleted(details);
                          });
                        }}
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
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const { id = '' } = query;
  const session: any = await getServerSession(req, res, authOptions);
  if (!session)
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${id}`,
        permanent: false,
      },
    };

  const order = await dbOrders.getOrderByID(id.toString());
  if (!order)
    return {
      redirect: {
        destination: `/orders/history`,
        permanent: false,
      },
    };

  // podriamos bloquear al user xq esta haciendo cosas raras
  if (order.user !== session.user.id)
    return {
      redirect: {
        destination: `/orders/history`,
        permanent: false,
      },
    };

  return {
    props: {
      order,
    },
  };
};

export default OrderPage;
