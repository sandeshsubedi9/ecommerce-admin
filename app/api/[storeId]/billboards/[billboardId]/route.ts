import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET(req: Request, {params}: {params: Promise<{billboardId: string}>}) {
    try{
        
        const { billboardId} = await params

        if(!billboardId) {
            return new NextResponse("Billboard id is required", {status: 400})
        }

        const billboard = await prismadb.billboard.findUnique({
            where: {
                id: billboardId,
            }
        })

        return NextResponse.json(billboard)
    }
    catch(error) {
        console.log("[BILLBOARD_GET]", error)
        return new NextResponse("Internal error", {status: 500})
    }
}

export async function PATCH(req: Request, {params}: {params: Promise<{storeId: string, billboardId: string}>}) {
    try{
        const {userId} = await auth()
        const {billboardId, storeId} = await params
        const body = await req.json()

        const {label, imageUrl} = body

        if(!userId) {
            return new NextResponse("Unauthenticated", {status: 401})
        }

        if(!label) {
            return new NextResponse("Name is required", {status: 400})
        }

        if(!imageUrl) {
            return new NextResponse("Image URL is required", {status: 400})
        }

        if(!billboardId) {
            return new NextResponse("Billboard id is required", {status: 400})
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

        const billboard = await prismadb.billboard.updateMany({
            where: {
                id: billboardId,
            },
            data: {
                label,
                imageUrl
            }
        })

        return NextResponse.json(billboard)
    }
    catch(error) {
        console.log("[BILLBOARDS_PATCH]", error)
        return new NextResponse("Internal error", {status: 500})
    }
}

export async function DELETE(req: Request, {params}: {params: Promise<{billboardId: string, storeId: string}>}) {
    try{
        const {userId} = await auth()
        const {storeId, billboardId} = await params

        if(!userId) {
            return new NextResponse("Unauthenticated", {status: 401})
        }

        if(!storeId) {
            return new NextResponse("Store id is required", {status: 400})
        }

        if(!billboardId) {
            return new NextResponse("Billboard id is required", {status: 400})
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

        const billboard = await prismadb.billboard.deleteMany({
            where: {
                id: billboardId,
            }
        })

        return NextResponse.json(billboard)
    }
    catch(error) {
        console.log("[BILLBOARD_DELETE]", error)
        return new NextResponse("Internal error", {status: 500})
    }
}