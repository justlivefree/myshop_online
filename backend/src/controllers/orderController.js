import db from '../db.js';

export const createOrder = async (req, res) => {
  const { customerName, customerPhone, locationUser, items } = req.body;

  if (!customerName || !customerPhone || !locationUser || !items || !items.length) {
    return res.status(400).json({
      success: false,
      error: { message: 'Name, phone, location, and at least one item are required' },
    });
  }

  const trx = await db.transaction();

  try {
    const stockErrors = [];

    for (const item of items) {
      const product = await trx('products').where('id', item.id).first();
      if (!product) {
        stockErrors.push(`Product with id ${item.id} not found`);
        continue;
      }
      if (product.stock < item.quantity) {
        stockErrors.push(
          `"${product.name}" omborda yetarli emas. Mavjud: ${product.stock}, siz so'ragan: ${item.quantity}`
        );
      }
    }

    if (stockErrors.length > 0) {
      await trx.rollback();
      return res.status(400).json({
        success: false,
        error: { message: stockErrors.join('; ') },
      });
    }

    for (const item of items) {
      await trx('products')
        .where('id', item.id)
        .decrement('stock', item.quantity);
    }

    const subtotal = items.reduce((sum, item) => {
      const price = item.discountedPrice || item.price;
      return sum + price * item.quantity;
    }, 0);

    const discount = items.reduce((sum, item) => {
      if (item.discount && item.discount > 0) {
        return sum + (item.price - item.discountedPrice) * item.quantity;
      }
      return sum;
    }, 0);

    const [order] = await trx('orders')
      .insert({
        customer_name: customerName,
        customer_phone: customerPhone,
        location_user: locationUser,
        subtotal: Math.round(subtotal * 100) / 100,
        discount: Math.round(discount * 100) / 100,
        total: subtotal,
        status: 'topshirilmagan',
      })
      .returning('*');

    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.id,
      name: item.name,
      price: item.price,
      discount: item.discount || 0,
      discounted_price: item.discountedPrice || item.price,
      quantity: item.quantity,
      image: item.image,
    }));

    await trx('order_items').insert(orderItems);

    await trx.commit();

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    await trx.rollback();
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Error creating order' },
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await db('orders').orderBy('created_at', 'desc');

    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const items = await db('order_items').where('order_id', order.id);
        return { ...order, items };
      })
    );

    res.json({ success: true, data: ordersWithItems });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Error fetching orders' },
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await db('orders').where('id', id).first();

    if (!order) {
      return res.status(404).json({
        success: false,
        error: { message: 'Order not found' },
      });
    }

    const [updated] = await db('orders')
      .where('id', id)
      .update({ status: 'topshirildi' })
      .returning('*');

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Error updating order status' },
    });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const [productCount] = await db('products').count('id as total');
    const [orderCount] = await db('orders').count('id as total');
    const [revenue] = await db('orders').sum('total as total');
    const [pendingOrders] = await db('orders').where('status', 'topshirilmagan').count('id as total');
    const [outOfStock] = await db('products').where('stock', 0).count('id as total');

    res.json({
      success: true,
      data: {
        totalProducts: parseInt(productCount.total),
        totalOrders: parseInt(orderCount.total),
        totalRevenue: parseFloat(revenue.total) || 0,
        pendingOrders: parseInt(pendingOrders.total),
        outOfStock: parseInt(outOfStock.total),
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Error fetching dashboard stats' },
    });
  }
};
