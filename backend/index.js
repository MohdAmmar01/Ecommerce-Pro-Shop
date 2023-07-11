const  express =require( 'express')
const  dotenv =require( 'dotenv')
const  { errorHandler } =require( './middleware/errorMiddleware.js')
const  connectDB =require( './config/db.js')
const  cp =require( "cookie-parser")
const  cors =require( "cors")
const  productRoutes =require( './src/routes/productRoutes.js')
const  userRoutes =require( './src/routes/userRoutes.js')
const  orderRoutes =require( './src/routes/orderRoutes.js')

dotenv.config()

connectDB()

const app = express()


app.use(cors({origin:"https://pro-shop-frontend.vercel.app",credentials:true}))
app.use(express.json())
app.use(cp())
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)
app.get('/api/config/exchange', (req, res) =>
  res.send(process.env.EXCHANGE_API_KEY)
)

  app.get('/', (req, res) => {
    res.send('API is running....')
  })

app.use(errorHandler)

const PORT = process.env.PORT || 8000

app.listen(
  PORT,
  console.log("Server running on port 8000")
)