import os
from dotenv import dotenv_values

root_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(os.path.dirname(root_dir))

config = dotenv_values(os.path.join(project_root, ".env"))


class Config:
    MONGO_URI = config.get("MONGO_URI")
