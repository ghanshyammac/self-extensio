import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import htmlParser from 'react-html-parser';
import SlickSlider from '../../../components/Slider-Panel/slider-panel';
import Checkbox from '../../../components/checkbox/checkbox';
import BreadCrumb from '../../../components/breadcrumbs';

const useStyles = makeStyles(() => ({
  cardsWrapper: {
    margin: '20px 0px 80px',
  },
  sliderWrapper: {
    margin: '20px 0px',
    width: '100%',
    padding: '0 69px',
    '& .slick-slider .slick-arrow.slick-prev,  .slick-slider .slick-arrow.slick-next ': {
      backgroundColor: 'transparent',
      width: '0',
    },
    '& .slick-slider .slick-arrow.slick-disabled': {
      '&:before': {
        borderColor: '#C1C3CC',
      },
    },
    '& .slick-slider .slick-arrow.slick-next': {
      right: '-20px',
    },
    '& .slick-slider .slick-arrow.slick-prev': {
      left: '-20px',
    },
  },
  sizeChkContainer: {
    marginBottom: '30px',
  },
  addToCartCTA: {
    width: '588px',
    maxWidth: '100%',
    fontSize: '16px',
  },
  specValue: {
    marginTop: '0',
    fontSize: '16px',
    fontWeight: 'normal',
  },
  sizeTitle: {
    marginBottom: '15px',
    textTransform: 'uppercase',
  },
  sizeContainer: {
    borderBottom: '1px solid #E6E7EC',
    borderTop: '1px solid #E6E7EC',
    paddingBottom: '20px',
  },
  specTitle: {
    color: '#8D9191',
  },
}));
const { publicRuntimeConfig } = getConfig();
export const ImageStyle = styled.img`
  cursor: pointer;
  height: 150px;
  width: 100%;
  object-fit: cover;
  vertical-align: middle;
  padding: 0px 7px;
  &:focus {
    outline: 0px none;
  }
`;
export const DescriptionWrapper = styled.div`
  margin: 100px 0px;
`;
export const Image = styled.div`
  height: 500px;
  position: relative;
  width: 100%;
  img {
    top: 0px;
    left: 0px;
    right: 0px;
    width: auto;
    bottom: 0px;
    height: auto;
    margin: auto;
    position: absolute;
    max-width: 100%;
    max-height: 100%;
  }
`;
export const NameWrapper = styled.p`
  color: #95969D;
  font-size: 16px;
  margin: 0px;
  padding: 0px;
`;
export const Name = styled.h1`
  margin-bottom: 0px;
`;
export const Description = styled.div`
  h3 {
    text-transform: uppercase;
  }
  h4 {
    margin-bottom: 0px;
  }
  p {
    color: #95969D;
    margin-top: 0px;
  }
`;

