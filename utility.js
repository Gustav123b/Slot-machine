function randInt(x, y = 0) {
    return Math.floor(Math.random() * (x - y + 1) + y)
}

const NUMBER_FORMATTER = new Intl.NumberFormat(undefined)
function formatNumber(number) {
    return NUMBER_FORMATTER.format(number)
}

const COMPACT_NUMBER_FORMATTER = new Intl.NumberFormat(undefined, {
    notation: "compact",
})
function formatCompactNumber(number) {
    return COMPACT_NUMBER_FORMATTER.format(number)
}
