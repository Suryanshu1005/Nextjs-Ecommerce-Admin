"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

export const BillboardClient = () => {
    const routers = useRouter()
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title="BillBoard (0)"
                    description="Your Store"
                />
                <Button onClick={() => routers.push(`/${params.storeId}/billboards/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
        </>
    )
}