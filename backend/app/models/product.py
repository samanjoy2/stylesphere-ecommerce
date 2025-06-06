class Product:
    def __init__(self, id, name, description, price, image):
        self.id = id
        self.name = name
        self.description = description
        self.price = price
        self.image = image

products = [
    Product(1, 'Organic Cotton T-Shirt', 'A comfortable and stylish t-shirt made from 100% organic cotton.', 117.50, '/images/1-shirt.png'),
    Product(2, 'Linen Trousers', 'Lightweight and breathable trousers perfect for any season, made from a sustainable linen blend.', 352.50, '/images/2-pant.png'),
    Product(3, 'Vegan Leather Sneakers', 'Cruelty-free sneakers crafted from high-quality vegan leather, combining style and ethics.', 564.00, '/images/3-shoe.png'),
    Product(4, 'Recycled-Material Tote Bag', 'A versatile and durable tote bag made from recycled materials, perfect for everyday use.', 211.50, '/images/4-bag.png')
] 