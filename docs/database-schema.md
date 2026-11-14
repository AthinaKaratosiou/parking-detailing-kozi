# Proposed Database Schema (future phase)

Core tables:
- profiles
- vehicles
- services
- parking_capacity_slots
- parking_bookings
- car_wash_services
- car_wash_bookings
- product_categories
- products
- product_media
- carts (or client-side until checkout)
- orders
- order_items
- payments
- reviews
- promotions
- business_settings
- admin_audit_log

Key rules:
- Parking reservations consume capacity over a time interval; they do not reserve a numbered bay.
- Car-wash appointments consume a service-specific time slot.
- Availability and pricing must be validated server-side.
- Payment status must be separate from booking status.
- Admin permissions must be enforced server-side with row-level security or equivalent controls.
