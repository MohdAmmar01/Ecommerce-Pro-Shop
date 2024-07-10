const  express =require( 'express')
const  dotenv =require( 'dotenv')
const  { errorHandler } =require( './middleware/errorMiddleware.js')
const  connectDB =require( './config/db.js')
const  cp =require( "cookie-parser")
const  cors =require( "cors")
const  productRoutes =require( './routes/productRoutes.js')
const  userRoutes =require( './routes/userRoutes.js')
const  orderRoutes =require( './routes/orderRoutes.js')

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
app.post('/api/config/exchange', (req, res) =>{
  let myHeaders = new Headers();
        
  myHeaders.append("apikey",process.env.EXCHANGE_API_KEY); 
  
  var requestOptions = {
   method: 'GET',
   headers: myHeaders
  };
  
  
  fetch(`https://api.apilayer.com/exchangerates_data/convert?to=usd&from=inr&amount=${req?.body?.amount}`,requestOptions)
   .then(response => response.json())
   .then(r => {
   return res.status(200).json({"success":true,"message":Number((r.result).toFixed(2))})
   }).catch((e)=>{
      return res.status(200).json({"success":false,"message":"something went wrong ! "})
   })
})

  app.get('/', (req, res) => {
    res.send('API is running....')
  })

app.use(errorHandler)

const PORT = process.env.PORT || 8000

app.listen(
  PORT,
  console.log("Server running on port 8000")
)