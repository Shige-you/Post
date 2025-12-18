import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm'

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    hash: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    // DB側の DEFAULT CURRENT_TIMESTAMP と同期させるため type を明示
    @CreateDateColumn({ type: 'timestamptz' })
    readonly created_at?: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    readonly updated_at?: Date;
}