import { DraftProductSchema, ProductSchema, ProductArraySchema, type Product } from "../types"
import { safeParse } from "valibot"
import axios from "axios"

type ProductData = {
    [k: string]: FormDataEntryValue
}

const baseUrl = `${import.meta.env.VITE_API_URL}/api/products`;


export async function addProduct(data: ProductData) {
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })

        if (result.success) {
            await axios.post(baseUrl, result.output)
        }
        else {
            throw new Error('Datos no válidos')
        }
    }
    catch (error) {
        console.log(error);
    }
}

export async function getProducts() {
    try {
        const { data } = await axios(baseUrl);

        const result = safeParse(ProductArraySchema, data.data);

        if (result.success) {
            return result.output;
        }
        else {
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getProductById(productId: Product['id']) {
    try {
        const urlWithId = baseUrl + `/${productId}`

        const { data } = await axios.get(urlWithId)

        const result = safeParse(ProductSchema, data.data)

        if (result.success) {
            return result.output;
        }
        else {
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.log(error);
    }
}

export async function modifyProduct(data: ProductData, id: Product['id']) {
    try {
        const urlWithId = baseUrl + `/${id}`


        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: +data.price, availability: data.availability === "true"
        })

        if (result.success) {
            await axios.put(urlWithId, result.output
            )
        }
        else {
            throw new Error('Datos no válidos') }
    }
    catch (error) {
        console.log(error)
    }
}

export async function modifyAvailability(id: Product['id']) {
    console.log('desde service');
    const urlWithId = baseUrl + `/${id}`
    try {
        await axios.patch(urlWithId)
    } catch (error) {
        console.log(error)
    }


}

export async function deleteProduct(id: Product['id']) {
    try {
        const urlWithId = baseUrl + `/${id}`
        await axios.delete(urlWithId);

    } catch (error) {
        throw new Error('Hubo un error al acceder a base de datos')
    }
}
