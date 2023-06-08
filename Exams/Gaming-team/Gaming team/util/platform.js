exports.selectPlatform = (selectedPlatform) => {

    const platform = [
        { value: 'PC', textContent: 'PC', selected: false },
        { value: 'Nintendo', textContent: 'Nintendo', selected: false },
        { value: 'PS4', textContent: 'PS4', selected: false },
        { value: 'PS5', textContent: 'PS5', selected: false },
    ]
    const result = platform.map(x => x.value === selectedPlatform ? { ...x, selected: true } : x);
    return result;
};