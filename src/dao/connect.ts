import mysql from 'mysql';
import config from '../config/default'
import logger from '../logger'

const params = {
    user: config.mysql.user,
    password: config.mysql.pass,
    host: config.mysql.host,
    database: config.mysql.database
};

const Connect = async () =>
    new Promise<mysql.Connection>((resolve, reject) => {
        const connection = mysql.createConnection(params);
        logger.info("SQL connection service started")
        connection.connect((error) => {
            if (error) {
                reject(error);
                return;
            }
            logger.info("SQL connection success")
            resolve(connection);
        });
    }); 

const Query = async (connection: mysql.Connection, query: string) =>
    new Promise((resolve, reject) => {
        connection.query(query, connection, (error, result) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(result);
        });
    });

export { Connect, Query };