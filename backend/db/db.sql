CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating >= 1 and rating <=5)
);
INSERT INTO reviews ( restaurant_id, name, review, rating) values (1,'james', 'ITS OKAY', 3);
INSERT INTO restaurants ( name, location, price_range) values ('Pizza Hut', 'Chicago', 3);
INSERT INTO restaurants ( name, location, price_range) values ('Wendys', 'Denver', 3);
INSERT INTO restaurants ( name, location, price_range) values ('Burger King', 'Louisiana', 3);

ALTER TABLE products ADD COLUMN featured boolean;

INSERT INTO reviews ( restaurant_id, name, review, rating) values (1,'kim', 'ITS OKAY', 2);
INSERT INTO reviews ( restaurant_id, name, review, rating) values (1,'james', 'ITS somthing u gotta try', 2);
INSERT INTO reviews ( restaurant_id, name, review, rating) values (1,'tyler', 'ITS OKAY', 2);
INSERT INTO reviews ( restaurant_id, name, review, rating) values (1,'jesse', 'ITS OKAY', 2);

INSERT INTO reviews ( restaurant_id, name, review, rating) values (3,'sara', 'this place is awesome', 5);
INSERT INTO reviews ( restaurant_id, name, review, rating) values (3,'cassy', 'this place is awesomee pawsome', 4);
INSERT INTO reviews ( restaurant_id, name, review, rating) values (3,'cassy', 'this place is rocks', 4);

INSERT INTO reviews ( restaurant_id, name, review, rating) values (3,'jay', 'ITS iight iight', 3);
