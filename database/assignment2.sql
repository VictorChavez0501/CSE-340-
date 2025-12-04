-- Assignment 2 - Task One
-- All six required queries

----------------------------------------------------------
-- 1. Insert Tony Stark into account table
----------------------------------------------------------
INSERT INTO account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

----------------------------------------------------------
-- 2. Update Tony Stark account_type to Admin
----------------------------------------------------------
UPDATE account
SET account_type = 'Admin'
WHERE account_email = 'tony@starkent.com';

----------------------------------------------------------
-- 3. Delete Tony Stark record
----------------------------------------------------------
DELETE FROM account
WHERE account_email = 'tony@starkent.com';

-----------------------------------------------------------------------
-- 4. Modify GM Hummer description using REPLACE (single update query)
-----------------------------------------------------------------------
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

------------------------------------------------------------------------------------
-- 5. INNER JOIN: make + model + classification for vehicles in Sport category
------------------------------------------------------------------------------------
SELECT i.inv_make, i.inv_model, c.classification_name
FROM inventory AS i
INNER JOIN classification AS c
  ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';

------------------------------------------------------------------------------------
-- 6. Update all inventory image paths to include /vehicles
------------------------------------------------------------------------------------
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');
