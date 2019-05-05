export const sortAlphabetically = (list) => (
  list.sort((a, b) => {
    if (a < b) {
      return -1
    } else if (a > b) {
      return 1
    }

    return 0
  })
)