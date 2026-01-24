import { v2 as cloudinary } from 'cloudinary';
import { auth } from '@clerk/nextjs/server';
import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { MutableRequestCookiesAdapter } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

const prisma = new PrismaClient();

// Configuration
cloudinary.config({ 
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});





interface cloudinaryUploadResult{
    public_id: String;
    bytes: number;
    duration?: number;
    [key:string]:any;
}


export async function POST(request: NextRequest){
    const {userId} = auth();

    
    try {

        if(!userId){
            return NextResponse.json({error: "Unauthorized"}, {status:401 })
        }
        if(!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_SECRET){
            NextResponse.json({error: "missing environment variable"}, {status:500 })
        }

        const formData = await request.formData();
        const file = formData.get('file') as File | null;
        const title = formData.get('title') as String ;
        const description = formData.get('description') as String ;
        const originalSize = formData.get("originalSize") as String;


        if(!file){
            return NextResponse.json({error: "File not found"}, {status: 400});
            const bytes = await file.arrayBuffer()
            const buffer = Buffer.from(bytes);

           const result = await new Promise<cloudinaryUploadResult>(
                (resolve, reject) =>{
                   const uploadStream =  cloudinary.uploader.upload_stream(
                        {folder:"video-uploads",
                        resource_type: "video",
                        transformation:[
                            {quality: "auto", fetch_format: "mp4"}
                        ]
                        },
                        (error, result) =>{
                            if(error) reject(error);
                            else resolve(result as cloudinaryUploadResult);
                        }
                    )
                    uploadStream.end(buffer);
                }
            )
                const video = await prisma.video.create({
                    data:{
                        title,
                        description,
                        publicId: result.public_id,
                        originalSize: originalSize,
                        compressedSize:String( result.bytes),
                        duration: result.duration || 0,

                    }
                })
                return NextResponse.json(video);
        }
    } catch (error) {
        console.log("Upload video failed")
         return NextResponse.json({error:"Video upload failed"}, {status: 500})
    }finally{
        await prisma.$disconnect();
    }

}