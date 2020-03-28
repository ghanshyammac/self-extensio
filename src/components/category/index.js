/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const useStyles = makeStyles(() => ({
  name: {
    'text-overflow': 'ellipsis',
    overflow: 'hidden',
    'white-space': 'nowrap',
    'font-weight': 'bold',
    'line-height': '32px',
  },
  border: {
    border: '1px solid',
  },
  button: {
    'margin-left': '10px',
  },
  searchInput: {
    width: '468px',
  },
}));

const tableRow = {
    alignItems: 'center',
  }

  const dropdownList = {
    height: '250px',
    overflow: 'auto',
    padding: '5px 10px',
    // border: '1px solid #e6eced',
    marginTop: '3px',
  }

const Category = function Category(cmsconfig) {
  const classes = useStyles();
  const { extensionField } = cmsconfig.cms;

  const [filterdata, setFilterdata] = useState([]);
  const [selectedvalue, setValue] = useState(null);

  const resize = () => {
    extensionField.window.updateHeight();
  };

  const handleChange = async (e) => {
    let newList = [];

    if (e.target.value !== '') {
      const fetchUrl = `${publicRuntimeConfig.API_BASE_URL}categories/search?text.en-us="${e.target.value}"`;
      const productData = await fetch(fetchUrl)
        .then((r) => r.json())
        .then((data) => data)
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log('ERROR getting', err);
        });
      console.log('productDATA', productData);
      if (productData !== undefined) newList = productData.categoryCTPromise.results;
    } else {
      newList = [];
    }
    console.log('newList', newList);
    // Set the filtered state based on what our rules added to newList
    setFilterdata(newList);
    resize();
  };

  const getFieldValue = () => extensionField.field.getData();

  const setFieldValue = (data) => {
    extensionField.field.setData(data);
  };

  const selectHandler = (product) => {
    console.log(product);
    const skudata = {
      id: product.id,
      name: product.name,
      slug: product.slug,
    };
    setFieldValue(skudata);
    setValue(skudata);
  };

  useEffect(() => {
    if (extensionField) {
      const value = getFieldValue();
      console.log('value', value);
      if (value && value.id !== undefined) {
        setValue(value);
      } else {
        setValue(null);
      }
    }
  }, []);

  const clearSelectedValue = () => {
    setValue(null);
    setFieldValue(null);
  };

  return (
    <div className="cs-table">
      {
        (selectedvalue !== null)
        && (
        <div style={tableRow} className="table-row w-100">
            <div className="table-cell w-70">
              <h4 title={selectedvalue.name['en-US']}>
                {selectedvalue.name['en-US']}
              </h4>
            </div>
            <div className="table-cell w-30">
              <button type="button" className="btn cs-btn-circle" onClick={() => clearSelectedValue()}>
                Clear
            </button>
            </div>
        </div>
        )
      }
      {
        (selectedvalue === null)
        && (
          <div>
            <input className="cs-text-box w-65" type="text" onChange={(e) => handleChange(e)} placeholder="Search..." />
            <ul style={dropdownList}>
              {
                filterdata
                && filterdata.map((category) => (
                  <li className="table-row" key={category.name['en-US']}>
                    <a className="table-cell w-30" onClick={() => selectHandler(category)}>
                      <div className={classes.name} title={category.name['en-US']}>
                        {category.name['en-US']}
                      </div>
                    </a>
                  </li>
                ))
              }
            </ul>
          </div>
        )
      }
    </div>
  );
};

export default Category;
