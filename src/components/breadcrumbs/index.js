import React from 'react';
import PropTypes from 'prop-types';
import { Container, Link } from '@material-ui/core';
// import Link from 'next/link';
import styled from 'styled-components';

export const Ul = styled.ul`
margin: 0 -5px;
padding: 0;
display: flex;
  li {
    font-style: italic;
    list-style-type: none;
    padding: 0 5px;
    text-transform: capitalize;
  }
  a {
    color: #8D9191;
    text-decoration: none;
  }
`;


const Breadcrumbs = (props) => {
  const {
    data,
  } = props;

  return (
    <>
      <div>
        {/* <Container> */}
          <Ul>
            <li>
              <a href="/">
                HOME
              </a>
            </li>
            {' '}
            /
            {
              Array.isArray(data.page_links)
              && data.page_links.map((link) => (
                <li >
                  <Link href={link.url}>
                    Men's-Tshirts
                  </Link>
                </li>
              ))
            }
            {
              data.active_page
              && <li>{data.active_page}</li>
            }
          </Ul>
        {/* </Container> */}
      </div>
    </>
  );
};

Breadcrumbs.propTypes = {
  data: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Breadcrumbs;
