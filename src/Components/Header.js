import { AppBar, Toolbar, Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { HeadsetTwoTone } from '@mui/icons-material';
const useStyles = makeStyles({

  title: {
    marginLeft: '10px !important',
    color: '#FFFFFF'
  }
});


const Header = () => {
  const classes = useStyles()
  return (
    <AppBar position="fixed" color="color1" enableColorOnDark>
      <Toolbar>
        <HeadsetTwoTone color="white" />
        <Typography className={classes.title} variant="h6" component="h1">
          My Music
        </Typography>
      </Toolbar>
    </AppBar>
  )
};

export default Header;
