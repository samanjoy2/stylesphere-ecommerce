from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    with app.app_context():
        from .routes import main
        app.register_blueprint(main.main_bp)

    return app 