ALTER TABLE `orders` ADD `nombre_penya` text;--> statement-breakpoint
ALTER TABLE `orders` ADD `direccion` text DEFAULT 'sin_direccion' NOT NULL;--> statement-breakpoint
ALTER TABLE `orders` ADD `segundo_numero_telefono` text;--> statement-breakpoint
ALTER TABLE `orders` ADD `comentarios` text;--> statement-breakpoint
ALTER TABLE `orders` ADD `localizacion_evento` text;--> statement-breakpoint
ALTER TABLE `orders` ADD `fecha_inicio` text;--> statement-breakpoint
ALTER TABLE `orders` ADD `fecha_fin` text;