import PropTypes from 'prop-types';
import styled from 'styled-components';
import SubHeader from './SubHeader/subHeader';
import MainHeader from './Header/index';

export const SubHeaderWrapper = styled.div`
  margin: 0px;
`;

const Header = (props) => {
  const { header, menu, categories } = props;

  return (
    <>
      {header && menu && categories && (
        <div>
          <MainHeader header={header} categories={categories} />
          <SubHeaderWrapper>
            <SubHeader menu={menu} />
          </SubHeaderWrapper>
        </div>
      )}
    </>
  );
};

Header.propTypes = {
  header: PropTypes.objectOf(PropTypes.object).isRequired,
  categories: PropTypes.objectOf(PropTypes.object).isRequired,
  menu: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Header;
