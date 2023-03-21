import React, { useMemo } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import NextLink from 'next/link';
import { Button, Chip, Grid, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { ShopLayout } from '@/layouts';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { dbOrders } from '@/api';
import { IOrder } from '@/interfaces';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullname', headerName: 'Full name', width: 300 },

  {
    field: 'paid',
    headerName: 'Payed',
    description: 'Showed payed status',
    width: 200,

    renderCell: params => {
      return params.value ? (
        <Chip color="success" label="Payed" variant="outlined" />
      ) : (
        <Chip color="error" label="Not payed" variant="outlined" />
      );
    },
  },

  {
    field: 'order',
    headerName: 'Show order',
    description: 'Show order page',
    width: 200,
    sortable: false,
    renderCell: params => {
      return (
        <NextLink href={`/orders/${params.row.orderId}`} passHref>
          <Button variant="text" color="primary">
            Show order
          </Button>
        </NextLink>
      );
    },
  },
];

interface HistoryPageProps {
  orders: IOrder[];
}

const HistoryPage: NextPage<HistoryPageProps> = ({ orders }) => {
  const rows = useMemo(
    () =>
      orders.map((order, i) => ({
        id: i + 1,
        fullname: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
        paid: order.isPaid,
        orderId: order._id,
      })),
    [orders]
  );

  return (
    <ShopLayout title="Purchase history" pageDescription="Purchase history">
      <Typography variant="h1" component="h1" mb={4}>
        Purchase history
      </Typography>

      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session: any = await getServerSession(req, res, authOptions);
  if (!session)
    return {
      redirect: {
        destination: '/auth/login?p=/orders/history',
        permanent: false,
      },
    };

  const orders = await dbOrders.getOrdersByUser(session.user.id);
  if (!orders)
    return {
      redirect: {
        destination: '/auth/login?p=/orders/history',
        permanent: false,
      },
    };

  return {
    props: { orders },
  };
};

export default HistoryPage;
