import logging
import sys

# Create a logger instance
logger = logging.getLogger("nexus_ai")
logger.setLevel(logging.INFO)

# Create a handler to output logs to the terminal (stdout)
handler = logging.StreamHandler(sys.stdout)
handler.setLevel(logging.INFO)

# Create a formatter to define the log message format
formatter = logging.Formatter(
    '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
handler.setFormatter(formatter)

# Add the handler to the logger
logger.addHandler(handler)