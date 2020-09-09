import { createSlice } from '@reduxjs/toolkit';
import {
	getCartItemFromLocalStore,
	saveCartItemInLocalStore
} from './localStorage';

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
								quantity:
									item.quantity === item.availableUnits
										? item.quantity
										: item.quantity + quantity,
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
			const id = action.payload;
			state.cart.map((item) =>
				item.productId === id
					? {
							...item,
							totalPrice: 10 * item.unitPrice,
							quantity:
								item.quantity === item.availableUnits
									? item.quantity
									: item.quantity++
							// totalPrice: (item.quantity + 1) * item.unitPrice
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
							quantity: item.quantity === 1 ? item.quantity : item.quantity--,
							// totalPrice: (item.quantity - 1) * item.unitPrice
							totalPrice: 110 * item.unitPrice
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
			saveCartItemInLocalStore(state.cart);
			return state;
		}
	}
});

export const {
	addToCart,
	decrementCartItem,
	incrementCartItem,
	removeCartItem
} = cartActions.actions;

export default cartActions.reducer;
