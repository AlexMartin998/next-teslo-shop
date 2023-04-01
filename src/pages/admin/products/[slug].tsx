import { useRef, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
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
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';

import { AdminLayout } from '@/layouts';
import { dbProducts, ProductModel } from '@/api';
import { generateSlug, newProductFormSchema } from '@/shared/utils';
import { IProduct, IType } from '@/interfaces';
import { tesloApi } from '@/api/axios-client';
import { useUiSnackbar } from '@/shared/hooks';

const validTypes = ['shirts', 'pants', 'hoodies', 'hats'];
const validGender = ['men', 'women', 'kid', 'unisex'];
const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

interface ProductAdminPageProps {
  product: IProduct;
}

interface FormData extends IProduct {}

const ProductAdminPage: NextPage<ProductAdminPageProps> = ({ product }) => {
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm<FormData>({
    defaultValues: product,
    resolver: yupResolver(newProductFormSchema),
  });
  const [newTagValue, setNewTagValue] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null); //o no re-render when it changes
  const { createSnackbar } = useUiSnackbar();

  const onDeleteTag = (tag: string) => {
    const updatedTags = getValues('tags').filter(t => t !== tag);

    setValue('tags', updatedTags, { shouldValidate: true });
  };

  const onNewTag = () => {
    if (!newTagValue.trim()) return;

    const currentTags = getValues('tags');
    if (currentTags.includes(newTagValue.trim())) return;
    setValue('tags', [...currentTags, newTagValue.trim().toLowerCase()], {
      shouldValidate: true,
    });

    setNewTagValue('');
  };

  /*   Con el Subscriber (watch del  useForm())
  useEffect(() => {
    // observable
    const subscription = watch((value, { name, type }) => {
      if (name === 'title') {
        const newSlug =
          value.title
            ?.trim()
            .replace(/[^a-z0-9]+/gi, '_')
            .toLowerCase() || '';
        setValue('slug', newSlug);
      }
    });

    return () => subscription.unsubscribe();
  }, [setValue, watch]); */

  const onImgsSelected = async ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (!target.files || !target.files.length) return;

    try {
      for (const file of target.files) {
        const formData = new FormData();
        formData.append('file', file);

        const { data } = await tesloApi.post('/admin/uploads', formData);
        setValue('images', [...getValues('images'), data.filePath], {
          shouldValidate: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteImage = async (image: string) => {
    setValue(
      'images',
      getValues('images').filter(img => img !== image),
      { shouldValidate: true } // to see the real time
    );
  };

  const onSaveProduct = async (formData: FormData) => {
    if (formData.images.length < 2) return;
    setIsSaving(true);

    try {
      await tesloApi({
        url: formData._id
          ? `/admin/products/${formData._id}`
          : '/admin/products',
        method: formData._id ? 'PUT' : 'POST',
        data: formData,
      });

      if (!formData._id) {
        return router.replace(`/admin/products/${formData.slug}`);
      } else {
        setIsSaving(false);
        createSnackbar({
          message: 'Product successfully updated',
          variant: 'success',
          bgColor: '#2CA58D',
        });
      }
    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }
  };

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
            disabled={isSaving}
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
              // slug: without useEffect and subscribers
              onChange={({ target }) =>
                setValue('slug', generateSlug(target.value))
              }
            />

            <TextField
              label="Description"
              variant="filled"
              fullWidth
              multiline
              rows={5} // avoid Too many re-renders.
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
              //
              value={newTagValue}
              onChange={({ target }) => setNewTagValue(target.value)}
              onKeyDown={({ code }) =>
                code !== 'Space' ? undefined : onNewTag()
              }
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
              {getValues('tags').map(tag => {
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
                onClick={() => fileInputRef.current?.click()}
              >
                Upload Image
              </Button>
              <input
                ref={fileInputRef}
                onChange={onImgsSelected}
                //
                type="file"
                name="images"
                id="upload-images"
                multiple
                accept="image/png, image/gif, image/jpeg"
                style={{ display: 'none' }}
              />

              {getValues('images').length < 2 && (
                <Chip
                  label="At least 2 images are required"
                  color="error"
                  variant="outlined"
                  sx={{ mb: 3 }}
                />
              )}

              <Grid container spacing={2}>
                {getValues('images').map(img => (
                  <Grid item xs={4} sm={3} key={img}>
                    <Card>
                      <CardMedia
                        component="img"
                        className="fadeIn"
                        image={
                          img.startsWith('https') ? img : `/products/${img}`
                        }
                        alt={img}
                      />
                      <CardActions>
                        <Button
                          fullWidth
                          color="error"
                          onClick={() => onDeleteImage(img)}
                        >
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
  let product: IProduct | null;

  if (slug === 'new') {
    // create product
    const tempProduct = JSON.parse(JSON.stringify(new ProductModel()));
    delete tempProduct._id;
    tempProduct.images = [];

    product = tempProduct;
  } else {
    product = await dbProducts.getProductBySlug(slug.toString());
  }

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
