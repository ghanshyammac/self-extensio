import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const BootstrapInput = withStyles((theme) => ({
  input: {
    borderRadius: 0,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    borderRight: 'none',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    '&:focus': {
      backgroundColor: '#fff',
    },
  },
  button: {
    borderRadius: 0,
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(0),
  },
  button: {
    backgroundColor: '#ef4060',
    borderRadius: 0,
    boxShadow: 'none',
    height: '41px',
    '&:hover': {
      backgroundColor: '#ef4060',
    },
  },
  searchStyle: {
    width: 500,
  },
}));

export default function SearchBox({ categories }) {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className={classes.root}>
      <FormControl className={classes.margin}>
        <BootstrapInput className={classes.searchStyle} />
      </FormControl>
      <FormControl className={classes.margin}>
        <NativeSelect
          value={age}
          onChange={handleChange}
          input={<BootstrapInput className={classes.test} />}
        >
          <option value="">All Category</option>
          {categories.results.map((category) => (
            <option value={category.key}>{category.name['en-US']}</option>
          ))}
        </NativeSelect>
      </FormControl>
      <FormControl className={classes.margin}>
        <Button
          size="large"
          variant="contained"
          color="default"
          className={classes.button}
        >
          <img
            src="https://images.contentstack.io/v3/assets/bltb24eba5e54eb8b22/blt5be85bd23c939de9/5e5d217949708a7ce9d9a3fc/Search.svg"
            alt="Search"
          />
        </Button>
      </FormControl>
    </div>
  );
}

SearchBox.propTypes = {
  categories: PropTypes.objectOf(PropTypes.object).isRequired,
};
