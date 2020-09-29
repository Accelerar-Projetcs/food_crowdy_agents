import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
	getCartItemFromLocalStore,
	saveCartItemInLocalStore
} from './localStorage';

const notify = (value, message, type) => {
	toast[type](message)
	return value
}
const cartProducts = getCartItemFromLocalStore();
const initialState = {
	cart: cartProducts
};
const cartActions = createSlice({
	name: 'Cart',
	initialState,
	reducers: {
		addToCart(state, action) {
			const { productId, quantity } = action.payload;
			const cartItems = state.cart.filter(
				(item) => item.productId === productId
			);
			if (cartItems.length) {
				const addedItem = state.cart.map((item) =>
					item.productId === productId
						? {
							...item,
							quantity: item.quantity === item.converisonUnit ? notify(item.quantity, `You have reached the total number of units available for this product measurement type`, 'warning') :
								notify(item.quantity + quantity, `One item added to cart`, `success`),
							totalPrice: (item.quantity + quantity) * item.unitPrice
						}
						: item
				);
				state.cart = addedItem;
				saveCartItemInLocalStore(state.cart);
			} else {
				state.cart.push(action.payload);
				saveCartItemInLocalStore(state.cart);
			}
			return state;
		},

		incrementCartItem(state, action) {
			const id = action.payload
			state.cart.map((item) =>
				item.productId === id
					? {
						...item,
						quantity:
							item.quantity === item.converisonUnit ? notify(item.quantity, `You have reached the total number of units available for this product measurement type`) :


								item.quantity++
					}
					: item
			);
			saveCartItemInLocalStore(state.cart);
			return state;
		},

		decrementCartItem(state, action) {
			const id = action.payload;
			state.cart.map((item) =>
				item.productId === id
					? {
						...item,
						quantity: item.quantity === 1 ? notify(item.quantity, `you can cannot reduce lesser than one`) : item.quantity--
					}
					: item
			);
			saveCartItemInLocalStore(state.cart);
			return state;
		},

		removeCartItem(state, action) {
			const id = action.payload;

			const remainingCartItems = state.cart.filter(
				(item) => item.productId !== id
			);
			state.cart = remainingCartItems;
			notify(0, `One cart item successfully removed`)
			saveCartItemInLocalStore(state.cart);
			return state;
		},
		removeAllCartItem(state, action) {
			state.cart = [];
			saveCartItemInLocalStore(state.cart);
			return state;
		}
	}
});

export const {
	addToCart,
	decrementCartItem,
	incrementCartItem,
	removeAllCartItem,
	removeCartItem
} = cartActions.actions;

export default cartActions.reducer;
