
import { client } from "@/sanity/lib/client"
import { SanityTypes } from "@/typing"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import { Calendar1Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

async function getPosts(){
    const query = `
    *[_type == "post"] | order(_createAt desc)
    `
    return await client.fetch(query)
}

export default async function Blog(){
    const posts:SanityTypes.Post[] =await getPosts()
    console.log(posts)
    return(
        <div className="flex flex-col items-center w-full bg-background">
            <div className="h-full w-full flex flex-1 max-w-[1500] md:px-14 pt-24 px-4 flex-col space-y-4">
                <div className="grid md:grid-cols-3 gap-8 grid-cols-1">
                    {
                        posts.map((post:SanityTypes.Post, key: number)=>{
                            return(
                                <Link key={key} href={`/post/${post.slug.current}`} className="space-y-5 group cursor-pointer">
                                <Card className="flex flex-col justify-between h-full">
                                    <div className="space-y-5">
                                        {/* image container */}
                                        <div className="h-96 w-full overflow-hidden rounded-lg relative">
                                            <div className="h-full w-full bg-black opacity-0 absolute z-20 group-hover:opacity-25 transition-all duration-200 ease-out"/>
                                        <Image
                                        src={urlFor(post.image).url()}
                                        fill
                                        alt={post.title}
                                        className="h-full object-cover aspect-auto w-full"
                                        />
                                        </div>
                                        <div className="space-y-3 px-4 py-2">
                                            <div className="flex flex-row items-center space-x-2">
                                                <Calendar1Icon size={20} className="text-primary"/>
                                                <p>{new Date(post._createAt).toDateString()}</p>
                                            </div>
                                            <h1 className="text-3xl font-extrabold">{post.title}</h1>
                                            <p>{post.description}</p>
                                        </div>
                                        <div className="p-4">
                                            <Button className="w-full" variant={"outline"}>
                                                Read More
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                                  </Link>  
                                
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
