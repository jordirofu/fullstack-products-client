import { Link, Form, useActionData, type ActionFunctionArgs, redirect, type LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { getProductById, modifyProduct } from "../services/ProductService";
import type { Product } from "../types";
import ProductForm from "../components/ProductForm";


//OJO PARA ESTE MÉTODO Y EL DE ABAJO.. TAMBIÉN EXISTEN LOS TIPOS ACTIONFUNCTION Y LOADERFUNCTION... SI NO VAS A RECUPERAR PARÁMETROS.
export async function action({ request, params }: ActionFunctionArgs) { //--> la request, params, etc siempre ha de llevar este tipo: ActionFunctionArgs
    //request es para hacer request.formData y obtener los valores del formulairo
    //param es para leer el parámetro de la url... que es el id    

    const data = Object.fromEntries(await request.formData()) //sale un objecto con el conjunto de key values que tocan

    let error = '';
    if (Object.values(data).includes("")) {
        error = 'Todos los campos son obligatorios';
    }

    if (error.length) {
        return error;  //VIT! Cdo devuelves algo en tus "actions" están de vuelta en tu componente Form, 
        // por medio de un hook llamado useActionData
    }

    await modifyProduct(data, Number(params.productId)); //await para que no vaya a otra linea hasta que haya acabado la cosa

    return redirect('/'); //al final, que te lleve a otro lado. Esto también es de react-router-dom

}

export async function loader({ params }: LoaderFunctionArgs) { //los params vienen por defecto, siempre ha de llevar este tipo        
    const product = await getProductById(Number(params.productId));
    if (!product) { //quizás alguien mete directamente en url una id que no existe
        return redirect('/');
        //throw new Response('', {status: 404, statusText:'No encontrado'})  //Response es un objeto de Fetch API. El objeto de respuesta a una llamada http.
    }
    return product;
}


const availabilityOptions = [
    { name: 'Disponible', value: true },
    { name: 'No Disponible', value: false }
]







export default function EditProduct() {

    const error = useActionData(); //esto contiene lo que devuelva (return) la function "action"

    //Abajo: para método 1 de trasladar datos desde la vista anterior
    // const { state } = useLocation();
    //el método 2 es el uso de useLoaderData 

    const product = useLoaderData() as Product;

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Editar producto</h2>
                <Link
                    to="/"
                    className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500">
                    Volver a productos
                </Link>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form
                className="mt-10"
                method="PUT"
            >
                <ProductForm
                    product={product}
                    />


                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="availability"
                    >Disponibilidad:</label>
                    <select
                        id="availability"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        name="availability"
                        defaultValue={product?.availability.toString()}
                    >
                        {availabilityOptions.map(option => (
                            <option key={option.name} value={option.value.toString()}>{option.name}</option>
                        ))}
                    </select>
                </div>
                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Modificar producto"
                />
            </Form>
        </>
    )
}