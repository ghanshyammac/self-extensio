// eslint-disable-next-line react/jsx-props-no-spreading
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  checkboxWrapper: {
    position: 'relative',
    width: '69px',
    height: '65px',
    borderRadius: '4px',
    border: 'solid 1px #c1c3cc',
    backgroundColor: '#fdfeff',
    display: 'inline-block',
    textAlign: 'center',
    lineHeight: '65px',
    marginRight: '10px',
    '& input[type="checkbox" i]': {
      background: 'transparent',
      cursor: 'pointer',
      position: 'absolute',
      left: '0',
      width: '100%',
      height: '100%',
      margin: '0',
      '-webkit-appearance': 'none',
      '&:checked': {
        border: '1px solid black',
      },
    },
    '& .chk-label': {
      fontSize: '18px',
      textTransform: 'capitalize',
    },
  },
  filterCheckbox: {
    cursor: 'pointer',
    display: 'inline-flex',
    marginBottom: '10px',
    lineHeight: '12px',
    marginRight: '10px',
    position: 'relative',
    textAlign: 'center',
    '& input[type="checkbox" i]': {
      background: 'transparent',
      width: '12px',
      height: '12px',
      border: 'solid 1px #c1c3cc',
      cursor: 'pointer',
      // position: 'absolute',
      left: '0',
      margin: '0',
      '-webkit-appearance': 'none',
      '&:checked': {
        // border: '1px solid black',
        position: 'relative',
        '&:before': {
          borderLeft: '1px solid #464949',
          content: ' "" ',
          height: '5px',
          left: '1px',
          position: 'absolute',
          right: 0,
          top: '-3px',
          bottom: 0,
          margin: 'auto',
          transform: 'rotate(-35deg)',
        },
        '&:after': {
          borderLeft: '1px solid #464949',
          content: ' "" ',
          height: '10px',
          left: '5px',
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          margin: 'auto',
          transform: 'rotate(35deg)',
        },
      },
    },
    '& .chk-label': {
      display: 'flex',
      fontSize: '16px',
      lineHeight: '10px',
      marginLeft: '10px',
      textTransform: 'capitalize',
    },
  },
  count: {
    color: '#8D9191',
    fontSize: '14px',
    marginLeft: '5px',
  },
}));

const CheckBox = ({
  value, detail = { detail }, handleChangeBox, handleChangeDelete, count, label, handlecheck, check, vv,
}) => {
  const Checkboxs = (props) => (
    <input type="checkbox" {...props} />
  );

  const [checked, setChecked] = useState(false);
  const classes = useStyles();

  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
    handleChangeBox(value, checked, label);
    handleChangeDelete(value, checked, label);
  };

  useEffect(() => {
    if (value == vv) {
      setChecked(!check);
    }
  });


  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={detail === true ? `${classes.checkboxWrapper}` : `${classes.filterCheckbox}`}>
      <Checkboxs
        checked={checked}
        value={value}
        onChange={(e) => handleCheckboxChange(e)}
      />
      <span className="chk-label">
        {value}
        {
          count
          && (
            <div className={classes.count}>
              (
              {count}
              )
            </div>
          )
        }
      </span>
    </label>
  );
};

CheckBox.propTypes = {
  value: PropTypes.string.isRequired,
};

export default CheckBox;
