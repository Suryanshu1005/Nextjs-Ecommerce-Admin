"use client";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { OrderColumn, columns } from "./columns";

interface OrdersClientProps {
    data: OrderColumn[];
};

export const OrdersClient: React.FC<OrdersClientProps> = ({
    data
}) => {

    return (
        <>
            <Heading title={`Order ${data.length}`} description="Total orders" />
            <Separator />
            <DataTable searchKey="products" columns={columns} data={data} />
        </>
    );
};