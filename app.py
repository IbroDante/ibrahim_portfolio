from flask import Flask, render_template
import os 

app = Flask(__name__)

@app.route("/")
def main():
    return render_template("index.html")

@app.route("/index.html")
def index():
    return render_template("index.html")

@app.route("/about.html")
def about():
    return render_template("about.html")

@app.route("/contact.html")
def contact():
    return render_template("contact.html")

@app.route("/services.html")
def services():
    return render_template("services.html")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)