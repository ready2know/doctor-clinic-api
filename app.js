const app = require("./config/express");
const db = require("./config/db");

db.getConnection((err, conn) => {
  if (!err) {
    console.log(`Database is connected`);
    app.listen(process.env.PORT || 3000, (result) => {
      console.log(`Server is running on ${process.env.PORT || 3000}`);
    });
    conn.release();
  }
});
