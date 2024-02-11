import * as express from "express"
import { AppDataSource } from "./data-source"
import routes from "./routes"

AppDataSource.initialize()
    .then(async () => {
        const app = express()
        const port = 3000

        app.use(express.json())
        app.use("/api/v1", routes )
        app.listen(port, () =>
        console.log(`Server running on port : ${port}`)
      );
    })
    .catch(error => console.log(error))
