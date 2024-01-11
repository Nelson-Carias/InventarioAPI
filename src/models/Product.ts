import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId, Double} from "typeorm"
import { Supplier } from "./Supplier"
import { type } from "os"

@Entity()
export class Product{
    @PrimaryGeneratedColumn("increment")
    id:number

    @Column()
    name:string

    @Column()
    description: string
    @Column()
    stock: number

    @ManyToOne(()=> Supplier)
    supplier: Supplier
    
    @RelationId((product: Product)=> product.supplier)
    supplierId: number
   

    @Column({type:"double precision"})
    price: number

    @Column({default:true})
    state: boolean

   
}