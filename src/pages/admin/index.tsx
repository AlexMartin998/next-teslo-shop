import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import useSWR from 'swr';

import { AdminLayout } from '@/layouts';
import { DashboardScene } from '@/teslo-shop';
import { FullScreenLoading } from '@/shared/components';
import { DashboardSummaryResponse } from '@/interfaces';
import { Typography } from '@mui/material';
import { useState, useEffect } from 'react';

const DashboardPage = () => {
  const { data, error, isLoading } = useSWR<DashboardSummaryResponse>(
    '/api/admin/dashboard',
    {
      refreshInterval: 30 * 1000, // 30s
    }
  );

  const [refreshIn, setRefreshIn] = useState(30);

  useEffect(() => {
    if (isLoading) return;
    const interval = setInterval(() => {
      setRefreshIn(refreshIn => (refreshIn > 0 ? refreshIn - 1 : 30));
    }, 1000);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!data && isLoading) return <FullScreenLoading />;
  if (error) {
    console.log(error);
    return <Typography>Error while loading data</Typography>;
  }

  return (
    <AdminLayout
      title="Dashboard"
      subTitle="General Statistics"
      icon={<DashboardOutlinedIcon />}
    >
      <DashboardScene dashboardSummary={data} refreshIn={refreshIn} />
    </AdminLayout>
  );
};

export default DashboardPage;
