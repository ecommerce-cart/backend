import { array, number, object } from "yup";

export const addToCartValidator = object().shape({
  productId: number().required(),
  variations: array().of(number()).required(),
  quantity: number().required(),
});

export const updateCartValidator = object().shape({
  cartProductId: number().required(),
  quantity: number().required(),
});

export const deleteCartProductValidator = object().shape({
  cartProductId: number().required(),
});
