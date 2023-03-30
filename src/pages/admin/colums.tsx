import { tesloApi } from '@/api/axios-client';
import { MenuItem, Select } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

const onRoleUpdate = async (userId: string, newRole: string) => {
  // mutate(data!.map(u => u._id === userId ? { ...u, role: newRole } : u));

  try {
    await tesloApi.put('/admin/users', { userId, role: newRole });
  } catch (error) {
    console.log(error);
    alert('Something wento wrong');
  }
};

export const columnsData: GridColDef[] = [
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