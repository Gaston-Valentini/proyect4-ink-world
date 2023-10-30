import app from "./app/app"
import { database } from "./database/database"

const startApp = () => {
    database.initialize()
    .then(() => {
        console.log("Connected to database");
        
        try {
            app.listen(3000, () => {
                console.log(`Server listening on port ${app.get("SERVER_PORT")}`);
            })
        } catch (error) {
            console.log(error);
        }
    })
    .catch(error => console.log(error))
}

startApp()