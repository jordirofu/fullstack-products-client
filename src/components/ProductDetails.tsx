import type { Product } from "../types"
import { FormatCurrency } from "../helpers"
import { redirect, useNavigate, Form, type ActionFunctionArgs, useFetcher } from "react-router-dom"
import { deleteProduct } from "../services/ProductService"

type ProductDetailsProps = {
    product: Product
}

export async function action({ params }: ActionFunctionArgs) {
    await deleteProduct(Number(params.productId))
    //puedes sacar de "params" el id...porque en ese momento en la ruta pone
    // `productos/${product.id}/eliminar` (debido al action) .. aunque no se ve porque
    //enseguida hace el redirect, 
    //el nombre del parámetro (paramId), es el definido en router.tsx.

    return redirect('/');
}



export default function ProductDetails({ product }: ProductDetailsProps) {

    const navigate = useNavigate();
    //useNavigate puede ser utilizado no solo en la presentación, como Link, sino también aquí, en esta parte de código.

    const fetcher = useFetcher();



    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {FormatCurrency(product.price)}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {/* <form method="POST"> */}
                <fetcher.Form method="POST" >
                    <button
                        type="submit" //siempre submit para poder invocar una action de React Router con un botón en un formulario.
                        name='id'
                        //antes poníamos en value la disponibilidad... pero lo cierto es que no hace falta, el texto ya se pone
                        //abajo, entre apertura y cierre de botón
                        // value={product.availability.toString()}
                        value={product.id}
                        className={`${product.availability ?  "text-black" : 'text-red-600'} 
                        rounded-lg p-2 text-xs uppercase font-bold w-full border border-black hover:cursor-pointer`}    
                        >{product.availability ? "Disponible" : "No disponible"}
                        </button>
                        {/* <input name="id" type="hidden" value={product.id} /> */}
                </fetcher.Form>
                {/* </form> */}
                {/* En una primera versión, dentro de td solo estaba esto (no se podía modificar solo "disponibilidad") */}
                {/* {product.availability ? "Disponible" : "No disponible"} */}
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    {/* <Link
                    to={`/productos/:${product.id}/editar`}
                    state={{product}}
                    className="bg-indigo-600 text-white text-center rounded-lg w-full p-2 uppercase font-boldtext-xs"
                    >Editar</Link> */}
                    <button
                        onClick={() => navigate(`/productos/${product.id}/editar`)} //aquí no ponemos los ":". En la url real no.
                        //Abajo: método 1 de trasladar info del productto a la siguiente vista
                        // onClick={() => navigate(`/productos/${product.id}/editar`, {
                        //     state: {
                        //         product //product:product
                        //     }
                        //                             })}
                        className="bg-indigo-600 text-white text-center rounded-lg w-full p-2 uppercase font-bold text-xs"

                    >Editar</button>
                    <Form
                        className="w-full"
                        method="POST"
                        action={`productos/${product.id}/eliminar`} //VIT: Aquí sí detallas action porque, si no, estás en el PATH '/products'. Y en router, '/products' no tiene definida ninguna action
                        //has de poner esto en action para que cambie la ruta en el navegador... y router haga la acción según esa ruta
                        
                        //Si quieres hacer una pregunta de confirmación de borrado.
                        //Un onSubmit.. que se ejecuta ANTES que la action
                        onSubmit={(e) => {
                            if (!confirm('¿Seguro que deseas eliminar el producto?')){
                                e.preventDefault(); //Si no confirmas, si no aceptas... se corta el proceso por defecto que llevaría a la action. No se hace nada.
                            }

                        }}
                    
                    >
                        <input
                            type="submit"
                            value="Eliminar"
                            className="bg-red-600 text-white text-center rounded-lg w-full p-2 uppercase font-bold text-xs"
                        ></input>
                    </Form>
                </div>
            </td>
        </tr>
    )
}
