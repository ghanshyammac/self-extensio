/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Button = styled.button`
  cursor: pointer;
  width: 160px;
  height: 46px;
  font-size: 18px;
  font-weight: 400;
  letter-spacing: normal;
  color: #363636;
  background-color: #ffff;
  border: none;
  outline: none;
  :active {
    border-bottom: ${(props) => (props.dropdownOpen === true ? '3px solid yellow' : '')};
  }
`;
export const TriggerWrap = styled.div`
  position: absolute;
  z-index: 1;
  background-color: #ffff;
  width: auto;
  height: auto;
  border-radius: 0 0 3px 3px;
`;

const Dropdown = ({ data, children, ...other }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const onCloseMenu = (e) => {
    if (
      dropdownRef
      && dropdownRef.current
      && !dropdownRef.current.contains(e.target)
    ) {
      setDropdownOpen(false);
      document.removeEventListener('click', onCloseMenu);
    }
  };

  const onTriggerClick = () => {
    setDropdownOpen(true);
    document.addEventListener('click', onCloseMenu);
  };

  return (
    <>
      <Button
        dropdownOpen
        type="button"
        data-gtm-linktype="navigation"
        data-gtm-linktext={data.title}
        aria-haspopup
        aria-expanded={dropdownOpen}
        onClick={() => onTriggerClick()}
        {...other}
      >
        {data.title}
      </Button>
      <TriggerWrap
        dropdownOpen
        aria-hidden={!dropdownOpen}
        ref={dropdownRef}
        {...other}
      >
        {dropdownOpen === true ? children : null}
      </TriggerWrap>
    </>
  );
};

Dropdown.propTypes = {
  data: PropTypes.objectOf(PropTypes.object).isRequired,
  children: PropTypes.node.isRequired,
};

export default Dropdown;
