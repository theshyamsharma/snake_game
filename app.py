from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory(app.root_path + '/static/', filename)

if __name__ == '__main__':
    app.run(debug=True, port=5000)