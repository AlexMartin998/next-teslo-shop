import { Box, IconButton, Typography } from '@mui/material';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

interface ItemCounterProps {
  currentValue: number;
  maxValue: number;

  onUpdateQuantity: (newValue: number) => void;
}

const ItemCounter: React.FC<ItemCounterProps> = ({
  currentValue,
  maxValue,
  onUpdateQuantity,
}) => {
  const addOrRemove = (value: number) => {
    const newValue = currentValue + value;

    // if (newValue >= 1 && newValue <= maxValue) onUpdateQuantity(newValue);
    if (newValue < 1 || newValue > maxValue) return;

    onUpdateQuantity(newValue);
  };

  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={() => addOrRemove(-1)}>
        <RemoveCircleOutlineOutlinedIcon />
      </IconButton>

      <Typography sx={{ width: 40, textAlign: 'center' }}>
        {currentValue}
      </Typography>

      <IconButton onClick={() => addOrRemove(1)}>
        <AddCircleOutlineOutlinedIcon />
      </IconButton>
    </Box>
  );
};

export default ItemCounter;
