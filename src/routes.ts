import {Express, Request, Response } from 'express'
import logger from './logger';
import {Connect,Query} from './dao/connect'

const NAMESPACE = "login"

export default function(app: Express){
    app.get('/login',(req:Request,res:Response)=>{
        let {username,password} = req.body
        let query = `INSERT INTO users (user_name,password) VALUES ("${username}","${password}")`;

    Connect()
        .then((connection) => {
            
            Query(connection, query)
                .then((result) => {
                    logger.info(NAMESPACE, 'Book created: ', result);

                    return res.status(200).json({
                        result
                    });
                })
                .catch((error) => {
                    logger.error(NAMESPACE, error.message, error);

                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    logger.info(NAMESPACE, 'Closing connection.');
                    connection.end();
                });
        })
        .catch((error) => {
            logger.error(NAMESPACE, error.message, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });

    })
}