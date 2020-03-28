import React from 'react';
import { Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#000',
    padding: '60px 0px',
  },
  paper: {
    padding: theme.spacing(2),
    color: '#fff',
  },
  list: {
    listStyleType: 'none',
    padding: '0px',
    marginBottom: '5px',
  },
  colorPara: {
    color: '#4f8ad3',
  },
  buttonEmail: {
    color: '#fff',
    borderColor: '#fff',
    marginRight: '20px',
    minWidth: '150px',
  },
  spacing: {
    paddingBottom: '10px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
  subscribe: {
    border: '1px solid #fff',
    color: '#fff',
    height: '40px',
    background: 'transparent',
    borderRadius: '4px',
    padding: '0 10px',
    lineHeight: '40px',
  },
  subscribeBtn: {
    height: '42px',
    marginLeft: '20px',
    borderRadius: '4px',
  },
}));

export const Description = styled.div`
  a {
    color: #fff;
    text-decoration: none;
  }
`;

export default function Footer(props) {
  const classes = useStyles();

  const { footer } = props;

  return (
    <div className={classes.root}>
      <Container>
        <Grid container justify="space-between">
          <Grid item xs={7}>
            <Grid container spacing={3}>
              {footer[0].menu.map((menuEle) => (
                <Grid item xs={4} key={menuEle.title}>
                  <div className={classes.paper}>
                    <h5>{menuEle.title}</h5>
                    {menuEle.description ? (
                      <Description>
                        {' '}
                        {ReactHtmlParser(menuEle.description)}
                      </Description>
                    ) : (
                      menuEle.cta_link.map((cta) => (
                        <ul className={classes.list} key={cta.title}>
                          <li className={classes.spacing}>
                            <a href={cta.href} className={classes.link}>
                              {cta.title}
                            </a>
                          </li>
                        </ul>
                      ))
                    )}
                  </div>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <div className={classes.paper}>
              <h4>{footer[0].subscribe_form.title}</h4>
              <p className={classes.colorPara}>
                {footer[0].subscribe_form.description}
              </p>
              <form>
                <input
                  type="text"
                  id="email"
                  placeholder="Email Address"
                  className={classes.subscribe}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.subscribeBtn}
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

Footer.propTypes = {
  footer: PropTypes.arrayOf(PropTypes.object).isRequired,
};
