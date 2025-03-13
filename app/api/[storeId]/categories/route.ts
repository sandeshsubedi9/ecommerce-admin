import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(req: Request, {params}: {params: Promise<{storeId: string}>}) {
    try{
        const { userId } =  await auth()
        const body = await req.json()

        const {storeId} = await params

        const {name, billboardId} = body

        if(!userId) {
            return new NextResponse("Unauthenticated", {status: 401})
        }

        if(!name) {
            return new NextResponse("Name is required", {status: 400})
        }

        if(!billboardId) {
            return new NextResponse("Billboard Id is required", {status: 400})
        }

        if(!storeId) {
            return new NextResponse("Store id is required", {status: 400})
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: storeId,
                userId
            }
        })

        if(!storeByUserId) {
            return new NextResponse("Unauthorized", {status: 403})
        }

        const category = await prismadb.category.create({
            data: {
                name,
                billboardId,
                storeId,
            }
        })

        return NextResponse.json(category)
    }
    catch(error){
        console.log("[CATEGORIES_POST]", error)
        return new NextResponse("Internal error", {status: 500})
    }
}

export async function GET(req: Request, {params}: {params: Promise<{storeId: string}>}) {
    try{
        const {storeId} = await params

        if(!storeId) {
            return new NextResponse("Store id is required", {status: 400})
        }

        const category = await prismadb.category.findMany({
            where: {
                storeId
            }
        })

        return NextResponse.json(category)
    }
    catch(error){
        console.log("[CATEGORIES_GET]", error)
        return new NextResponse("Internal error", {status: 500})
    }
}