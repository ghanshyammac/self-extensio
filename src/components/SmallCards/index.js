import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Link } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  smallCardsWrapper: {
    backgroundColor: '#F9F9FB',
    // margin: '80px 0px',
    padding: '50px 0px 55px',
    textAlign: 'center',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 -24px',
  },
  card: {
    padding: '24px',
    width: '20%',
  },
  cardBg: {
    backgroundColor: '#fff',
    display: 'flex',
    height: '150px',
    padding: '20px',
    position: 'relative',
  },
  img: {
    height: 'auto',
    margin: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    width: 'auto',
    position: 'absolute',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridListItem: {
    backgroundColor: '#fff',
    padding: '20px',
  },
}));

const SmallCards = ({ data }) => {
  const classes = useStyles();
  const { title, types } = data;

  return (
    <div className={classes.smallCardsWrapper}>
      <Container>
        <h2>{title}</h2>
        <div className={classes.cardContainer}>
          {types
            && Array.isArray(types)
            && types.map((cardData) => {
              const cardD = cardData.section[0];
              return (
                <div className={classes.card} key={cardData.image.uid}>
                  <Link
                    href={`${cardD._content_type_uid}/${cardD.slug}/${cardD.ct_brand_id}`}
                    className={classes.cardBg}
                  >
                    <img
                      src={cardData.image.url}
                      className={classes.img}
                      alt=""
                    />
                  </Link>
                </div>
              );
            })}
        </div>
      </Container>
    </div>
  );
};

SmallCards.propTypes = {
  data: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default SmallCards;
