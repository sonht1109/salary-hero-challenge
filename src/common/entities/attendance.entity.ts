import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'attendance' })
export class AttendanceEntity extends BaseEntity {
  @Column({ name: 'checkin_at' })
  checkinAt: Date;

  @Column({ name: 'checkout_at' })
  checkoutAt: Date;
}
