const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(200)
    res.status(200).json({
      success:false,
      message: err.message,
      stack: err.stack,
    })
  }
  
  module.exports= {errorHandler }
  