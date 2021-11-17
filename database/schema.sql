drop database if exists atelier_reviews;
create database atelier_reviews;
-- use atelier_reviews;
\c atelier_reviews;

-- create table schemas
drop table if exists reviews;
create table reviews (
  id serial primary key,
  product_id int not null,
  rating smallint,
  date bigint,
  summary varchar(500),
  body varchar (1200),
  recommend varchar(10),
  reported boolean,
  reviewer_name varchar(50),
  reviewer_email varchar(50),
  response varchar(200),
  helpfullness int
);

drop table if exists reviews_photos;
create table reviews_photos (
  id serial primary key,
  review_id int not null,
  url varchar(500)
);

drop table if exists reviews_characteristics;
create table reviews_characteristics (
  id serial primary key,
  characteristic_id int not null,
  review_id int not null,
  value smallint
);

drop table if exists characteristics;
create table characteristics (
  id serial primary key,
  product_id int not null,
  name varchar(10)
);

drop table if exists products;
create table products (
  id serial primary key,
  name varchar(50),
  slogan varchar(500),
  description varchar(500),
  category varchar(50),
  default_price float
);

-- -- add foreign keys
alter table reviews
  add foreign key (product_id) references products(id)
  on update cascade on delete cascade;

alter table reviews_photos
  add foreign key (review_id) references reviews(id)
  on update cascade on delete cascade;

alter table reviews_characteristics
  add foreign key (review_id) references reviews(id)
  on update cascade on delete restrict,
  add foreign key (characteristic_id) references characteristics(id)
  on update cascade on delete cascade;

alter table characteristics
  add foreign key (product_id) references products(id)
  on update cascade on delete cascade;

-- -- load data into tables
copy products from '/Users/yina/Documents/HR/SDC/data/product.csv' delimiter ',' csv header;
copy reviews from '/Users/yina/Documents/HR/SDC/data/reviews.csv' delimiter ',' csv header;

-- -- load data local infile '../data/product.csv'
-- -- into table products
-- -- fields terminated by ','
-- -- enclosed by '"'
-- -- lines terminated by '\n'
-- -- ignore 1 rows;

copy characteristics from '/Users/yina/Documents/HR/SDC/data/characteristics.csv' delimiter ',' csv header;
-- load data local infile '../data/characteristics.csv'
-- into table characteristics
-- fields terminated by ','
-- enclosed by '"'
-- lines terminated by '\n'
-- ignore 1 rows;

copy reviews_characteristics from '/Users/yina/Documents/HR/SDC/data/characteristic_reviews.csv' delimiter ',' csv header;
-- load data local infile '../data/characteristic_reviews.csv'
-- into table reviews_characteristics
-- fields terminated by ','
-- enclosed by '"'
-- lines terminated by '\n'
-- ignore 1 rows;

copy reviews_photos from '/Users/yina/Documents/HR/SDC/data/reviews_photos.csv' delimiter ',' csv header;
-- load data local infile '../data/reviews_photos.csv'
-- into table reviews_photos
-- fields terminated by ','
-- enclosed by '"'
-- lines terminated by '\n'
-- ignore 1 rows;