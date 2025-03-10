const  asyncHandler =require( 'express-async-handler')
const  Order =require( '../models/orderModel.js')
const  Product =require( '../models/productModel.js')


const getProducts = asyncHandler(async (req, res) => {
  // const pageSize = 10
  // const page = Number(req.query.pageNumber) || 1

  // const keyword = req.query.keyword
  //   ? {
  //       name: {
  //         $regex: req.query.keyword,
  //         $options: 'i',
  //       },
  //     }
  //   : {}

  // const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({}).sort({createdAt:-1})
    // .limit(pageSize)
    // .skip(pageSize * (page - 1))

  res.status(200).json({"success":true,"message":products })
})
const searchedProducts = asyncHandler(async (req, res) => {

  const products = await Product.find({$text:{$search:req.params.id}}).sort({createdAt:-1})

  res.status(200).json({"success":true,"message":products })
})

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json({"success":true,"message":product})
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({"success":true, message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    user: req.user._id,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    numReviews: 0,
    description: req.body.description,
  })

  const createdProduct = await product.save()
  res.status(201).json({"success":true,"message":createdProduct})
})

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name 
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.status(200).json({"successu":true,"message":updatedProduct})
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ "success":true,"message": 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.status(200).json({"success":true,"message":products})
})

module.exports= {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  searchedProducts,
  updateProduct,
  createProductReview,
  getTopProducts,
}
