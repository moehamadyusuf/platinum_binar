const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = [
    './routes/auth.routes.js',
    './routes/cart.routes.js',
    './routes/chat.routes.js',
    './routes/checkout.routes.js',
    './routes/order.routes.js',
    './routes/product.routes.js',
]

swaggerAutogen(outputFile, endpointsFiles);