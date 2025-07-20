import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function GET(req: Request, {params}: {params: Promise<{storeId: string}>}) {
    try{
        const {storeId} = await params

        if(!storeId) {
            return new NextResponse("Store id is required", {status: 400})
        }

        const store = await prismadb.store.findUnique({
            where: {
                id: storeId
            }
        })

        return NextResponse.json(store)
    }
    catch(error){
        console.log("[STORE_GET]", error)
        return new NextResponse("Internal error", {status: 500})
    }
}
