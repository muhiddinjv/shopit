import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

export const productReducers = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCTS_REQUEST:
      return { loading: true, products: [] };
    case ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        resPerPage: action.payload.resPerPage,
        filteredProductsCount: action.payload.filteredProductsCount,
      };
    case ALL_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };

    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case PRODUCT_DETAILS_FAIL:
      return { ...state, error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};

export const productDetailsReducers = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case PRODUCT_DETAILS_FAIL:
      return { ...state, error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};

// export default productReducers;

// import LOAD_QUERY from "../../Graphql";
// import Helper from "../../Helpers";
// const jsonData = require("./data.json");

// const initState = {
//   total: 0,
//   cart: [],
//   items: [],
//   price: [],
//   currencies: [],
//   selCurrency: "USD",
// };

// const fetchData = () => {
//   const {
//     category: { products },
//     currencies,
//   } = jsonData.data;
//   products.map((p) => initState.items.push(p));
//   currencies.map((c) => initState.currencies.push(c));
// };

// const cartReducer = (state = initState, action) => {
//   if (action.type === "SELECT_CURRENCY") {
//     return { ...state, selCurrency: action.currency };
//   }

//   if (action.type === "ADD_TO_CART") {
//     const {
//       product: { id, name, brand, prices, attributes, gallery },
//       values,
//     } = action;
//     const cartCopy = { ...state.cart };

//     if (!cartCopy[id]) {
//       cartCopy[id] = {
//         name: name,
//         brand: brand,
//         addedAttrs: [{ ...values, count: 1, id: Helper.uuid() }],
//         attributes: attributes,
//         gallery: gallery,
//         prices: prices,
//         totalCount: 1,
//       };
//     } else {
//       const addedAttrsCopy = [...cartCopy[id].addedAttrs];
//       const foundIndex = addedAttrsCopy.findIndex((item) => {
//         return Object.keys(values).every((key) => {
//           const newValue = values[key];
//           return item[key] === newValue;
//         });
//       });

//       if (foundIndex > -1) {
//         const found = addedAttrsCopy[foundIndex];
//         addedAttrsCopy[foundIndex] = { ...found, count: found.count + 1 };
//       } else {
//         addedAttrsCopy.push({ ...values, count: 1, id: Helper.uuid() });
//       }

//       cartCopy[id].addedAttrs = addedAttrsCopy;
//       cartCopy[id].totalCount = addedAttrsCopy.reduce(
//         (acc, curr) => acc + curr.count,
//         0
//       );
//     }

//     const addedPricesCopy = [...cartCopy[id].prices];
//     const priceDetails = addedPricesCopy?.filter(
//       (price) => price.currency === state.selCurrency && price.amount
//     );

//     const price = priceDetails[0].amount;
//     const newTotal = state.total + price;

//     return {
//       ...state,
//       cart: cartCopy,
//       total: newTotal,
//     };
//   }

//   if (action.type === "REMOVE_ITEM") {
//     for (const values of Object.values(state.cart)) {
//       for (const attribute of values.addedAttrs) {
//         if (attribute.id === action.id) {
//           values.addedAttrs = values.addedAttrs.filter(
//             (attribute) => action.id !== attribute.id
//           );

//           const priceDetails = action.prices.find(
//             (price) => price.currency === state.selCurrency
//           );
//           const newTotal = state.total - priceDetails.amount * attribute.count;

//           values.totalCount = values.addedAttrs.reduce(
//             (acc, curr) => acc + curr.count,
//             0
//           );

//           return {
//             ...state,
//             total: newTotal,
//           };
//         }
//       }
//     }
//   }

//   if (action.type === "ADD_QUANTITY") {
//     for (const values of Object.values(state.cart)) {
//       for (const attribute of values.addedAttrs) {
//         if (attribute.id === action.id) {
//           attribute.count++;

//           values.totalCount = values.addedAttrs.reduce(
//             (acc, curr) => acc + curr.count,
//             0
//           );

//           const priceDetails = action.prices.find(
//             (price) => price.currency === state.selCurrency
//           );
//           const newTotal = state.total + priceDetails.amount;

//           return {
//             ...state,
//             total: newTotal,
//           };
//         }
//       }
//     }
//   }

//   if (action.type === "SUB_QUANTITY") {
//     for (const values of Object.values(state.cart)) {
//       for (const attribute of values.addedAttrs) {
//         if (attribute.id === action.id) {
//           attribute.count--;

//           if (attribute.count === 0) {
//             values.addedAttrs = values.addedAttrs.filter(
//               (attribute) => action.id !== attribute.id
//             );
//           }
//           values.totalCount = values.addedAttrs.reduce(
//             (acc, curr) => acc + curr.count,
//             0
//           );

//           const priceDetails = action.prices.find(
//             (price) => price.currency === state.selCurrency
//           );
//           const newTotal = state.total - priceDetails.amount;

//           return {
//             ...state,
//             total: newTotal,
//           };
//         }
//       }
//     }
//   } else {
//     return state;
//   }
// };
