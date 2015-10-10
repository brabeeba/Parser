from flask import render_template, request, url_for, jsonify
from app import app
from parseString import parseTag

@app.route('/')
@app.route('/index')
#main page! Oh hoo! Single page app! No more routing!
def index():
    return render_template('index.html', title= 'Home', mainPage = url_for('index'))

#api for ajax to parse type1 tag 
@app.route('/parsetag')
def parse():
	#get the tag
	tag = request.args.get('tag', 'error', type=str)
	#parse the tag
	return jsonify(result=parseTag(tag))