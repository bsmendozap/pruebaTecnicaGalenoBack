import { getConnection, sql } from "../../configs/sqlServer.js";

export const createUser = async ({
    name,
    lastName,
    email,
    password,
    role = "USER"
}) => {
    const pool = getConnection();

    const result = await pool.request()
        .input("name", sql.VarChar(100), name)
        .input("lastName", sql.VarChar(100), lastName)
        .input("email", sql.VarChar(150), email.toLowerCase())
        .input("password", sql.VarChar(255), password)
        .input("role", sql.VarChar(50), role)
        .query(`
            INSERT INTO Users (
                name,
                lastName,
                email,
                password,
                role
            )
            OUTPUT 
                INSERTED.id,
                INSERTED.name,
                INSERTED.lastName,
                INSERTED.email,
                INSERTED.role,
                INSERTED.dateCreation,
                INSERTED.canAdd,
                INSERTED.canView,
                INSERTED.canDelete,
                INSERTED.canUpdate
            VALUES (
                @name,
                @lastName,
                @email,
                @password,
                @role
            )
        `);

    return result.recordset[0];
};

export const findUserByEmail = async (email) => {
    const pool = getConnection();

    const result = await pool.request()
        .input("email", sql.VarChar(150), email.toLowerCase())
        .query(`
            SELECT 
                id,
                name,
                lastName,
                email,
                password,
                role,
                dateCreation,
                canAdd,
                canView,
                canDelete,
                canUpdate
            FROM Users
            WHERE email = @email
        `);

    return result.recordset[0];
};

export const findUserById = async (id) => {
    const pool = getConnection();

    const result = await pool.request()
        .input("id", sql.Int, id)
        .query(`
            SELECT 
                id,
                name,
                lastName,
                email,
                role,
                dateCreation,
                canAdd,
                canView,
                canDelete,
                canUpdate
            FROM Users
            WHERE id = @id
        `);

    return result.recordset[0];
};

export const updateUserById = async (id, {
    name,
    lastName,
    email,
    role,
    canAdd,
    canView,
    canDelete,
    canUpdate
}) => {
    const pool = getConnection();

    const result = await pool.request()
        .input("id", sql.Int, id)
        .input("name", sql.VarChar(100), name)
        .input("lastName", sql.VarChar(100), lastName)
        .input("email", sql.VarChar(150), email.toLowerCase())
        .input("role", sql.VarChar(50), role)
        .input("canAdd", sql.Bit, canAdd)
        .input("canView", sql.Bit, canView)
        .input("canDelete", sql.Bit, canDelete)
        .input("canUpdate", sql.Bit, canUpdate)
        .query(`
            UPDATE Users
            SET 
                name = @name,
                lastName = @lastName,
                email = @email,
                role = @role,
                canAdd = @canAdd,
                canView = @canView,
                canDelete = @canDelete,
                canUpdate = @canUpdate
            OUTPUT 
                INSERTED.id,
                INSERTED.name,
                INSERTED.lastName,
                INSERTED.email,
                INSERTED.role,
                INSERTED.dateCreation,
                INSERTED.canAdd,
                INSERTED.canView,
                INSERTED.canDelete,
                INSERTED.canUpdate
            WHERE id = @id
        `);

    return result.recordset[0];
};

export const deleteUserById = async (id) => {
    const pool = getConnection();

    const result = await pool.request()
        .input("id", sql.Int, id)
        .query(`
            DELETE FROM Users
            OUTPUT 
                DELETED.id,
                DELETED.name,
                DELETED.lastName,
                DELETED.email,
                DELETED.role
            WHERE id = @id
        `);

    return result.recordset[0];
};