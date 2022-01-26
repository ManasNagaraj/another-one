import express from 'express'
import  config from './config/default'
import log from './logger'
import routes from './routes'
import { Connect , Query} from './dao/connect'




const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.listen(config.server.port,config.server.hostname,()=>{
    log.info(`Server is started at http://${config.server.hostname}:${config.server.port}`)
    routes(app);
    
}) 



