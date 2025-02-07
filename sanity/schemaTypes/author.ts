import { defineField } from "sanity"


export default {
    name : "author",
    title : "Author",
    type :"document",
    
    fields : [
        defineField({
        name: "name",
        type : "string",
        title : "Name",
        }),
        defineField({
        name: "slug",
        type : "slug",
        options:{source:"name"}
        }),
        defineField({
        name: "Image",
        title : "Profile Image",
        type : "image",
        options:{hotspot:true}
        }),

    ]
}