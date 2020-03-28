import PropTypes from 'prop-types';
import NoSsr from '@material-ui/core/NoSsr';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    grey: {
      300: '#eaecf5',
    },
    secondary: {
      main: '#ef4060',
    },
  },
});

const layoutStyle = {
  backgroundColor: '#fefefe',
  width: '100%',
  position: 'relative',
  fontFamily:
    'Whitney,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif',
};

const Layout = ({ children }) => (
  <NoSsr>
    <ThemeProvider theme={theme}>
      <div style={layoutStyle}>
        <div>{children}</div>
      </div>
    </ThemeProvider>
  </NoSsr>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
