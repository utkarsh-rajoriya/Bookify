const createBook = (
  title,
  price,
  category,
  description,
  imageUrl,
) => ({
  title,
  price : Number(price),
  category,
  description,
  imageUrl,
  createAt : new Date()
})