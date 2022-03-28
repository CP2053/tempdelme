import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  searchTokenPairs,
  stopSelecting,
} from '../redux/tokenSearchSlice';
import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";
import SearchFiltering from "./SearchFiltering";


export const TokenSearch = () => {
  const dispatch = useDispatch();
  const searchRef = useRef();
  const { isSelecting, isLoading } = useSelector((state) => state);
  const fetchError = useSelector((state) => state?.fetchError);


  // Initialise the state variables and their setters.
  const [searchText, setSearchText] = useState('');
  const [searchNetworks, setSearchNetworks] = useState([]);
  const [searchExchanges, setSearchExchanges] = useState([]);


  // Handles the closing of the modal box of the search.
  useEffect(() => searchModal_closing(dispatch, searchRef), [dispatch]);

  // Keep an eye on the value of "searchText" to fire fire the grahQL query if any value change is detected.
  useEffect(() => searchText_useEffect(dispatch, searchText, searchNetworks, searchExchanges), [dispatch, searchText, searchNetworks, searchExchanges]);

  // ----------------------------------------------------------------------------------------------------------------------------------------------------
  // Rendering.
  return (
    <div ref={searchRef}>
      <SearchInput
        searchText={searchText}
        setSearchText={setSearchText}
      />
      {!fetchError && isSelecting &&
        <SearchFiltering
          searchNetworks={searchNetworks}
          setSearchNetworks={setSearchNetworks}
          searchExchanges={searchExchanges}
          setSearchExchanges={setSearchExchanges}
        />}
      {!fetchError && isSelecting &&
        <SearchResult
          loading={isLoading}
        />}
    </div>
  );
};
export default TokenSearch;

/**
 * Function that handles the validation of the search parameters in order to dispatch the GraphQL query and capture the results.
 * 
 * @param {*} dispatch 
 * @param {*} searchText 
 * @param {*} searchNetworks 
 * @param {*} searchExchanges 
 */
const searchText_useEffect = (dispatch, searchText, searchNetworks, searchExchanges) => {
  // Ensures that "searchText" exists and it's length is sufficient.
  // Ensures that at least one network is selected.
  // Ensures that at least one exchange is selected.
  if (searchText && searchText.length >= process.env.REACT_APP_SEARCH_INPUT_TEXT_MINIMUM_LENGTH && searchNetworks.length > 0 && searchExchanges.length > 0) {
    // Execute the async GraphQL query.
    dispatch(searchTokenPairs(searchText))
  }
};

/**
 * Function that handles the closing of the search modal when the user clicks outside of the said modal.
 * 
 * @param {*} dispatch 
 * @param {*} searchRef 
 */
const searchModal_closing = (dispatch, searchRef) => {
  // We have to use "onmousedown" to avoid an issue where the user select the text in the search bar with a mouse click and releases
  // the button while outside the search bar; which closes the search; which is not the intended/expected behaviour.
  window.onmousedown = e => {
    if (!searchRef?.current?.contains(e.target)) {
      dispatch(stopSelecting());
    }
  };
};