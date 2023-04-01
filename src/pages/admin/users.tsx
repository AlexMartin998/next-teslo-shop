import { NextPage } from 'next';
import useSWR from 'swr';
import { Grid, MenuItem, Select } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

import { AdminLayout } from '@/layouts';
import { FullScreenLoading } from '@/shared/components';
import { tesloApi } from '@/api/axios-client';
import { IUser, ValidRoles } from '@/interfaces';
import { useUiSnackbar } from '@/shared/hooks';

const UsersPage: NextPage = () => {
  const { data, isLoading, mutate } = useSWR<IUser[]>('/api/admin/users');
  const { createSnackbar } = useUiSnackbar();
  if (!data && isLoading) return <FullScreenLoading />;

  const onRoleUpdate = async (userId: string, newRole: ValidRoles) => {
    try {
      await tesloApi.put('/admin/users', { userId, role: newRole });
      createSnackbar({
        message: 'Role successfully updated',
        variant: 'success',
        bgColor: '#2CA58D',
      });

      // nos evita useState y actualiza el state (re-render cambios) - after upd req
      mutate(data!.map(u => (u._id === userId ? { ...u, role: newRole } : u)));
    } catch (error) {
      console.log(error);
      createSnackbar({
        message: 'Something went wrong',
        variant: 'error',
      });
    }
  };

  const columns: GridColDef[] = [
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'name', headerName: 'Full Name', width: 300 },
    {
      field: 'role',
      headerName: 'Role',
      width: 300,
      renderCell: ({ row }: GridRenderCellParams) => {
        return (
          <Select
            value={row.role}
            label="Role"
            sx={{ width: '300px' }}
            onChange={({ target }) => onRoleUpdate(row.id, target.value)}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="super-user">Super User</MenuItem>
            <MenuItem value="client">Client</MenuItem>
          </Select>
        );
      },
    },
  ];

  const rows = data!.map(({ _id, email, name, role }) => ({
    id: _id,
    email,
    name,
    role,
  }));

  return (
    <AdminLayout
      title="Users"
      subTitle="User maintenance"
      icon={<PeopleAltOutlinedIcon />}
    >
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
    </AdminLayout>
  );
};

export default UsersPage;
