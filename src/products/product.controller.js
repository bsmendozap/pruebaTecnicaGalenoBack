import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "./product.model.js";

export const getProducts = async (req, res) => {
    try {
        const products = await getAllProducts();

        return res.status(200).json({
            msg: "Productos obtenidos correctamente",
            products,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: "Error al obtener productos"
        });
    }
};

export const getProductoById = async (req, res) => {
    try {
        const {id} = req.params;

        const product = await getProductById(id);

        if(!product){
            return res.status(404).json({
                msg: "Producto no encontrado"
            });
        }

        return res.status(200).json({
            msg: "Producto encontrado correctamente",
            product,
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: "Error al obtener producto"
        });
    }
};

export const addProduct = async (req, res) => {
    try {
        const {name, price, image, status = true, stock} = req.body;

        if(!name || price === undefined || stock === undefined){
            return res.status(400).json({
                msg: "name, price y stock son obligatorios",
            });
        }

        if(Number(price) <= 0){
            return res.status(400).json({
                msg: "El precio debe ser mayor a 0",
            });
        }

        if(Number(stock) < 0){
            return res.status(400).json({
                msg: "El stock debe ser mayor a 0",
            });
        }

        const product = await createProduct({
            name, price, image, status, stock
        });

        return res.status(200).json({
                msg: "producto creado correctamente",
                product,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: "Error al crear producto"
        });
    }
};

export const editProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, price, image, status = true, stock} = req.body;

        if(!name || price === undefined || stock === undefined){
            return res.status(400).json({
                msg: "name, price y stock son obligatorios",
            });
        }

        if(Number(price) <= 0){
            return res.status(400).json({
                msg: "El precio debe ser mayor a 0",
            });
        }

        if(Number(stock) < 0){
            return res.status(400).json({
                msg: "El stock debe ser mayor a 0",
            });
        }

        const existingProduct = await getProductById(id);

        if(!existingProduct){
            return res.status(404).json({
                msg: "Producto no encontrado",
            });
        }

        const product = await updateProduct(id, {
            name, price, image, status, stock
        });

        return res.status(200).json({
                msg: "producto creado correctamente",
                product,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: "Error al editar producto"
        });
    }
};

export const deletProduct = async (req, res) => {
    try {
        const {id} = req.params;

        const existingProduct = await getProductById(id);

        if(!existingProduct){
            return res.status(404).json({
                msg: "Producto no encontrado",
            });
        }

        const rowsAffected = await deleteProduct(id);

        if(rowsAffected === 0){
            return res.status(400).json({
                msg: "No se pudo eliminar el producto",
            });
        }

        return res.status(200).json({
                msg: "producto eliminado correctamente",
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: "Error al eliminar producto"
        });
    }
}