const ProductDetail = (props) => {
  const { productData1 } = props;
  const classes = useStyles();
  const router = useRouter();
  const [productData, setData] = useState([]);
  const [variants, setVariant] = useState([]);
  const [bread, setBread] = useState([]);

  useEffect(() => {
    if (productData1) {
      const data = { ...productData1.CTproduct, ...productData1.CSproduct[0] };
      setData(data);
      if (data) {
        if (data.masterData.current) {
          // eslint-disable-next-line
          const dataVariant = data.masterData.current.variants.concat(data.masterData.current.masterVariant)
          dataVariant.sort((a, b) => a.id - b.id);
          setVariant(dataVariant);
        } if (data.masterData.current && data.masterData.current.masterVariant) {
          data.masterData.current.masterVariant.attributes.map((data) => {
            if (data.name === 'brand') {
              setBread(data.value);
            }
          });
        }
      }
    }
  }, []);

  const showImage = (imgName) => {
    const curImage = document.getElementById('currentImg');
    curImage.src = imgName;
  };

  const decpData = { ...productData.masterData };


  const breadCrumbData = {
    active_page: bread,
    page_links: [{
      url: '/categories/mens-tshirts/46b6d2d6-5c9f-4351-850d-071704003feb',
      link_title: `${router.query.slug}`,
    }],
  };

  return (
    <div className={classes.cardsWrapper}>
      <Container maxWidth="lg">
        <BreadCrumb data={breadCrumbData} />
        <Grid container spacing={4} style={{ paddingTop: '40px' }}>
          <Grid md={6} item>
            {
              productData
              && Array.isArray(productData.master_sku_images)
              && (
                <>
                  <Image>
                    <img src={productData.master_sku_images[0].url} alt="T-Shirt" id="currentImg" />
                  </Image>
                </>
              )
            }
            <Grid md={12} className={classes.sliderWrapper}>
              <SlickSlider
                slidesToShow={3}
                slidesToScroll={1}
                dots={false}
                arrow={false}
                infinite={false}
              >
                {
                  productData
                  && Array.isArray(productData.master_sku_images)
                  && productData.master_sku_images.map((images) => (
                    <div>
                      <ImageStyle
                        src={images.url}
                        onClick={() => { showImage(images.url); }}
                      />
                    </div>
                  ))
                }
              </SlickSlider>
            </Grid>
          </Grid>
          <Grid md={6} item>
            {
              decpData
              && decpData.current
              && decpData.current.masterVariant.attributes.map((dataDecp) => (
                dataDecp.name === 'brand'
                && (
                  <Name>
                    {dataDecp.value}
                  </Name>
                )
              ))
            }
            {
              decpData.current
              && <NameWrapper>{decpData.current.name['en-US']}</NameWrapper>
            }
            {
              decpData.current
              && decpData.current.masterVariant
              && decpData.current.masterVariant.prices
              && (
                <h2>
                  Rs. &nbsp;
                  {decpData.current.masterVariant.prices[0].value.centAmount}
                </h2>
              )
            }
            <div className={classes.sizeContainer}>
              {
                variants
                && (
                  <div className={classes.sizeChkContainer}>
                    <h3 className={classes.sizeTitle}>Select Size</h3>
                    {
                      variants.map((checkData) => (
                        checkData.attributes.map((checkDa) => (
                          checkDa.name === 'size'
                          && (
                            <Checkbox
                              value={checkDa.value}
                              className="size-chk"
                              detail
                            />
                          )
                        ))
                      ))
                    }
                  </div>
                )
              }
              {
                <Button
                  className={classes.addToCartCTA}
                  size="large"
                  variant="contained"
                  color="secondary"
                >
                  <ShoppingCartIcon />
                  &nbsp; ADD TO CART
                </Button>
              }
            </div>
            {
              productData.desciption
              && (
                <Description>
                  {
                    productData.desciption
                    && productData.desciption.map((description) => (
                      htmlParser(description)
                    ))
                  }
                </Description>
              )
            }
            {
              decpData.current
              && decpData.current.masterVariant.attributes
              && (
                <div className={classes.specificationWrapper}>
                  <h3 className={classes.specTitle}>Specifications</h3>
                  <Grid container>
                    {
                      decpData.current.masterVariant.attributes.map((checkDa) => (
                        <>
                          {
                            (
                              checkDa.name === 'sleeve-styling'
                              || checkDa.name === 'fit'
                              || checkDa.name === 'sleeve-length'
                              || checkDa.name === 'fabric'
                              || checkDa.name === 'main-trend'
                              || checkDa.name === 'print-or-pattern-type'
                              || checkDa.name === 'neck'
                              || checkDa.name === 'pattern'
                              || checkDa.name === 'sleeve-length'
                            )

                            && (
                              <Grid xs={12} sm={6}>
                                <span className={classes.specTitle}>{checkDa.name}</span>
                                <h4 className={classes.specValue}>{checkDa.value}</h4>
                                {' '}
                              </Grid>
                            )
                          }
                        </>
                      ))
                    }
                  </Grid>
                </div>
              )
            }
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

ProductDetail.getInitialProps = async ({ query }) => {
  const fetchUrl = `${publicRuntimeConfig.API_BASE_URL}products/slug/${query.id}`;
  const productData1 = await fetch(fetchUrl)
    .then((r) => r.json())
    .then((data) => data)
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log('ERROR getting', err);
    });
  return { productData1 };
};

ProductDetail.propTypes = {
  productData1: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default ProductDetail;
