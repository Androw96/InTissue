CREATE TABLE `doctors` (
	`user_id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`full_name` text NOT NULL,
	`stamp` text NOT NULL,
	`institution` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`valid_until` integer,
	`review_note` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `doctors_status` ON `doctors` (`status`);--> statement-breakpoint
CREATE UNIQUE INDEX `doctors_approved_stamp` ON `doctors` (`stamp`) WHERE "doctors"."status" = 'approved';--> statement-breakpoint
CREATE TABLE `fees` (
	`sku` text PRIMARY KEY NOT NULL,
	`amount` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `requests` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`sku` text NOT NULL,
	`quantity` integer NOT NULL,
	`fee` integer NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `requests_user` ON `requests` (`user_id`);--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` text PRIMARY KEY NOT NULL,
	`doctor_id` text NOT NULL,
	`reviewer_id` text NOT NULL,
	`decision` text NOT NULL,
	`note` text NOT NULL,
	`valid_until` integer,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`token_hash` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`last_activity` integer NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `sessions_user` ON `sessions` (`user_id`);