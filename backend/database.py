import os

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Ajusta el nombre de la base de datos si es distinto en phpMyAdmin
DATABASE_URL = os.environ.get(
	"DATABASE_URL",
	"mysql+pymysql://root:@localhost:3306/mesa_magica",
)
engine = create_engine(DATABASE_URL, pool_pre_ping=True)

SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

Base = declarative_base()
