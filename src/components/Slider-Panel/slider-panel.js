/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import styled from 'styled-components';

export const ArrowWrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  height: 100%;
  color: #fffff;
  cursor: pointer;
  z-index: 5;
  transition: color 400ms;
  font-size: 50px;
  @media (min-width: 790) {
    font-size: 75px;
  }
  &:global {
    &.slick-disabled {
      display: none;
    }
  }
  &:hover {
    color: #ffdd33;
  }
`;

export const SliderWrapper = styled.div`
  .slick-list,
  .slick-slider,
  .slick-track {
    position: relative;
    display: block;
  }
  .slick-loading .slick-slide,
  .slick-loading .slick-track {
    visibility: hidden;
  }
  .slick-slider {
    box-sizing: border-box;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
    -khtml-user-select: none;
    -ms-touch-action: pan-y;
    touch-action: pan-y;
    -webkit-tap-highlight-color: transparent;
  }
  .slick-list {
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
  .slick-list.dragging {
    cursor: pointer;
    cursor: hand;
  }
  .slick-slider .slick-list,
  .slick-slider .slick-track {
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    -o-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  .slick-track {
    top: 0;
    left: 0;
  }
  .slick-track:after,
  .slick-track:before {
    display: table;
    content: "";
  }
  .slick-track:after {
    clear: both;
  }
  .slick-slide {
    display: none;
    float: left;
    height: 100%;
    min-height: 1px;
  }
  [dir="rtl"] .slick-slide {
    float: right;
  }
  .slick-slide img {
    display: block;
  }
  .slick-slide.slick-loading img {
    display: none;
  }
  .slick-slide.dragging img {
    pointer-events: none;
  }
  .slick-initialized .slick-slide {
    display: block;
  }
  .slick-vertical .slick-slide {
    display: block;
    height: auto;
    border: 1px solid transparent;
  }
  .slick-arrow.slick-hidden {
    display: none;
  }
  .slick-dots {
    left: 0;
    bottom: 0;
    left: 0px;
    list-style: reset;
    position: absolute;
    right: 0px;
    text-align: center;
    li {
      display: inline-block;
      vertical-align: middle;
      margin: 0 8px;
      &.slick-active button {
        background-color: #ef4060;
        border-color: #ef4060;
      }
    }
    button {
      background-color: white;
      border: 1px solid #c5c6cd;
      border-radius: 100%;
      cursor: pointer;
      display: block;
      height: 9px;
      padding: 0px;
      text-indent: -9999em;
      width: 9px;
      &:hover {
        background-color: #ef4060;
        border-color: #ef4060;
      }
      &:focus {
        outline: 0px none;
      }
    }
  }
  .slick-arrow {
    &.slick-prev,
    &.slick-next {
      background: #d9d9e2;
      cursor: pointer;
      width: 55px;
      height: 60px;
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
      border: 0 none;
      z-index: 1;
      text-indent: -9999px;
      &:focus,
      &:hover:focus {
        outline: 0px none;
      }
      &:before {
        content: "";
        border-top: 2px solid #292b33;
        border-left: 2px solid #292b33;
        position: absolute;
        left: 0;
        top: 0;
        width: 15px;
        height: 15px;
        bottom: 0;
        right: 0;
        margin: auto;
      }
    }
    &.slick-prev {
      left: 0;
      &:before {
        transform: rotate(-45deg);
      }
    }
    &.slick-next {
      right: 0px;
      &:before {
        transform: rotate(135deg);
      }
    }
  }
`;

const SlickSlider = (props) => {
  const {
    children,
    ...other
  } = props;

  const settings = {
    dots: true,
    speed: 500,
    arrows: true,
    slidesToScroll: 1,
    lazyLoad: true,
  };

  const loading = false;

  return (
    !loading && (
      <SliderWrapper>
        <Slider {...settings} {...other}>
          {children}
        </Slider>
      </SliderWrapper>
    )
  );
};

SlickSlider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SlickSlider;
