
import { 
    Product as PrismaProduct,
    Tag as PrismaTag,
    UnderTag as PrismaUnderTag,
} from "@/generated/prisma/client"

export enum CardType {
  Tag,
  UnderTag,
  Product
}
export interface CardData {
  id: number;
  cropedBg: string;
  fullBg: string;
  label: string;
  description: string;
  items: {
    id: number;
    cropedBg: string;
    fullBg: string;
    label: string;
    description: string;
  }[]
}

export type Product = PrismaProduct

export type UnderTag = ({products: PrismaProduct[]} & PrismaUnderTag)

export type Tag = ({underTags: UnderTag[]} & PrismaTag)
