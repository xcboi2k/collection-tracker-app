export const formatPeso = (value) => {
    const number = Number(value || 0)

    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(number)
}
