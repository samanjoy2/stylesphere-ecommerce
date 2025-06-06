from flask import Blueprint, jsonify
from app.models.product import products

main_bp = Blueprint('main', __name__)

@main_bp.route('/api/products')
def get_products():
    # In a real app, you'd be serializing SQLAlchemy objects
    product_list = [
        {
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "price": product.price,
            "image": product.image
        }
        for product in products
    ]
    return jsonify(product_list)

@main_bp.route('/api/products/<int:product_id>')
def get_product(product_id):
    product = next((p for p in products if p.id == product_id), None)
    if product:
        return jsonify({
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "price": product.price,
            "image": product.image
        })
    return jsonify({"error": "Product not found"}), 404 