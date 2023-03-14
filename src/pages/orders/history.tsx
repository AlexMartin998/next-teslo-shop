import React from 'react';
import NextLink from 'next/link';
import { Button, Chip, Grid, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { ShopLayout } from '@/layouts';

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
        <NextLink href={`/orders/${params.row.id}`} passHref>
          <Button variant="text" color="primary">
            Show order
          </Button>
        </NextLink>
      );
    },
  },
];
const rows = [
  { id: 1, paid: true, fullname: 'Fernando Herrera' },
  { id: 2, paid: false, fullname: 'Melissa Flores' },
  { id: 3, paid: true, fullname: 'Hernando Vallejo' },
  { id: 4, paid: false, fullname: 'Emin Reyes' },
  { id: 5, paid: false, fullname: 'Eduardo Rios' },
  { id: 6, paid: true, fullname: 'Natalia Herrera' },
];

const HistoryPage = () => {
  return (
    <ShopLayout title="Purchase history" pageDescription="Purchase history">
      <Typography variant="h1" component="h1" mb={4}>
        Purchase history
      </Typography>

      <Grid container>
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

export default HistoryPage;
