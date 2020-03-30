import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Product from '../components/product';
import Category from '../components/category';

export const ImageStyle = styled.img`
  height: 420px;
  width: 100%;
  object-fit: cover;
  vertical-align: middle;
`;

export const SliderContainer = styled.div``;

const Index = function Index() {
  const [cms, setcms] = useState({
    config: null,
    fieldconfig: null,
    extension: null,
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ContentstackUIExtension !== 'undefined') {
      console.log('idhar aaya', window.ContentstackUIExtension);

      // connect to ContentStack
      const { ContentstackUIExtension } = window;

      ContentstackUIExtension.init().then((ex) => {
        // make extension object globally available
        console.log('adadadada=======>', ex);
        setcms({ config: ex.config, fieldconfig: ex.fieldConfig, extensionField: ex });
      });
    }
  }, []);

  return (
    <div>
      <h1>Extension</h1>
      {
        (cms.fieldconfig && cms.fieldconfig.type === 'product')
        && <Product cms={cms} />
      }
      {
        (cms.fieldconfig && cms.fieldconfig.type === 'category')
        && <Category cms={cms} />
      }
      {
        cms.fieldconfig
        && <h1>{cms.fieldconfig.type}</h1>
      }
    </div>
  );
};


export default Index;
