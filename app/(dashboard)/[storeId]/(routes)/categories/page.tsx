import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { CatergoryClient } from "./components/clients";
import { CategoryColumn } from "./components/columns";

const CategoriesPages = async ({
    params
  }: {
    params: { storeId: string }
  }) => {

    const categories = await prismadb.category.findMany({
        where : {
            storeId : params.storeId
        },
        include : {
            billboard : true
        },
        orderBy : {
            createdAt : 'desc'
        }
    });

    const formattedCategory: CategoryColumn[] = categories.map((item) => ({
        id: item.id,
        name: item.name,
        billboardLabel: item.billboard.label,
        createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    }))

    return ( 
        <div className="flex-1">
            <div className="flex-col space-y-4 p-8 pt-6">
                <CatergoryClient data={ formattedCategory}/>
            </div>
        </div>
     );
}
 
export default CategoriesPages;