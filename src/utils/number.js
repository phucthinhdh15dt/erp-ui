export const formatToCurrency = (amount, affix = true) => {
    return String(amount).replace(/\d(?=(\d{3})+$)/g, '$&,') + (affix ? '₫' : '');
};
