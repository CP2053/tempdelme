// Lists all the network and exchange pair.
const pairedNetworkExchange = [
    ['Ethereum', 'UniswapV3'],
    ['Ethereum', 'SushiSwap'],
    ['Avalanche', 'Pangolin'],
    ['Avalanche', 'TraderJoe'],
    ['BSC', 'PancakeSwap'],
    ['BSC', 'MDex'],
];

/**
 * 
 * 
 * @param {*} param0 
 * @returns 
 */
export const SearchSelectionNetwork = ({ networkName, searchNetworks, setSearchNetworks, searchExchanges, setSearchExchanges }) => {
    // ----------------------------------------------------------------------------------------------------------------------------------------------------
    // Rendering.
    return <>
        <input
            type="checkbox"
            checked={searchNetworks.includes(networkName)}
            onChange={() => {
                // Validate that "searchNetworks" contains "networkName".
                if (searchNetworks.includes(networkName)) {
                    // Removes "networkName" from "searchNetworks".
                    searchNetworks = searchNetworks.filter(network => network !== networkName);

                    // Removes the exchanges associated to "networkName" since it's removed from the search.
                    searchExchanges = searchExchanges.filter(exchange => pairedNetworkExchange.filter(pair => pair[0] === networkName && pair[1] === exchange).length === 0);
                }
                else {
                    // Adds "networkName" into "searchNetworks".
                    searchNetworks.push(networkName);
                }

                // Sets the new value for "searchNetworks" using a "Set" to *lazy* clean duplicates; who knows?
                // It may not be the most efficient client wise operation, but considering it has no concurrent request, who cares.
                // The stability gains are worth it in the long run if we decide to add functionality that add risk to the uniqueness
                // of the data contained in the array.
                setSearchNetworks([...new Set(searchNetworks)]);

                // Sets the new value for "searchExchanges", using the same laziness for duplicate cleaning.
                setSearchExchanges([...new Set(searchExchanges)]);
            }}
        />
        {networkName}
    </>
};

/**
 *
 * @param {*} param0
 * @returns
 */
export const SearchSelectionExchange = ({ exchangeName, searchExchanges, setSearchExchanges, searchNetworks }) => {
    // Validates that the any of the selected networks are present in "exchangeNetworks".
    if (pairedNetworkExchange.filter(pair => searchNetworks.includes(pair[0]) && pair[1] === exchangeName).length > 0) {
        // --------------------------------------------------------------------------------------------------------------------------------------------------
        // Rendering.
        return <>
            <input
                type="checkbox"
                checked={searchExchanges.includes(exchangeName)}
                onChange={() => {
                    let filter;


                    // Creates a new set from the array of "searchNetworks".
                    // It may not be the most efficient client wise operation, but considering it has no concurrent request, who cares.
                    // The stability gains are worth it in the long run if we decide to add functionality that add risk to the uniqueness
                    // of the data contained in the array.
                    filter = new Set(searchExchanges);

                    // Ensures that "filter" has "networkName" then proceeds to deletion or adition of the network name according to it's presence in the set.
                    filter[filter.has(exchangeName) ? 'delete' : 'add'](exchangeName);

                    // Sets the new value for "searchNetworks".
                    setSearchExchanges([...filter]);
                }}
            />
            {exchangeName}
        </>
    }


    // ----------------------------------------------------------------------------------------------------------------------------------------------------
    // Rendering.
    return <></>;
};