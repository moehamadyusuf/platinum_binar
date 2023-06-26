const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const http = require("http").createServer(app);
const { Server } = require("socket.io");
const { authMiddleware } = require("../platinum_new/middleware/authenticate");
const {
    getChat,
    getChatAdmin,
    getDetailChat,
    create,
} = require("../platinum_new/controllers/chat.controller");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const io = new Server(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
    path: "/chat",
});

io.on("connection", (socket) => {
    // console.log(`User Connected: ${socket.id}`);
    socket.on("get-chat-data", (data, callback) => {
        getChat(data, (result) => {
            callback({ response: result });
        });
    });

    socket.on("get-chat-data-admin", (data, callback) => {
        getChatAdmin(data, (result) => {
            callback({ response: result });
        });
    });

    socket.on("get-chat-detail", (data, callback) => {
        getDetailChat(data, (result) => {
            callback({ response: result });
        });
    });

    socket.on("kirim-pesan", (data, callback) => {
        const { roomId, msg, senderId } = data;
        socket.to(roomId).emit("terima-pesan", { msg, senderId, roomId });
        create(data, (result) => {
            callback({ response: result });
        });
    });

    // bergabung ke ruang chat yang sesuai berdasarkan ID room
    socket.on("join-room", (roomId) => {
        socket.join(roomId);
    });

    // bergabung ke ruang chat yang sesuai berdasarkan ID room
    socket.on("leave-room", (roomId) => {
        socket.leave(roomId);
    });
});

app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Tambahkan middleware multer
const upload = multer({ storage: multer.memoryStorage() });

// Ganti middleware body-parser dengan multer
app.use(upload.single("image"));
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.status(200).send({ message: "OK." });
});

const PORT = process.env.PORT || 8080;

http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

io.listen(http);

require("./routes/auth.routes")(app);
require("./routes/product.routes")(app);
require("./routes/cart.routes")(app);
require("./routes/checkout.routes")(app);
require("./routes/order.routes")(app);
// require("./app/routes/chat.routes")(app);
