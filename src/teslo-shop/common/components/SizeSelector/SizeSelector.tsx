import { ISize } from '@/interfaces';
import { Box, Button } from '@mui/material';

interface SizeSelectorProps {
  selectedSize?: ISize;
  sizes: ISize[];
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ selectedSize, sizes }) => {
  return (
    <Box>
      {sizes.map(size => (
        <Button
          key={size + Math.random()}
          size="small"
          color={selectedSize === size ? 'primary' : 'info'}
        >
          {size}
        </Button>
      ))}
    </Box>
  );
};

export default SizeSelector;
