const express = require("express");
const app = express();
const PORT = 8080;
const todoRouter = require("./routes/todo");
const cors = require("cors"); // cors 정책 해결
const corsConfig = {
  origin: "http://localhost:3001",
  credentials: true,
};

app.use(cors(corsConfig)); // 모든 서버에서 보내는 요청 수락
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", todoRouter); // 기본주소: localhost:PORT/
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
