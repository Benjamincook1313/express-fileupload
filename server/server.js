import express from "express";
import viteExpress from "vite-express";
import fileUpload from "express-fileupload";
import { Sequelize } from "sequelize";

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(fileUpload());

const sequelize = new Sequelize('postgresql:///imgdb');

app.get("/api/images", async (req, res) => {
  const dbRes = await sequelize.query(`
    SELECT * FROM images;
  `);
  console.log(dbRes);
  res.status(200).send(dbRes[0]);
});

app.post("/api/uploadImg", async (req, res) => {
  const { fileUpload: img } = req.body;
  console.log(req.body);
  console.log(img);

  sequelize.query(`
    INSERT INTO images(image)
    VALUES ('${img}');
  `).then(dbRes => {
    res.status(200).send({message: "success", img: dbRes[0]});
  });

});

viteExpress.listen(app, 5050, () => console.log(`Server listening on port 5050`));