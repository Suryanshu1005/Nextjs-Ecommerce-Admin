import prismadb from "@/lib/prismadb";
import { SizeForm } from "./components/size-form";

const SizePage = async ({
    params
}: {
    params: { sizeId: string }
}) => {

    const size = await prismadb.size.findUnique({
        where: {
            id: params.sizeId
        }
    })
    return (
        <div className="flex-1">
            <div className="flex-col space-y-4 p-8 pt-4">
                <SizeForm
                    initialData={size}
                />
            </div>
        </div>
    );
}

export default SizePage;