import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import styled from 'styled-components';
import CategoryCard from '../Card/index';

export const Ul = styled.ul`
  display: flex;
  font-weight: bold;
  margin: 30px auto;
  padding: 0;
  li {
    color: #8D9191;
    cursor: pointer;
    font-size: 16px;
    list-style-type: none;
    padding: 12px;
    &.active {
      color: #ef4060;
    }
  }
`;

const Pagination = ({ data }) => {
  const [currentPage, setCurrentPage] = useState('1');
  const [todosPerPage, setTodosPerPage] = useState('9');
  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = data.slice(indexOfFirstTodo, indexOfLastTodo);

  const renderTodos = currentTodos.map((list) => {
    const {
      id,
      slug_id: slugId,
      masterVariant: { prices, attributes },
      title,
      master_sku_images: image,
    } = list;
    const cardData = {
      prices, attributes, image, title,
    };
    return (
      <Link href={`/product/${slugId}/${id}`}>
        <Grid item xs={4} key={id}>
          <CategoryCard data={cardData} />
        </Grid>
      </Link>
    );
  });

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / todosPerPage); i += 1) {
    pageNumbers.push(i);
  }


  const renderPageNumbers = pageNumbers.map((number) => (
    <li
      key={number}
      id={number}
      onClick={(e) => handleClick(e)}
      className={number === currentPage ? 'active' : ''}
    >
      {number}
    </li>
  ));

  console.log('currentPage', currentPage);

  return (
    <>
      <Grid container spacing={4}>
        {renderTodos}
      </Grid>
      <Ul id="page-numbers">
        {renderPageNumbers}
      </Ul>
    </>
  );
};


export default Pagination;
