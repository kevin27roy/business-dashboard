import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.pool import NullPool

BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.abspath(__file__)
    )
)

ENV_PATH = os.path.join(BASE_DIR, ".env")

load_dotenv(ENV_PATH)

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not configured")

engine = create_engine(
    DATABASE_URL,
    poolclass=NullPool,
    pool_pre_ping=True,
)