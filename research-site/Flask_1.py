# Import flask module
from flask import Flask, render_template
# Flask constructor takes name of current module
# (__name__) as argument
app = Flask (__name__)

# route() function of Flask class is a decorator,
# that tells app which URL should call the associated
# function.

@app.route("/")
def index():                         # Home Page
    return render_template("index.html")   
@app.route("/authors")

def authors():                        # About Page
    return render_template("authors.html")  

@app.route("/procedure")
def procedure():                        # Procedure Page
    return render_template("procedure.html")  
@app.route("/result")
def result():                        # Result Page
    return render_template("result.html")  


# main driver function
if __name__ == "__main__":
    # Run app through port 5000 on local dev. server
    app.run(debug = True)
