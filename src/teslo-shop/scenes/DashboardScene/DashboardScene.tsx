import { Grid } from '@mui/material';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined';
import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

import { SummaryTile } from './components';

export interface DashboardSceneProps {}

const DashboardScene: React.FC<DashboardSceneProps> = () => {
  return (
    <Grid container spacing={2}>
      <SummaryTile
        title="50"
        subTitle="Total Orders"
        icon={
          <CreditCardOutlinedIcon color="secondary" sx={{ fontSize: 40 }} />
        }
      />

      <SummaryTile
        title="3"
        subTitle="Paid Orders"
        icon={<AttachMoneyOutlinedIcon color="success" sx={{ fontSize: 40 }} />}
      />

      <SummaryTile
        title="1"
        subTitle="Pending Orders"
        icon={<AttachMoneyOutlinedIcon color="error" sx={{ fontSize: 40 }} />}
      />

      <SummaryTile
        title="4"
        subTitle="Clients"
        icon={<GroupOutlinedIcon color="primary" sx={{ fontSize: 40 }} />}
      />

      <SummaryTile
        title="123"
        subTitle="Products"
        icon={<CategoryOutlinedIcon color="warning" sx={{ fontSize: 40 }} />}
      />

      <SummaryTile
        title="123"
        subTitle="Products out of stock"
        icon={
          <CancelPresentationOutlinedIcon color="error" sx={{ fontSize: 40 }} />
        }
      />

      <SummaryTile
        title="123"
        subTitle="Products with low stock"
        icon={
          <ProductionQuantityLimitsOutlinedIcon
            color="warning"
            sx={{ fontSize: 40 }}
          />
        }
      />

      <SummaryTile
        title="3"
        subTitle="Update in: 3"
        icon={
          <AccessTimeOutlinedIcon color="secondary" sx={{ fontSize: 40 }} />
        }
      />
    </Grid>
  );
};

export default DashboardScene;
