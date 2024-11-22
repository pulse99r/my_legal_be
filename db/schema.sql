DROP TABLE IF EXISTS deposition_law;
CREATE TABLE deposition_law (
  id SERIAL PRIMARY KEY,
  article_num VARCHAR(10),
  article_name TEXT,
  article_text TEXT,
  date_of_Law TIMESTAMP,
  create_dt TIMESTAMP
);

DROP TABLE IF EXISTS depo_cross_ref;
CREATE TABLE depo_cross_ref (
  id SERIAL PRIMARY KEY,
  depo_article_num VARCHAR(10),
  xref_article_num VARCHAR(10),
  create_dt TIMESTAMP
);
DROP TABLE IF EXISTS my_notes;
CREATE TABLE my_notes (
  id SERIAL PRIMARY KEY,
  log_date TIMESTAMP,
  log_entry TEXT,
  log_parent INT,
  create_dt TIMESTAMP
);
