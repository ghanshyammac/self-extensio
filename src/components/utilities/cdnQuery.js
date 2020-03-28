/* eslint-disable no-unused-expressions */
import axios from 'axios';

const cdnQuery = (
  contentTypeUid = null,
  query = null,
  other = null,
  skip = null,
  limit = null,
) => {
  const CDNURL = `https://cdn.contentstack.io/v3/content_types/${contentTypeUid}/entries?${other || ''}`;
  const params = {
    environment: `${process.env.GATSBY_CONTENTSTACK_ENVIRONMENT || 'development'}`,
    api_key: `${process.env.GATSBY_CONTENTSTACK_API_KEY || 'bltb24eba5e54eb8b22'}`,
    authtoken: `${process.env.GATSBY_CONTENTSTACK_DELIVERY_TOKEN || 'csf402b651341cdfb3506ddfc4'}`,
    skip,
    limit,
    query,
  };

  skip ? params.skip = skip : '';
  limit ? params.limit = limit : '';

  return (axios.get(CDNURL, { params }));
};

export default cdnQuery;
