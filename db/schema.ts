import {
  sqliteTable,
  text,
  integer,
  index,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
export const doctors = sqliteTable(
  'doctors',
  {
    userId: text('user_id').primaryKey(),
    email: text('email').notNull(),
    fullName: text('full_name').notNull(),
    stamp: text('stamp').notNull(),
    institution: text('institution').notNull(),
    status: text('status').notNull().default('pending'),
    validUntil: integer('valid_until'),
    reviewNote: text('review_note'),
    createdAt: integer('created_at').notNull(),
  },
  (t) => [
    index('doctors_status').on(t.status),
    uniqueIndex('doctors_approved_stamp')
      .on(t.stamp)
      .where(sql`${t.status} = 'approved'`),
  ],
);
export const sessions = sqliteTable(
  'sessions',
  {
    tokenHash: text('token_hash').primaryKey(),
    userId: text('user_id').notNull(),
    lastActivity: integer('last_activity').notNull(),
    createdAt: integer('created_at').notNull(),
  },
  (t) => [index('sessions_user').on(t.userId)],
);
export const reviews = sqliteTable('reviews', {
  id: text('id').primaryKey(),
  doctorId: text('doctor_id').notNull(),
  reviewerId: text('reviewer_id').notNull(),
  decision: text('decision').notNull(),
  note: text('note').notNull(),
  validUntil: integer('valid_until'),
  createdAt: integer('created_at').notNull(),
});
export const fees = sqliteTable('fees', {
  sku: text('sku').primaryKey(),
  amount: integer('amount').notNull(),
  updatedAt: integer('updated_at').notNull(),
  updatedBy: text('updated_by').notNull(),
});
export const requests = sqliteTable(
  'requests',
  {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull(),
    sku: text('sku').notNull(),
    quantity: integer('quantity').notNull(),
    fee: integer('fee').notNull(),
    createdAt: integer('created_at').notNull(),
  },
  (t) => [index('requests_user').on(t.userId)],
);
