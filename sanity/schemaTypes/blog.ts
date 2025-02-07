import { defineField } from "sanity";

export default {
    name: "post",
    title: "Post",
    type: "document",
    fields:[
        defineField({
            name: "title",
            title: "Title",
            description: "This is your blog post title",
            type: "string",
        }),
        defineField({
            name: "description",
            title: "Description",
            description: "Make this description brief so the visitor know what to export in the post",
            type: "string",
            validation: (rule) => rule.min(50).max(250).required()
        }),
        defineField({
            type: "reference",
            to: [{type: "author"}],
            name:"author",
            title: "Author",
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {source: "title"}
        }),
        defineField({
            name: "image",
            title: "Image",
            type: "image",
            options: {hotspot: true}
        }),
        defineField({
            name: "content",
            title: "Content",
            type: "array",
            of:[{type: "block"}]
        })
    ]
}