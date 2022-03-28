import React from "react";
import {
  SearchSelectionNetwork,
  SearchSelectionExchange
} from "./SearchFilteringSelections";


/**
 * searchNetworks: networks to be searched
 * setSearchNetworks: function to set "searchNetworks" to the state.
 * searchExchanges: exchanges to be searched
 * setSearchExchanges: function to set "setSearchExchanges" to the state.
 * @returns 
 */
export const SearchFiltering = ({ searchNetworks, setSearchNetworks, searchExchanges, setSearchExchanges }) => {
  // ----------------------------------------------------------------------------------------------------------------------------------------------------
  // Rendering.
  return (
    <div style={{ border: "solid", padding: "10px" }}>
      <SearchSelectionNetwork
        networkName={"Ethereum"}
        searchNetworks={searchNetworks}
        setSearchNetworks={setSearchNetworks}
        searchExchanges={searchExchanges}
        setSearchExchanges={setSearchExchanges}
      />
      <SearchSelectionNetwork
        networkName={"Avalanche"}
        searchNetworks={searchNetworks}
        setSearchNetworks={setSearchNetworks}
        searchExchanges={searchExchanges}
        setSearchExchanges={setSearchExchanges}
      />
      <SearchSelectionNetwork
        networkName={"BSC"}
        searchNetworks={searchNetworks}
        setSearchNetworks={setSearchNetworks}
        searchExchanges={searchExchanges}
        setSearchExchanges={setSearchExchanges}
      />
      <hr />
      <SearchSelectionExchange
        exchangeName={"UniswapV3"}
        searchExchanges={searchExchanges}
        setSearchExchanges={setSearchExchanges}
        searchNetworks={searchNetworks}
      />
      <SearchSelectionExchange
        exchangeName={"SushiSwap"}
        searchExchanges={searchExchanges}
        setSearchExchanges={setSearchExchanges}
        searchNetworks={searchNetworks}
      />
      <SearchSelectionExchange
        exchangeName={"Pangolin"}
        searchExchanges={searchExchanges}
        setSearchExchanges={setSearchExchanges}
        searchNetworks={searchNetworks}
      />
      <SearchSelectionExchange
        exchangeName={"TraderJoe"}
        searchExchanges={searchExchanges}
        setSearchExchanges={setSearchExchanges}
        searchNetworks={searchNetworks}
      />
      <SearchSelectionExchange
        exchangeName={"PancakeSwap"}
        searchExchanges={searchExchanges}
        setSearchExchanges={setSearchExchanges}
        searchNetworks={searchNetworks}
      />
      <SearchSelectionExchange
        exchangeName={"MDex"}
        searchExchanges={searchExchanges}
        setSearchExchanges={setSearchExchanges}
        searchNetworks={searchNetworks}
      />
    </div>
  )
}
export default SearchFiltering;