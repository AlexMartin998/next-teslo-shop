import React, { FC } from 'react';
import { GetServerSideProps } from 'next';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  capitalize,
  Card,
  CardActions,
  CardMedia,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  ListItem,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';

import { AdminLayout } from '@/layouts';
import { dbProducts } from '@/api';
import { newProductFormSchema } from '@/shared/utils';
import { IProduct, IType } from '@/interfaces';

const validTypes = ['shirts', 'pants', 'hoodies', 'hats'];
const validGender = ['men', 'women', 'kid', 'unisex'];
const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

interface ProductAdminPageProps {
  product: IProduct;
}

interface FormData extends IProduct {}

const ProductAdminPage: FC<ProductAdminPageProps> = ({ product }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    defaultValues: product,
    resolver: yupResolver(newProductFormSchema),
  });

  const onSaveProduct = async (formData: FormData) => {
    console.log(formData);
  };

  const onDeleteTag = (tag: string) => {};

  return (
    <AdminLayout
      title={'Producto'}
      subTitle={`Edit: ${product.title}`}
      icon={<DriveFileRenameOutlineOutlinedIcon />}
    >
      <form onSubmit={handleSubmit(onSaveProduct)} noValidate>
        <Box display="flex" justifyContent="end" sx={{ mb: 1 }}>
          <Button
            color="secondary"
            startIcon={<SaveAsOutlinedIcon />}
            sx={{ width: '150px' }}
            type="submit"
          >
            Save
          </Button>
        </Box>

        <Grid container spacing={2}>
          {/* Data */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Title"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('title')}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <TextField
              label="Description"
              variant="filled"
              fullWidth
              multiline
              rows={3} // <-- ESTO LO ARREGLA
              sx={{ mb: 1 }}
              {...register('description')}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            <TextField
              label="In Stock"
              type="number"
              variant="filled"
              fullWidth
              InputProps={{ inputProps: { min: 1 } }}
              sx={{ mb: 1 }}
              {...register('inStock')}
              error={!!errors.inStock}
              helperText={errors.inStock?.message}
            />

            <TextField
              label="Precio"
              type="number"
              variant="filled"
              fullWidth
              InputProps={{ inputProps: { min: 1 } }}
              sx={{ mb: 1 }}
              {...register('price')}
              error={!!errors.price}
              helperText={errors.price?.message}
            />

            <Divider sx={{ my: 1 }} />

            <Controller
              name="type"
              control={control}
              defaultValue={'' as IType}
              render={({ field }) => (
                <FormControl sx={{ mb: 1 }}>
                  <FormLabel>Type</FormLabel>
                  <RadioGroup row {...field}>
                    {validTypes.map(option => (
                      <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio color="secondary" />}
                        label={capitalize(option)}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />

            <Controller
              name="gender"
              control={control}
              defaultValue={'' as any}
              render={({ field }) => (
                <FormControl sx={{ mb: 1 }}>
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup row {...field}>
                    {validGender.map(option => (
                      <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio color="secondary" />}
                        label={capitalize(option)}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />

            <Controller
              name="sizes"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth margin="dense" error={!!errors.sizes}>
                  <FormLabel>Sizes</FormLabel>
                  <FormGroup>
                    {validSizes.map(size => (
                      <FormControlLabel
                        key={size}
                        label={size}
                        control={
                          <Checkbox
                            value={size}
                            checked={field.value.some(val => val === size)}
                            onChange={({ target: { value } }, checked) => {
                              checked
                                ? field.onChange([...field.value, value])
                                : field.onChange(
                                    field.value.filter(val => val !== value)
                                  );
                            }}
                          />
                        }
                      />
                    ))}
                  </FormGroup>
                  <FormHelperText>
                    {capitalize(`${(errors.sizes as any)?.message || ''}`)}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>

          {/* Tags e imagenes */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Slug - URL"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('slug')}
              error={!!errors.slug}
              helperText={errors.slug?.message}
            />

            <TextField
              label="Tags"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              helperText="Press [spacebar] to add"
            />

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0,
                m: 0,
              }}
              component="ul"
            >
              {product.tags.map(tag => {
                return (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => onDeleteTag(tag)}
                    color="primary"
                    size="small"
                    sx={{ ml: 1, mt: 1 }}
                  />
                );
              })}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" flexDirection="column">
              <FormLabel sx={{ mb: 1 }}>Imágenes</FormLabel>
              <Button
                color="secondary"
                fullWidth
                startIcon={<UploadFileOutlinedIcon />}
                sx={{ mb: 3 }}
              >
                Upload Image
              </Button>

              <Chip
                label="At least 2 images are required"
                color="error"
                variant="outlined"
                sx={{ mb: 2 }}
              />

              <Grid container spacing={2}>
                {product.images.map(img => (
                  <Grid item xs={4} sm={3} key={img}>
                    <Card>
                      <CardMedia
                        component="img"
                        className="fadeIn"
                        image={`/products/${img}`}
                        alt={img}
                      />
                      <CardActions>
                        <Button fullWidth color="error">
                          Borrar
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </form>
    </AdminLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug = '' } = query;
  const product = await dbProducts.getProductBySlug(slug.toString());

  if (!product) {
    return {
      redirect: {
        destination: '/admin/products',
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductAdminPage;
