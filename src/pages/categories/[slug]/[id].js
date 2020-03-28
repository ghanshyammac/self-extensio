import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import getConfig from 'next/config';
import InputLabel from '@material-ui/core/InputLabel';
import _ from 'lodash';
import CheckBox from '../../../components/checkbox/checkbox';
import BreadCrumb from '../../../components/breadcrumbs';
import Pagination from '../../../components/pagination/pagination';
import FilterButton from '../../../components/filterbutton/filterButton';

const { publicRuntimeConfig } = getConfig();

const useStyles = makeStyles(() => ({
  length: {
    color: '#8D9191',
    fontSize: '20px',
    marginLeft: '5px',
  },
  filterHeading: {
    fontWeight: 400,
    textTransform: 'uppercase',
  },
  facetWrapper: {
    borderBottom: '1px solid #c1c3cc',
    paddingBottom: '10px',
  },
  selectWrapper: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  formControl: {
    position: 'unset',
    '&:focus': {
      outline: '0px none',
    },
  },
  selectLabel: {
    color: '#000',
    fontSize: '14px',
    lineHeight: '35px',
    padding: '16px',
    transform: 'translate(0, 0) scale(1)',
    '&:focus': {
      outline: '0px none',
    },
    '&.Mui-focused': {
      color: '#000',
    },
  },
}));

const BootstrapInput = withStyles((theme) => ({
  input: {
    borderRadius: '6px',
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 14,
    maxHeight: 35,
    padding: '10px 26px 10px 12px',
    width: '145px',
    '&:focus': {
      backgroundColor: '#fff',
      borderRadius: '6px',
    },
  },
  button: {
    borderRadius: 0,
  },
}))(InputBase);

