import { BillboardClient } from "./components/client";

const Billboards = () => {
    return ( 
        <div className="flex-1">
            <div className="flex-col space-y-4 p-8 pt-6">
                <BillboardClient />
            </div>
        </div>
     );
}
 
export default Billboards;