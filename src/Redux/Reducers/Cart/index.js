import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
	cart: []
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

			toast.success('Item added to cart');
			if (cartItems.length) {
				console.log(cartItems);
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
			} else {
				state.cart.push(action.payload)
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
			return state;
		},

		removeCartItem(state, action) {
			const id = action.payload;
			console.log(id);
			const remainingCartItems = state.cart.filter(
				(item) => item.productId !== id
			);
			state.cart = remainingCartItems;
			console.log('aslckjl');
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
