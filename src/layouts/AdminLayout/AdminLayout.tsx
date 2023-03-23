import { AdminNavbar, SideMenu } from '@/shared/components';
import { Box, Typography } from '@mui/material';

export interface AdminLayoutProps {
  title: string;
  subTitle: string;
  icon?: JSX.Element;

  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title,
  subTitle,
  icon,
}) => {
  return (
    <>
      <nav>
        <AdminNavbar />
      </nav>

      <SideMenu />

      <main
        style={{ margin: '80px auto', maxWidth: '1440px', padding: '0 30px' }}
      >
        <Box display="flex" flexDirection="column">
          <Typography variant="h1" component="h1">
            {icon} {title}
          </Typography>

          <Typography variant="h2" sx={{ my: 1 }}>
            {subTitle}
          </Typography>
        </Box>

        <Box className="fadeIn" pt={3}>
          {children}
        </Box>
      </main>
    </>
  );
};

export default AdminLayout;
