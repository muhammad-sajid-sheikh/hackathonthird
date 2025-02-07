import { SanityImageAssetDocument } from "next-sanity";

export type Product = {
    _id:number,
    imageUrl:any,
    title:string,
    category:string,
    description:string,
    price:number ,
    priceline:string,
    dicountPercentage:number,
    
                    
    }

    export namespace SanityTypes {
        export interface Post {
            _id: string;
            _createAt: Date;
            _updateAt: Date;
            title:string;
            description: string;
            slug: {current:string};
            image: SanityImageAssetDocument;
            content:any;
            author: Author<SanityImageAssetDocument | undefined>;
        }

        export interface Author<T> {
            _id: string;
            name: string;
            image: T
        }
    }
