/* get all unique value */
const getUnique = (items, value) => {
    /* set accepte uniquement les valeurs uniques */
    return [...new Set(items.map(item => item[value]))]
}

export default getUnique;