const Product = React.memo((props) => {
  const router = useRouter();
  const [productData, setProductData] = useState([]);
  const [facets1, setFacets] = useState([]);
  const [check, setCheck] = useState(false);
  const [vv, setV] = useState();
  const classes = useStyles();

  const facets2 = [{
    size: facets1['variants.attributes.size'],
    brand: facets1['variants.attributes.brand'],
    color: facets1['variants.attributes.color'],
  }];

  const [value1, setValue] = useState([]);
  const heading = router.query.slug;

  const mergeData = (data) => {
    if (data) {
      const ctProduct = data.CTproduct.results;
      const csProduct = data.CSproduct;
      const newArray = [];
      let productList = {};
      for (let i = 0; i < csProduct.length; i += 1) {
        let match = false;
        for (let j = 0; j < ctProduct.length; j += 1) {
          if (csProduct[i].ct_product_id === ctProduct[j].id) {
            match = true;
            productList = { ...ctProduct[j], ...csProduct[i] };
            break;
          }
        }
        if (match === true) {
          newArray.push(productList);
          setProductData(newArray);
        }
      }
      if (data.CTproduct) {
        const { facets } = data.CTproduct;
        if (facets) {
          setFacets(facets);
        }
      }
    }
  };

  useEffect(() => {
    mergeData(props.productData);
  }, []);

  function compareValues(order = 'asc') {
    return function innerSort(a, b) {
      const varA = a.masterVariant.prices[0].value.centAmount;
      const varB = b.masterVariant.prices[0].value.centAmount;

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  const obj = {};

  const handleChange = useCallback((value, checked, label) => {
    if (value && checked === false) {
      if (label === 'color') {
        obj[label] = value;
        setValue(value1.concat(obj));
      }
      if (label === 'brand') {
        obj[label] = value;
        setValue(value1.concat(obj));
      }
      if (label === 'size') {
        obj[label] = value;
        setValue(value1.concat(obj));
      }
    }
  }, [value1]);

  const getFilterData = async () => {
    const result = {};
    for (let i = 0, len = value1.length; i < len; i += 1) {
      if (value1[i].brand === 'H&M') {
        result[Object.keys(value1[i])] = value1[i].brand.replace('&', '%26');
      } else {
        result[Object.keys(value1[i])] = Object.values(value1[i]);
      }
    }
    const queryString = Object.keys(result).map((key) => `${key}=${result[key]}`).join('&');
    const response = await fetch(`${publicRuntimeConfig.API_BASE_URL}products/${router.query.id}?${queryString}`);
    const data = await response.json();
    return data;
  };

  const checpickup = (checked, value) => {
    setV(value);
    setCheck(checked);
  };

  useEffect(() => {
    getFilterData()
      .then((data) => {
        mergeData(data);
      });
  }, [value1]);

  const handleDeleteChange = useCallback((value, checked, label) => {
    if (value && checked === true) {
      for (let n = 0; n < value1.length; n += 1) {
        if (Object.keys(value1[n])[0] === label) {
          const removedOb = value1.splice(n, 1);
        }
        setValue(value1);
      }
      getFilterData()
        .then((data) => {
          mergeData(data);
        });
    }
  }, [value1]);

  const onCLickHndle = useCallback((e) => {
    const data = [];
    if (e.target.value === "Whant's New") {
      setProductData(_.shuffle(productData));
    }
    if (e.target.value === 'Prices low to High') {
      const sortingData = productData.sort(compareValues('asc'));
      setProductData(data.concat(sortingData));
    } if (e.target.value === 'Prices High to Low') {
      const sortingData = productData.sort(compareValues('desc'));
      setProductData(data.concat(sortingData));
    }
  }, [productData]);

  const breadcrumbData = {
    active_page: heading,
  };

  return (
    <>
      <Container maxWidth="xl" style={{ margin: '40px 0px' }}>
        <BreadCrumb data={breadcrumbData} />
        <Grid container justify="space-between" style={{ margin: '10px 0px 40px' }}>
          <Grid container item md={3}>
            <Grid md={12}>
              <h2 className={classes.filterHeading}>Filters</h2>
              {
                facets2
                && facets2.map((facet) => (
                  <>
                    <div className={classes.facetWrapper}>
                      <h3>Sizes</h3>
                      {
                        facet
                        && facet.size
                        && facet.size.terms.map((term) => (
                          <div key={term.term}>
                            <CheckBox
                              check={check}
                              vv={vv}
                              value={term.term}
                              handleChangeBox={handleChange}
                              handleChangeDelete={handleDeleteChange}
                              label="size"
                              count={term.count}
                            />
                          </div>
                        ))
                      }
                    </div>
                    <div className={classes.facetWrapper}>
                      <h3>Brands</h3>
                      {
                        facet
                        && facet.brand
                        && facet.brand.terms.map((term) => (
                          <div key={term.term}>
                            <CheckBox
                              check={check}
                              vv={vv}

                              value={term.term}
                              handleChangeBox={handleChange}
                              handleChangeDelete={handleDeleteChange}
                              label="brand"
                              count={term.count}
                            />
                          </div>
                        ))
                      }
                    </div>
                    <div>
                      <h3>Colors</h3>
                      {
                        facet
                        && facet.color
                        && facet.color.terms.map((term) => (
                          <div key={term.term}>
                            <CheckBox
                              check={check}
                              vv={vv}

                              value={term.term}
                              handleChangeBox={handleChange}
                              handleChangeDelete={handleDeleteChange}
                              label="color"
                              count={term.count}
                            />
                          </div>
                        ))
                      }
                    </div>
                  </>
                ))
              }
            </Grid>
          </Grid>
          <Grid container item md={8}>
            <Grid container justify="space-between" alignItems="center" spacing={4}>
              <Grid item>
                <h1 style={{ textTransform: 'capitalize' }}>
                  {heading}
                  <span className={classes.length}>
                    (
                    {productData.length}
                    )
                  </span>
                </h1>
              </Grid>
              <Grid item md={4} className={classes.selectWrapper}>
                <FormControl className={classes.formControl}>
                  <InputLabel className={classes.selectLabel}>Sort By: </InputLabel>
                  <NativeSelect
                    input={<BootstrapInput />}
                    onClick={(e) => onCLickHndle(e)}
                  >
                    <option value="Whant's New">What's New</option>
                    <option value="Prices low to High">Prices low to High</option>
                    <option value="Prices High to Low">Prices High to Low</option>
                  </NativeSelect>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container>
              {
                value1
                && value1.map((fil) => (
                  <FilterButton
                    value={Object.values(fil)}
                    label={Object.keys(fil)[0]}
                    handleChangeBox={handleChange}
                    handleChangeDelete={handleDeleteChange}
                    handlecheck={checpickup}
                  />
                ))
              }
            </Grid>
            <Pagination data={productData} />
          </Grid>
        </Grid>
      </Container>
    </>

  );
});

Product.getInitialProps = async ({ query }) => {
  const fetchUrl = `${publicRuntimeConfig.API_BASE_URL}products/${query.id}`;
  const productData = await fetch(fetchUrl)
    .then((r) => r.json())
    .then((data) => data)
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log('ERROR getting', err);
    });
  return { productData };
};

Product.propTypes = {
  productData: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Product;
