import { NextPage } from 'next';
import useSWR from 'swr';
import { Chip, Grid } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';

import { AdminLayout } from '@/layouts';
import { FullScreenLoading } from '@/shared/components';
import { IOrder, IUser } from '@/interfaces';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Order ID', width: 250 },
  { field: 'email', headerName: 'Email', width: 250 },
  { field: 'name', headerName: 'Full name', width: 300 },
  { field: 'total', headerName: 'Total Amount', width: 300 },
  {
    field: 'isPaid',
    headerName: 'Paid',
    width: 250,
    renderCell: ({ row }: GridRenderCellParams) => {
      return row.isPaid ? (
        <Chip variant="outlined" label="Paid" color="success" />
      ) : (
        <Chip variant="outlined" label="Pending" color="error" />
      );
    },
  },
  { field: 'noProducts', headerName: 'In Stock', align: 'center', width: 300 },

  {
    field: 'check',
    headerName: 'View Order',
    renderCell: ({ row }: GridRenderCellParams) => (
      <a href={`/admin/orders/${row.id}`} target="_blank" rel="noreferrer">
        View Order
      </a>
    ),
  },

  { field: 'createdAt', headerName: 'Created At', width: 250 },
];

const OrdersPage: NextPage = () => {
  const { data, isLoading } = useSWR<IOrder[]>('/api/admin/orders');
  if (!data && isLoading) return <FullScreenLoading />;

  const rows = data!.map(order => ({
    id: order._id,
    email: (order.user as IUser).email,
    name: (order.user as IUser).name,
    total: order.orderSummary.total,
    isPaid: order.isPaid,
    noProducts: order.orderSummary.numberOfItems,
    createdAt: order.createdAt,
  }));

  return (
    <AdminLayout
      title="Purchase Orders"
      subTitle="Order Maintenance"
      icon={<ConfirmationNumberOutlinedIcon />}
    >
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default OrdersPage;
