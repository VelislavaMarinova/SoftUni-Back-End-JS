exports.selectAuctionCategory = (selectedAuctionCategory) => {

    const auctionCategory = [
        { value: 'estate', textContent: 'Real Estate', selected: false },
        { value: 'vehicles', textContent: 'Vehicles', selected: false },
        { value: 'furniture', textContent: 'Furniture', selected: false },
        { value: 'electronics', textContent: 'Electronics', selected: false },
        { value: 'other', textContent: 'Other', selected: false },

    ]
    const result = auctionCategory.map(x => x.value === selectedAuctionCategory ? { ...x, selected: true } : x);
    return result;
};