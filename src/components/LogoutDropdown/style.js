import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  username: {
    fontSize: '12px',
    fontWeight: '400',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    cursor:'pointer',
    '&.clicked:after': {
      content: '""',
      width: '52px',
      height: '3px',
      backgroundColor: '#ef4060',
      position: 'absolute',
      bottom: '-4px',
      left: '0px',
    }
  },
  userEmail: {
    display: 'block',
    fontSize: '12px',
    color: '#95969d',

  },
  dropdown: {
    '& hr': {
      borderColor: 'rgba(0, 0, 0, 0.16)'
    },
    fontSize: '14px',
    top: '46px !important',
    '& .MuiMenu-paper': {
      borderRadius: '0',
      width: '236px',
      padding: '0 20px',
      boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
    },
    '& .MuiMenuItem-root ': {
      padding: '3px 5px',
      display: 'block',
    },
    '& a': {
      fontSize: '14px',
      color: '#0c0d0d',
      textDecoration: 'none'
    }
  }
}));

export default useStyles;
