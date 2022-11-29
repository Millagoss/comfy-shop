import React from 'react';
import { FaShoppingCart, FaUserMinus, FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useProductsContext } from '../context/products_context';
import { useCartContext } from '../context/cart_context';
import { useUserContext } from '../context/user_context';

const CartButtons = () => {
  const { myUser, loginWithRedirect, loginWithPopup, isLoading, logout } =
    useUserContext();

  const { closeSidebar } = useProductsContext();
  const { total_items } = useCartContext();
  return (
    <Wrapper className='cart-btn-wrapper'>
      <Link to={'/cart'} className='cart-btn' onClick={closeSidebar}>
        Cart
        <span className='cart-container'>
          <FaShoppingCart />
          <span className='cart-value'>{total_items}</span>
        </span>
      </Link>
      <div className='profile-info'>
        {!myUser ? (
          <button type='button' className='auth-btn' onClick={loginWithPopup}>
            Login <FaUserPlus />
          </button>
        ) : (
          <button
            type='button'
            className='auth-btn'
            onClick={() =>
              logout({
                returnTo: window.location.origin,
              })
            }
          >
            Logout <FaUserMinus />
          </button>
        )}

        {myUser ? (
          <>
            <img
              src={myUser.picture}
              title={myUser.given_name || myUser.name}
              className='profile'
              alt=''
            />
            <p className='username'>{myUser.given_name || myUser.name}</p>
          </>
        ) : (
          ''
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  width: fit-content;
  column-gap: 19px;
  align-items: center;
  justify-content: center;

  .profile-info {
    display: flex;
    width: fit-content;
    height: 3rem;
    column-gap: 10px;
    align-items: center;
    justify-content: center;

    .profile {
      width: 3rem;
      border-radius: 50%;
    }
    .username {
      margin-top: 1.2rem;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 1rem;
      font-weight: bold;
      letter-spacing: 1px;
      color: var(--clr-grey-2);
    }
  }

  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;
    width: fit-content;
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
`;
export default CartButtons;
