FROM python:3
WORKDIR /app
COPY requirements.txt requirements.txt
RUN pip3 install --trusted host files.pythonhosted.org --trusted-host pypi.org --trusted-host pypi.python.org --upgrade pip3
RUN pip3 install --trusted host files.pythonhosted.org --trusted-host pypi.org --trusted-host pypi.python.org -r requirements.txt
COPY ../.. /app
EXPOSE 8000