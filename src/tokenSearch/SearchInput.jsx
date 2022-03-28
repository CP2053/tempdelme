import React, {
  useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import magnifyingGlass from './icon-search.svg';
import {
  searchTokenPairs,
  startSelecting,
  stopSelecting,
  toggleSelecting
} from '../redux/tokenSearchSlice';

const PairField = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  border-color: #067c82;
  border-style: solid;
  border-width: 2px;
  border-radius: 30px;
  background: #08333c;
  padding: 11px 15px;
  font-size: 15px;
  color: #ffffff;
  font-family: 'Fira Code', monospace;

  @media only screen and (max-width: 990px) {
    width: 100%;
  }

  @media only screen and (max-width: 769px) {
    width: 100%;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  background-color: inherit;
  color: #ffffff;
  //width: auto;
`;

const HideOnSmallScreen = styled.img`
  width: 30px;
  cursor: pointer;
  float: right;
  position: absolute;
  right: 22px;
  top: 9px;
  @media only screen and (max-width: 990px) {
    display: none;
  }
`;

const combinePairText = (pair) => {
  if (pair.token0?.symbol && pair.token1?.symbol && pair.id) {
    const miniAddress = pair.id.slice(0, 8) + '...' + pair.id.slice(-8);
    return pair.token0?.symbol + '/' + pair.token1?.symbol + '/' + miniAddress;
  }
  return '';
};

const SearchInput = ({ searchText, setSearchText }) => {
  const dispatch = useDispatch();
  // const searchText = useSelector((state) => state?.searchText);
  // const isSelecting = useSelector((state) => state?.isSelecting);
  // const isLoading = useSelector((state) => state.isLoading);
  // const selectedPair = useSelector((state) => state?.selectedPair);
  // const selectedPairText = selectedPair && combinePairText(selectedPair);


  // Initialise the "searchDelayer" state.
  // The search delayer is used to prevent the search to be launched on each keystrokes and rather waits for a short moment defined in the env file.
  const [searchDelayer, setSearchDelayer] = useState();


  // ----------------------------------------------------------------------------------------------------------------------------------------------------
  // Rendering.
  return (
    <PairField
      onClick={() => dispatch(startSelecting())}>
      <StyledInput
        placeholder={'Select a token pair..'}
        autocomplete={'off'}
        onChange={e => setSearchText_onChange(searchDelayer, setSearchDelayer, e.target.value, setSearchText)}
        onKeyDown={e => e.code === 'Escape' && dispatch(stopSelecting())}
      />
      <HideOnSmallScreen
        alt={''}
        src={magnifyingGlass}
        onClick={() => dispatch(toggleSelecting())}
      />
    </PairField>
  );
};
export default SearchInput;

/**
 * Function that handle the delayer of the search; this is done to avoid flooding of the server through GraphQL queries by the user, intentionnally or not.
 * This is done client side, it is worth as much as the dev console.
 * Something server side might should be added to cover that aspect.
 * 
 * @param {*} searchDelayer 
 * @param {*} setSearchDelayer 
 * @param {*} searchText 
 * @param {*} setSearchText 
 */
const setSearchText_onChange = (searchDelayer, setSearchDelayer, searchText, setSearchText) => {
  // Clears the previous search delayer.
  clearTimeout(searchDelayer);

  // Sets the new search delayer and the new searc text value.
  setSearchDelayer(setTimeout(value => setSearchText(value), process.env.REACT_APP_SEARCH_INPUT_TEXT_DELAYER, searchText));
};