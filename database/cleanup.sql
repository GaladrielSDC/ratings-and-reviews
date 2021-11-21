\c atelier_reviews;

-- convert date from unix epoch to timestamp
alter table reviews
alter column date set data type timestamp with time zone using to_timestamp(date / 1000)::date;

create index idx_product_id on reviews(product_id);
-- drop index if exists idx_review_id ;
create index idx_review_id_characteristics on reviews_characteristics(review_id);
create index idx_review_id_photos on reviews_photos(review_id);