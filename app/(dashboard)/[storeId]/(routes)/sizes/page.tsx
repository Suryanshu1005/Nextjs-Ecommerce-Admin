import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { SizeClient } from "./components/clients";
import { SizeColumn } from "./components/columns";

const SizesPages = async ({
    params
  }: {
    params: { storeId: string }
  }) => {

    const sizes = await prismadb.size.findMany({
        where : {
            storeId : params.storeId
        },
        orderBy : {
            createdAt : 'desc'
        }
    });

    const formattedSize: SizeColumn[] = sizes.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    }))

    return ( 
        <div className="flex-1">
            <div className="flex-col space-y-4 p-8 pt-6">
                <SizeClient data={ formattedSize}/>
            </div>
        </div>
     );
}
 
export default SizesPages;