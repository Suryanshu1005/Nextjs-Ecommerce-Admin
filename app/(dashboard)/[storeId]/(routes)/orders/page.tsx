import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { OrdersClient } from "./components/clients";
import { OrderColumn } from "./components/columns";
import { formatter } from "@/lib/utils";

const OrderPages = async ({
    params
}: {
    params: { storeId: string }
}) => {

    const orders = await prismadb.order.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            orderItems : {
                include : {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedOrders: OrderColumn[] = orders.map((item) => ({
        id: item.id,
        address: item.address,
        phone: item.phone,
        isPaid: item.isPaid,
        products: item.orderItems.map((item) => item.product.name).join(', '),
        totalPrice: formatter.format(item.orderItems.reduce((total, item) => {
            return total + Number(item.product.price)
        }, 0)),
        createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    }))

    return (
        <div className="flex-1">
            <div className="flex-col space-y-4 p-8 pt-6">
                <OrdersClient data={formattedOrders} />
            </div>
        </div>
    );
}

export default OrderPages;