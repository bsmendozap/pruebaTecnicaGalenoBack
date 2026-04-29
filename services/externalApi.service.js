const API_URL = process.env.EXTERNAL_API_URL;
const API_KEY = process.env.EXTERNAL_API_KEY;
const user = process.env.EXTERNAL_ADMIN_USER;

console.log(user)

export const loginExternalApi = async (username, password) => {
    const response = await fetch(`${API_URL}/api/Login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            usrId: username,
            usrPassword: password,
            apikey: API_KEY,
        }),
    });

    if(!response.ok){
        const errorText = await response.text();
        throw new Error(`Error login API externa ${errorText}`);
        
    }

    return await response.json();

};

export const getExternalProducts = async () => {
    const adminuser = process.env.EXTERNAL_ADMIN_USER;
    const adminpas = process.env.EXTERNAL_ADMIN_PASSWORD
    const loginData = await loginExternalApi(adminuser,adminpas);
        
    const externalToken = loginData.Token;

    if(!externalToken){
        throw new Error("La api externa no devolvio token");
    }


    const response = await fetch(`${API_URL}/api/getProductos`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${externalToken}`,
        },
    });

    const productsData = await response.json();

    if(!response.ok){
        const errorText = await response.text();
        throw new Error(`Error productos api externa: ${JSON.stringify(productsData)}`);
        
    }

    return productsData;
}