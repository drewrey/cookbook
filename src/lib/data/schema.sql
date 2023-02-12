CREATE TABLE recipes(
    id INT UNSIGNED PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    ingredients TEXT,
    directions TEXT,
    link TEXT,
    source VARCHAR(255),
    ner text
);