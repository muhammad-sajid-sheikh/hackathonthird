// import { Avatar } from "@/components/ui/avatar";
// import { Label } from "@/components/ui/label";
// import { client } from "@/sanity/lib/client";
// import { urlFor } from "@/sanity/lib/image";
// import { SanityTypes } from "@/typing";
// import { AvatarFallback } from "@radix-ui/react-avatar";
// import { Calendar1Icon } from "lucide-react";
// import { PortableText } from "next-sanity";
// import Image from "next/image";

// // Fetch the post from Sanity by slug
// async function getPost(slug: string): Promise<SanityTypes.Post> {
//     const query = `
//         *[_type == "post" && slug.current == $slug] {
//             _createdAt,
//             _id,
//             title,
//             description,
//             content,
//             image,
//             author->
//         }[0]
//     `;
//     return await client.fetch(query, { slug });
// }

// // The main component rendering the post page
// export default async function PostPage({ params: { slug } }: { params: { slug: string } }) {
//     const post: SanityTypes.Post = await getPost(slug);

//     if (!post) {
//         return <div>Post not found</div>;  // Optional: Handle the case when the post is not found
//     }

//     return (
//         <div className="flex flex-col items-center w-full bg-background px-4 sm:px-8 md:px-12">
//             {/* Post Title */}
//             <div className="w-full max-w-[1500px] pb-24 pt-32 flex flex-col space-y-4">
//                 <Label className="text-5xl max-w-4xl tracking-tighter font-extrabold">
//                     {post.title}
//                 </Label>
//             </div>

//             {/* Author and Date Information */}
//             <div className="w-full max-w-[1500px] pb-6 flex items-center space-x-3">
//                 <div className="flex flex-row items-center space-x-2">
//                     <Avatar>
//                         <AvatarFallback>{post.author.name.substring(0, 1)}</AvatarFallback>
//                     </Avatar>
//                     <p className="font-bold">{post.author.name}</p>
//                 </div>
//                 <div className="flex flex-row items-center gap-x-2">
//                     <Calendar1Icon size={20} className="text-primary" />
//                     <p>{new Date(post._createAt).toDateString()}</p>
//                 </div>
//             </div>

//             {/* Post Image */}
//             <div className="w-full h-96 max-h-96 relative overflow-hidden mb-6">
//                 <Image
//                     src={urlFor(post.image).url()}
//                     alt={post.title}
//                     fill
//                     className="h-full w-full object-cover object-center rounded-lg"
//                 />
//             </div>

//             {/* Post Content */}
//             <article className="prose lg:prose-lg pt-6 max-w-[1500px]">
//                 <PortableText value={post.content} />
//             </article>
//         </div>
//     );
// }
