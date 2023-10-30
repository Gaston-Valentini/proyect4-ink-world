import app from "./app/app"
import { database } from "./database/database"

const startApp = () => {
    database.initialize()
    .then(() => {
        try {
            app.listen(3000, () => {
                console.log("Ready");
            })
        } catch (error) {
            console.log(error);
        }
    })
    .catch(error => console.log(error))
}

startApp()