import PropTypes from 'prop-types';
import NoSsr from '@material-ui/core/NoSsr';
import Header from './Header';
import Footer from './Footer';

const layoutStyle = {
  width: '100%',
  position: 'relative',
  fontFamily:
    'Whitney,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif',
};

const Layout = ({ children }) => (
  <NoSsr>
    <div style={layoutStyle}>
      <div>
        <Header />
      </div>
      <div>{children}</div>
      <Footer />
    </div>
  </NoSsr>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
