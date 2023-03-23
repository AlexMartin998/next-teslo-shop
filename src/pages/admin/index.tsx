import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';

import { AdminLayout } from '@/layouts';
import { DashboardScene } from '@/teslo-shop';

const DashboardPage = () => {
  return (
    <AdminLayout
      title="Dashboard"
      subTitle="General Statistics"
      icon={<DashboardOutlinedIcon />}
    >
      <DashboardScene />
    </AdminLayout>
  );
};

export default DashboardPage;
