import { getConnection, sql } from "../../configs/sqlServer.js";

export const getAllProducts = async () => {
    const pool = getConnection();

    const result = await pool.request().query(`
        SELECT * FROM Products ORDER BY id DESC
    `);

    return result.recordset

};

export const getProductById = async (id) => {
    const pool = getConnection();

    const result = await pool.request()
    .input("id", sql.Int, Number(id))
    .query(`
        SELECT * FROM Products WHERE id = @id
    `);

    return result.recordset[0];
}

export const createProduct = async ({name, price, image, status, stock }) => {
    const pool = getConnection();

    const result = await pool
        .request()
        .input("name", sql.VarChar(200), name)
        .input("price", sql.Decimal(10,2), Number(price))
        .input("image", sql.VarChar(sql.MAX), image)
        .input("status", sql.Bit, status)
        .input("stock", sql.Int, Number(stock))
        .query(`
            INSERT INTO Products (name, price, image, status, stock)
            OUTPUT INSERTED.*
            VALUES (@name, @price, @image, @status, @stock)
        `);

    return result.recordset[0];
}

export const updateProduct = async (id, {name, price, image, status, stock }) => {
    const pool = getConnection();

    const result = await pool
        .request()
        .input("id", sql.Int, Number(id))
        .input("name", sql.VarChar(200), name)
        .input("price", sql.Decimal(10,2), Number(price))
        .input("image", sql.VarChar(sql.MAX), image)
        .input("status", sql.Bit, status)
        .input("stock", sql.Int, Number(stock))
        .query(`
            UPDATE Products 
            SET
                name = @name, 
                price = @price, 
                image = @image, 
                status = @status, 
                stock = @stock,
                updateAt = GETDATE()
            OUTPUT INSERTED.*
            WHERE id = @id
        `);

    return result.recordset[0];
}

export const deleteProduct = async (id) => {
    const pool = getConnection();

    const result = await pool
    .request()
    .input("id", sql.BigInt, Number(id))
    .query(`DELETE FROM Products WHERE id = @id`);

    return result.rowsAffected[0];
}