import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Link } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(() => ({
  cardsWrapper: {
    margin: '80px 0px',
  },
  root: {
    maxWidth: 345,
  },
  media: {
    minHeight: 300,
  },
}));

const DynamicCards = ({ data }) => {
  const classes = useStyles();

  const { types } = data;

  return (
    <div className={classes.cardsWrapper}>
      <Container>
        <Grid className={classes.cardsWrapper} container>
          {types
            && Array.isArray(types)
            && types.map((dynamicData) => {
              const DyData = dynamicData.section[0];
              return (
                <Grid item xs={6} key={dynamicData.image.uid}>
                  <Link
                    href={`${DyData._content_type_uid}/${DyData.slug}/${DyData.ct_offer_id}`}
                  >
                    <CardMedia
                      className={classes.media}
                      image={dynamicData.image.url}
                      title="Contemplative Reptile"
                    />
                  </Link>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </div>
  );
};

DynamicCards.propTypes = {
  data: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default DynamicCards;
