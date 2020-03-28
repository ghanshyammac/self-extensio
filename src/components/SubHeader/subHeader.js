/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import { Link } from '@material-ui/core';
import styled from 'styled-components';
import DropDown from './dropdown';

export const Wrapper = styled.div`
  display: flex;
  background-color: #fffff;
  border-bottom: 1px solid #c1c3cc;
  justify-content: center;
  margin-bottom: 20px;
`;

export const DropDownList = styled.div`
  padding: 0.5rem 0.5rem;
  :hover {
    font-weight: bolder;
  }
`;

export const DDWrapper = styled.div``;

export const LiWrapper = styled.li`
  margin: 0rem auto;
  padding: 0rem 2rem;
`;

export const DropDownWrap = styled.ul`
  display: inline-flex;
  list-style: none;
`;

const listStyle = {
  textDecoration: 'none',
  color: 'black',
};

const SubHeader = ({ menu }) => {
  const categories = menu[0].category;

  return (
    <Wrapper aria-label="Main Navigation">
      {categories
        && categories.map((data1) => (
          <DDWrapper aria-haspopup key={data1.title}>
            <DropDown data={data1}>
              <DropDownWrap aria-label="Sub Navigation">
                {data1.sub_category
                  && data1.sub_category.map((data2) => (
                    <LiWrapper key={data2.title}>
                      <div style={{ color: 'red' }}>{data2.title}</div>
                      <div style={{ marginTop: '7px' }}>
                        {data2.child_category.map((data) => (
                          <li key={data.title}>
                            <Link
                              href={`/categories/${data.category[0].slug}/${data.category[0].ct_category_id}`}
                              style={listStyle}
                            >
                              <DropDownList>{data.title}</DropDownList>
                            </Link>
                          </li>
                        ))}
                      </div>
                    </LiWrapper>
                  ))}
              </DropDownWrap>
            </DropDown>
          </DDWrapper>
        ))}
    </Wrapper>
  );
};

SubHeader.propTypes = {
  menu: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default SubHeader;
