
# --- !Ups
CREATE SEQUENCE public."TODO_id_seq"
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;

CREATE TABLE "TODO"
(
  id integer NOT NULL DEFAULT nextval('"TODO_id_seq"'::regclass),
  description character varying NOT NULL,
  done boolean NOT NULL,
  CONSTRAINT "TODO_pkey" PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);

# --- !Downs
DROP TABLE "TODO";
DROP SEQUENCE "TODO_id_seq";