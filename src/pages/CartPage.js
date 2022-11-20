import React from 'react';
import styled from 'styled-components';
import { useCartContext } from '../context/cart_context';
import { Link } from 'react-router-dom';
import { CartContent, PageHero } from '../components';

const CartPage = () => {
  const { cart, total_amount, shipping_fee } = useCartContext();

  if (cart.length < 1) {
    return (
      <Wrapper className='page-100'>
        <div className='empty'>
          <h2>Your Cart Is Empty</h2>
          <Link to='/products' className='btn'>
            shop
          </Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <main>
      <PageHero title='cart' product={true} />
      <Wrapper className='page'>
        <CartContent cart={cart} />
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`;

export default CartPage;
