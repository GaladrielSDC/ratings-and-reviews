\c atelier_reviews;

-- convert date from unix epoch to timestamp
alter table reviews
alter column date set data type timestamp with time zone using to_timestamp(date / 1000)::date;