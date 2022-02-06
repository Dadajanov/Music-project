import { useMutation } from "@apollo/react-hooks";
import { Delete } from "@mui/icons-material";
import { Avatar, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ADD_OR_REMOVE_FROM_QUEUE } from "../graphql/mutations";

const useStyle = makeStyles({
  avatar: {
    width: '44px',
    height: '44px',
  },
  text: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  container: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: '50px auto 50px',
    gridGap: '12px',
    alignItems: 'center',
    marginTop: 10,
  },
  songInfoContainer: {
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  }
})

const Queue = ({ song }) => {
  const classes = useStyle();
  const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
    onCompleted: data => {
      localStorage.setItem('Queue', JSON.stringify(data.addOrRemoveFromQueue))
    }
  });

  const handleAddToQueue = () => {
    addOrRemoveFromQueue({
      variables: {
        input: {
          ...song,
          __typename: 'Song'
        }
      }
    })
  }

  const { thumbnail, title, artist } = song

  return (
    <div className={classes.container}>
      <Avatar src={thumbnail} alt='Song thumbnail' className={classes.avatar} />
      <div className={classes.songInfoContainer}>
        <Typography variant='subtitle2' className={classes.text}>
          {title}
        </Typography>
        <Typography color="textSecondary" variant='body2'>
          {artist}
        </Typography>
      </div>
      <IconButton onClick={handleAddToQueue}>
        <Delete color='color2' />
      </IconButton>
    </div>
  )
};

export default Queue
