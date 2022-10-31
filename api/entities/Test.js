const { Entity, PrimaryGeneratedColumn } = require("typeorm");

@Entity()
export class Test{
    @PrimaryGeneratedColumn()
    id: number;

    
}