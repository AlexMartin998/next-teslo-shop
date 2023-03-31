import { NextPage } from 'next';
import useSWR from 'swr';
import { Box, Button, CardMedia, Grid, Typography } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from '@mui/x-data-grid';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { AdminLayout } from '@/layouts';
import { FullScreenLoading } from '@/shared/components';
import { IProduct } from '@/interfaces';
import Link from 'next/link';
import NextLink from 'next/link';

const columns: GridColDef[] = [
  {
    field: 'img',
    headerName: 'Photo',
    renderCell: ({ row }: GridRenderCellParams) => (
      <a href={`/product/${row.slug}`} target="_blank" rel="noreferrer">
        <CardMedia
          component="img"
          className="fadeIn"
          alt={row.title}
          // image={`/products/${row.img}`}
          image={row.img.startsWith('http') ? row.img : `/products/${row.img}`}
        />
      </a>
    ),
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 300,
    renderCell: ({ row }: GridRenderCellParams) => (
      <Link href={`/admin/products/${row.slug}`}>
        <Typography
          variant="body2"
          sx={{ color: 'black', textDecoration: 'underline' }}
        >
          {row.title}
        </Typography>
      </Link>
    ),
  },
  { field: 'gender', headerName: 'Gender' },
  { field: 'type', headerName: 'Type' },
  { field: 'inStock', headerName: 'Inventory' },
  { field: 'price', headerName: 'Price' },
  { field: 'sizes', headerName: 'Size', width: 250 },
];

const ProductsAdminPage: NextPage = () => {
  const { data, isLoading } = useSWR<IProduct[]>('/api/admin/products');
  if (!data && isLoading) return <FullScreenLoading />;

  const rows = data!.map(product => ({
    id: product._id,
    img: product.images[0],
    title: product.title,
    gender: product.gender,
    type: product.type,
    inStock: product.inStock,
    price: product.price,
    sizes: product.sizes.join(', '),
    slug: product.slug,
  }));

  return (
    <AdminLayout
      title={`Products (${data?.length})`}
      subTitle="Product Maintenance"
      icon={<InventoryOutlinedIcon />}
    >
      <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
        <NextLink href={`/admin/products/new`}>
          <Button
            startIcon={<AddCircleOutlineOutlinedIcon />}
            color="secondary"
          >
            Create Product
          </Button>
        </NextLink>
      </Box>

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
            // grid toolabr & search
            components={{ Toolbar: GridToolbar }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 510 },
              },
            }}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default ProductsAdminPage;
