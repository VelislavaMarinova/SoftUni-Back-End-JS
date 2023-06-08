exports.selectPaymentMethods = (selectedPaymentMethod) => {

    const paymenMethod = [
        { value: 'crypto-wallet', textContent: 'Crypto Wallet', selected: false },
        { value: 'credit-card', textContent: 'Credit Card', selected: false },
        { value: 'debit-card', textContent: 'Debit Card', selected: false },
        { value: 'paypal', textContent: 'PayPal', selected: false },
    ]
    const result = paymenMethod.map(x => x.value === selectedPaymentMethod ? { ...x, selected: true } : x);
    return result;
};