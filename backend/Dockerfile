FROM python:3.8-slim

# Set the working directory in the container to /app
WORKDIR /app

# Copy the requirements file and install Python dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Set the environment variable to tell Flask how to run the application
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=8000

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application
CMD ["flask", "run"]
