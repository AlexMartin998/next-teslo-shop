import { Grid } from '@mui/material';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined';
import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

import { SummaryTile } from './components';
import { DashboardSummaryResponse } from '@/interfaces';

export interface DashboardSceneProps {
  dashboardSummary: DashboardSummaryResponse;
  refreshIn: number;
}

const DashboardScene: React.FC<DashboardSceneProps> = ({
  dashboardSummary: {
    totalOrders,
    paidOrders,
    notPaidOrders,
    totalClients,
    totalProducts,
    productsOutOfStock,
    lowInventory,
  },
  refreshIn,
}) => {
  return (
    <Grid container spacing={2}>
      <SummaryTile
        title={totalOrders}
        subTitle="Total Orders"
        icon={
          <CreditCardOutlinedIcon color="secondary" sx={{ fontSize: 40 }} />
        }
      />

      <SummaryTile
        title={paidOrders}
        subTitle="Paid Orders"
        icon={<AttachMoneyOutlinedIcon color="success" sx={{ fontSize: 40 }} />}
      />

      <SummaryTile
        title={notPaidOrders}
        subTitle="Pending Orders"
        icon={<AttachMoneyOutlinedIcon color="error" sx={{ fontSize: 40 }} />}
      />

      <SummaryTile
        title={totalClients}
        subTitle="Clients"
        icon={<GroupOutlinedIcon color="primary" sx={{ fontSize: 40 }} />}
      />

      <SummaryTile
        title={totalProducts}
        subTitle="Products"
        icon={<CategoryOutlinedIcon color="warning" sx={{ fontSize: 40 }} />}
      />

      <SummaryTile
        title={productsOutOfStock}
        subTitle="Products out of stock"
        icon={
          <CancelPresentationOutlinedIcon color="error" sx={{ fontSize: 40 }} />
        }
      />

      <SummaryTile
        title={lowInventory}
        subTitle="Products with low stock"
        icon={
          <ProductionQuantityLimitsOutlinedIcon
            color="warning"
            sx={{ fontSize: 40 }}
          />
        }
      />

      <SummaryTile
        title={refreshIn}
        subTitle="Update in: 3"
        icon={
          <AccessTimeOutlinedIcon color="secondary" sx={{ fontSize: 40 }} />
        }
      />
    </Grid>
  );
};

export default DashboardScene;
