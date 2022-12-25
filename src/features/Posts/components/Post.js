import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { AiFillDelete, AiFillLike } from 'react-icons/ai';
import { BiLike } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { THUMNAIL, URL_IMAGE } from '../../../constants/common';
import { upperCaseFirstLetter } from '../../../utils/common';
import { deletePost, idUpdatePost, updateLikes } from '../postSlice';
import './styles.scss';

export const Post = ({ post }) => {
  const [creatorPost, setCreatorPost] = useState(false);
  const { posts, pagination, setLike } = useSelector(
    (state) => state.posts
  );
  const user = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickCard = (e) => {
    if (
      e.target.parentElement.closest('.MuiIconButton-root') ||
      e.target.parentElement.closest('.update-post') ||
      e.target.parentElement.closest('.update-post')
    )
      return;

    navigate(`/posts/${post._id}`);
  };

  useEffect(() => {
    if (user && posts.length > 0) {
      if (user._id !== post.creator) setCreatorPost(false);
      if (user._id === post.creator) setCreatorPost(true);
    }
  }, [posts, user, post]);

  return (
    <Card
      onClick={handleClickCard}
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: '20px',
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      <Box
        display='flex'
        left='0'
        right='0'
        top='10px'
        justifyContent='space-between'
        alignItems='center'
        position='absolute'
        color='white'
        zIndex={10}
        paddingX={1}
      >
        <Box>
          <Typography variant='h6'>{post.name}</Typography>
          <Typography variant='body2'>
            {moment(new Date(post.createdAt).toUTCString())
              .startOf('day')
              .fromNow()}
          </Typography>
        </Box>
        {creatorPost && (
          <IconButton
            onClick={() => dispatch(idUpdatePost(post._id))}
            color='primary'
            className='update-post'
          >
            <BsThreeDotsVertical
              style={{ fontSize: '26px', cursor: 'pointer' }}
            />
          </IconButton>
        )}
      </Box>

      <Box height='180px' className='overlay'>
        <img
          height='100%'
          width='100%'
          src={`${URL_IMAGE}/${post?.photo}` || THUMNAIL}
          alt={post.title}
        />
      </Box>

      <Box display='flex' flexDirection='column' minHeight='200px'>
        <CardContent sx={{ paddingBottom: '0px' }}>
          <Box display='flex'>
            {post.tags?.length > 0 &&
              post.tags
                .join(' ')
                .split(',')
                .map((tag, idx) => (
                  <Typography
                    key={idx}
                    variant='body2'
                    color='text.secondary'
                  >
                    #{tag}
                  </Typography>
                ))}
          </Box>
          <Typography py={1} variant='h6'>
            {upperCaseFirstLetter(post?.title.slice(0, 30))}...
          </Typography>
          <Typography variant='body2'>{`${post?.message.slice(
            0,
            50
          )}...`}</Typography>
        </CardContent>

        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 'auto',
          }}
        >
          <IconButton
            onClick={() =>
              dispatch(updateLikes(post._id, pagination))
            }
            sx={{ display: 'flex', alignItems: 'center' }}
            color='primary'
          >
            {post?.like?.filter((item) => item === user?._id)
              ?.length > 0 ? (
              <AiFillLike />
            ) : (
              <BiLike />
            )}

            <Typography fontWeight='bold' variant='body2'>
              {post?.like.length}
            </Typography>
          </IconButton>
          {creatorPost && (
            <IconButton
              onClick={() =>
                dispatch(deletePost(post._id, pagination))
              }
              sx={{ display: 'flex', alignItems: 'center' }}
              color='error'
            >
              <AiFillDelete />
              <Typography fontWeight='bold' variant='body2'>
                DELETE
              </Typography>
            </IconButton>
          )}
        </CardActions>
      </Box>
    </Card>
  );
};
