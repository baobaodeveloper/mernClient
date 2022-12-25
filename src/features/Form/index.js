import { Box, Button, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSnackbar } from 'notistack';
import { ImageField } from '../../components/form-control/ImageField';
import { InputField } from '../../components/form-control/InputField';
import { MessageField } from '../../components/form-control/MessageField';
import { useDispatch, useSelector } from 'react-redux';
import {
  createPostDetail,
  setIdUpdatePostNull,
  updatePostDetail,
} from '../Posts/postSlice';
import { useRef } from 'react';

const schema = yup
  .object({
    title: yup.string().required('Please enter title'),
    message: yup.string().required('Please enter message'),
    tags: yup.string().required('Please enter tags'),
  })
  .required();

export const Form = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { id, posts, pagination } = useSelector(
    (state) => state.posts
  );
  const dispatch = useDispatch();
  const [image, setImage] = useState('');
  const [imageReset, setImageReset] = useState('');
  const {
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      message: '',
      tags: '',
    },
    resolver: yupResolver(schema),
  });
  const handleSubmitForm = async (values) => {
    const tags = { ...values }?.tags?.split(',');

    let endValues = {
      ...values,
      tags: tags,
    };

    if (image) {
      endValues = {
        ...endValues,
        photo: image,
      };
    }

    const formData = new FormData();
    for (const [key, value] of Object.entries(endValues)) {
      formData.append(key, value);
    }
    try {
      if (id) {
        await dispatch(updatePostDetail(formData, id, pagination));
        dispatch(setIdUpdatePostNull());
        enqueueSnackbar('Update post success', {
          variant: 'success',
        });
      } else {
        await dispatch(createPostDetail(formData, pagination));
        enqueueSnackbar('Create post success', {
          variant: 'success',
        });
      }
      setImage('');
      setImageReset('');
      reset();
    } catch (error) {
      if (id)
        enqueueSnackbar('Update post failed', { variant: 'error' });
      enqueueSnackbar('Create post failed', { variant: 'error' });
    }
  };

  useEffect(() => {
    const post = posts.find((item) => item._id === id);
    if (post) {
      setValue('title', post.title);
      setValue('message', post.message);
      setValue('tags', post.tags.join(','));
    }
  }, [id, posts]);

  return (
    <Paper sx={{ padding: '20px 15px' }}>
      <Typography variant='h4' mb={2} textAlign='center'>
        {id ? 'Update memories' : 'Create memories'}
      </Typography>
      <Box
        component='form'
        onSubmit={handleSubmit(handleSubmitForm)}
        sx={{
          '& .MuiTextField-root': { mb: 2 },
        }}
      >
        <InputField
          errors={errors}
          control={control}
          name='title'
          label='Title'
        />
        <InputField
          errors={errors}
          control={control}
          name='tags'
          label='Tags'
        />
        <MessageField
          control={control}
          errors={errors}
          name='message'
          label='Message'
        />
        <ImageField
          setImageReset={setImageReset}
          imageReset={imageReset}
          name='image'
          setImage={setImage}
          image={image}
        />

        <Box mt={3} textAlign='center'>
          <Button type='submit' variant='contained' color='primary'>
            {id ? 'Update' : 'Created'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
