// eslint-disable-next-line react/jsx-props-no-spreading
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
  filterTags: {
    color: '#7b7e7e',
    border: '1px solid #95969d',
    borderRadius: '3px',
    lineHeight: '20px',
    marginBottom: '30px',
    marginRight: '10px',
    minWidth: 'auto',
    padding: '5px 5px 5px 0px',
    '& span': {
      margin: '0px 5px 0px 10px',
    },
  },
  close: {
    '&:before': {
      margin: 'auto',
      content: ' "" ',
      position: 'absolute',
      borderLeft: '2px solid #464949',
      height: '10px',
      transform: 'rotate(45deg)',
      top: '0',
      bottom: '0',
    },
    '&:after': {
      margin: 'auto',
      content: ' "" ',
      position: 'absolute',
      borderLeft: '2px solid #464949',
      height: '10px',
      transform: 'rotate(-45deg)',
      top: '0',
      bottom: '0',
    },
  },
}));


const FilterButton = ({
  value, handleChangeDelete, label, handlecheck,
}) => {
  const [checked, setChecked] = useState(true);
  const classes = useStyles();

  const handleCheckboxChange = () => {
    setChecked(checked);
    handleChangeDelete(value, checked, label);
    handlecheck(checked, value);
  };

  return (
    <>
      <Button
        value={value}
        onClick={() => handleCheckboxChange()}
        className={classes.filterTags}
      >
        {Object.values(value)}
        <span
          className={classes.close}
        />
      </Button>
    </>
  );
};

FilterButton.propTypes = {
  value: PropTypes.string.isRequired,
};

export default FilterButton;
