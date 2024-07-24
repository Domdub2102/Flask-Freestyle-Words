import os

from flask import Flask, flash, redirect, render_template, request, session


# Configure application
app = Flask(__name__)

@app.route("/")
def index():
     return render_template("index.html")

@app.route("/bpmcalculator")
def bpmcalculator():
     return render_template("bpmcalculator.html")

@app.route("/test")
def test():
     return render_template("test.html")
