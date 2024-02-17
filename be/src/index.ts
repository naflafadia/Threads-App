import * as express from "express"
import { AppDataSource } from "./data-source"
import routes from "./routes"
import "dotenv/config"

AppDataSource.initialize()
    .then(async () => {
        const app = express()

        app.use(express.json())
        app.use("/api/v1", routes )
        app.listen(process.env.PORT, () =>
        console.log(`Server running on port : ${process.env.PORT}`)
      );
    })
    .catch(error => console.log(error))
