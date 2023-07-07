import prismadb from "@/lib/prismadb";
import { BillboardForm } from "./components/billboard-form";

const BillboardPage = async({
    params
}: {
    params: {billboardId : string}
}) => {

    const billboard = await prismadb.billboard.findUnique({
        where: {
            id: params.billboardId
        }
    })
    return ( 
        <div className="flex-1">
            <div className="flex-col space-y-4 p-8 pt-4">
                <BillboardForm 
                    initialData={billboard}
                />
            </div>
        </div>
     );
}
 
export default BillboardPage;