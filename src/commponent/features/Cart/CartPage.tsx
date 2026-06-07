import React, { memo } from 'react';
import { useCart } from '../../../context/CartContext';
import MainLayout from '../../../layouts/MainLayout';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/constant';
import './CartPage.scss';

const CartPage = memo(() => {
    const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

    if (cartItems.length === 0) {
        return (
            <MainLayout>
                <div className="cart-empty-container">
                    <div className="cart-empty">
                        <h2>Your Bag is Empty</h2>
                        <p>It looks like you haven't added anything to your bag yet.</p>
                        <Link to={ROUTES.HOME} className="shop-link">Start Shopping</Link>
                    </div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="cart-container">
                <div className="cart-header">
                    <h1>Your Shopping Bag</h1>
                    <button onClick={clearCart} className="clear-btn">Clear Cart</button>
                </div>

                <div className="cart-layout">
                    <div className="cart-items">
                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <div className="item-image">
                                    <img src={item.thumbnail} alt={item.title} />
                                </div>
                                <div className="item-details">
                                    <h3>{item.title}</h3>
                                    <p className="item-brand">{item.brand}</p>
                                    <p className="item-price">${item.price}</p>
                                </div>
                                <div className="item-actions">
                                    <div className="quantity-controls">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className="remove-btn">Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h2>Summary</h2>
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <hr />
                        <div className="summary-row total">
                            <span>Total</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <button className="checkout-btn">Checkout</button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
});

CartPage.displayName = "CartPage";

export default CartPage;
