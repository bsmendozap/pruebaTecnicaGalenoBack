import sql from "mssql";

const dbSettings = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT) || 1433,
    options: {
        encrypt: true,
        trustServerCertificate: false,
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
    },
};

let pool;

export const dbConnection = async () => {
    try {
        pool = await sql.connect(dbSettings);
        console.log("SQL Server | connected to database");
    } catch (error) {
        console.log("SQL Server | Database connection failed");
        console.log(error);
    }
};

export const getConnection = () => {
    if(!pool){
        throw new Error("SQL Server | No hay conexión activa");
    }

    return pool;
};

export {sql};