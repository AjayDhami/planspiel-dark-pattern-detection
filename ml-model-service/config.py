import os
from dotenv import dotenv_values

root_dir = os.path.dirname(os.path.abspath(__file__))

config = dotenv_values(os.path.join(root_dir, ".env"))


class Config:
    MONGO_URI = config.get("MONGO_URI")
