// function for creating API.

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
       const { userId } = auth();
       const body =  await req.json();

       const { name } = body;

       console.log('name: ',name)

       //we only require two field for the auth part of the API i.e. name and userId. 
       //userId is provided by clerk itself 
       //and we have define name inside schema.prisma

       if(!name) return new NextResponse("Name is required", { status: 400 });     
       
       if (!userId) return new NextResponse("Unauthorized", { status: 401 });

       //here we have created our store API

       const store = await prismadb.store.create({
        data:  {
            name, 
            userId
        }
       });

       return NextResponse.json(store);
    } catch (error) {
        console.log('[STORES_POST]',error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}