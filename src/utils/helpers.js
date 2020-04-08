export function distinctByField(list, fieldName = "") {
    if (!list || list.length < 1) {
        return [];
    }
    return fieldName
        ? list
              .map((field) => field[fieldName])
              .map((field, i, arr) => arr.indexOf(field) === i && i)
              .filter((field) => list[field])
              .map((field) => list[field])
        : [...new Set(list)];
}

export function randomize(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
