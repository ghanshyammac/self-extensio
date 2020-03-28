/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import styled from 'styled-components';

const useStyles = makeStyles(() => ({
  media: {
    cursor: 'pointer',
    height: '278px',
  },
  subTitle: {
    textAlign: 'center',
    letterSpacing: '1.5px',
    margin: '30px 0px',
  },
  price: {
    color: '#000',
    fontWeight: 'bold',
  },
  root: {
    borderRadius: '0px',
  },
}));

export const DescWrap = styled.div`
  cursor: pointer;
  padding: 20px 10px 0px;
  font-size: 16px;
  h4 {
    margin: 0px;
  }
  p {
    color: #8D9191;
    font-size: 14px;
    margin: 0px;

    span {
      font-weight: bolder;
      padding: 5px;
    }
  }
  & .price {
    color: #000;
  }
`;

const CategoryCard = ({ data }) => {
  const classes = useStyles();

  const {
    image, prices, attributes, title,
  } = data;

  return (
    <>
      {
        image
        && (
        <div style={{ position: 'relative', boxSizing: 'border-box' }}>
          {
            image
            && (
              <Card className={classes.root}>
                <CardMedia className={classes.media} image={image.url && image.url || image[0].url && image[0].url} />
              </Card>
            )
          }
          <DescWrap>
            {
              attributes
              && attributes.map((brand) => (
                brand.name === 'brand'
                && brand.value
                && <h4>{brand.value}</h4>
              ))
            }
            {
              title
              && <p>{title}</p>
            }
            {
              prices
              && prices[0]
              && (
                <div className={classes.price}>
                  <span>{(prices[0].value.centAmount / 100).toFixed(2)}</span>
                  {prices[0].value.currencyCode}
                </div>
              )
            }
          </DescWrap>
        </div>
        )
      }
    </>
  );
};

CategoryCard.propTypes = {
  data: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default CategoryCard;
