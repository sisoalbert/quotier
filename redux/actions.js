export const ADD_FAVORITE_ITEM = 'ADD_FAVORITE_ITEM';
export const REMOVE_FAVORITE_ITEM = 'REMOVE_FAVORITE_ITEM';

export const addFavorite = (quote) => (dispatch) => {
  dispatch({
    type: ADD_FAVORITE_ITEM,
    payload: quote,
  });
};

export const removeFavorite = (quote) => (dispatch) => {
  dispatch({
    type: REMOVE_FAVORITE_ITEM,
    payload: quote,
  });
};
