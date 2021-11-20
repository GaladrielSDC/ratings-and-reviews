\c atelier_reviews;

-- insert into reviews (product_id) values (1);

with query_product as (
        select *,
        date_rank + helpful_rank as relevance
        from (
          select *,
          dense_rank() over (order by date) as date_rank,
          dense_rank() over (order by helpfulness) as helpful_rank
          from reviews
          where product_id = 40365
        ) a
      )
select * from query_product;


-- GET metareview
-- with review_product as (
--   select * from reviews where product_id = 4
-- ), rating_count as (
--   select product_id, rating, count(*) as rating_count
--   from review_product group by product_id, rating
-- ), rating_agg as (
--   select product_id, json_object_agg(rating, rating_count) as ratings from rating_count group by 1
-- ), recommend_count as (
--   select product_id, recommend, count(*) as recommend_count
--   from review_product group by product_id, recommend
-- ), recommend_agg as (
--   select product_id, json_object_agg(recommend, recommend_count) as recommended from recommend_count group by 1
-- ), rating_and_recommend as (
--   select a.*, b.recommended
--   from rating_agg a left join recommend_agg b
--   on a.product_id = b.product_id
-- ), char_product as (
--   select * from characteristics where product_id = 4
-- ), char_review as (
--   select *, 4 as product_id from reviews_characteristics
--   where review_id in (select id from review_product)
-- ), avg_char_rating as (
--   select a.*, b.name
--   from (
--     select product_id, characteristic_id, avg(value) as value
--     from char_review group by characteristic_id, product_id
--   ) a left join char_product b
--   on a.characteristic_id = b.id
-- ), agg_char as (
--   select product_id, json_object_agg(name, char_rating) as characteristics from (
--     select product_id, name, json_build_object('id', characteristic_id, 'value', value) as char_rating
--       from avg_char_rating
--   ) a group by product_id
-- )
-- select a.*, b.characteristics
-- from rating_and_recommend a left join agg_char b
-- on a.product_id = b.product_id;