import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { ProductsClient } from "./components/clients";
import { ProductColumn } from "./components/columns";
import { formatter } from "@/lib/utils";

const SizesPages = async ({
    params
}: {
    params: { storeId: string }
}) => {

    const products = await prismadb.product.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            category: true,
            size: true,
            color: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedProduct: ProductColumn[] = products.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category.name,
        color: item.color.value,
        size: item.size.value,
        isArchived: item.isArchived,
        isFeatured: item.isFeatured,
        price: formatter.format(item.price.toNumber()),
        createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    }))

    return (
        <div className="flex-1">
            <div className="flex-col space-y-4 p-8 pt-6">
                <ProductsClient data={formattedProduct} />
            </div>
        </div>
    );
}

export default SizesPages;