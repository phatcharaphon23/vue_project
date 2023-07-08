import core from '../client/'
const getBooks = {
  async getBooksProvider() {
    const data = core.fetch(
      `http://localhost:3000/account`
    )
    return data
  },

  async getBooksIDProvider(item) {
    const data = core.fetch(
      `http://localhost:3000/user`, item
    )
    return data
  },

  async postBooksIDProvider(item) {
    const data = core.create(
      `http://localhost:3000/importfile`, item
    )
    return data
  },
}
export default getBooks
