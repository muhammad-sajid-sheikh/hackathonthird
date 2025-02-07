import { connectionSrt } from '@/lib/db';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

// Define the schema and model
const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  items: [
    {
      title: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  vat: { type: Number, required: true },
  totalPriceWithVat: { type: Number, required: true },
});

interface Item {
  title: string;
  quantity: number;
  price: number;
}

interface LocalBody {
  name: string;
  phone: number;
  email: string;
  address: string;
  items: Item[];
  totalPrice: number;
  vat: number;
  totalPriceWithVat: number;
}

// Prevent model re-registration in Next.js hot reloads
const Order = mongoose.models['orders'] || mongoose.model('orders', orderSchema);

export async function POST(request: NextRequest) {
  try {
    console.log("Checking database connection...");

    // Ensure database connection
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(connectionSrt);
      console.log("Database connected successfully.");
    } else {
      console.log("Using existing database connection.");
    }

    // Parse the request body
    const body = (await request.json()) as LocalBody;
    console.log("Received request body:", body);

    // Validate the request body
    const { name, phone, email, address, items, totalPrice, vat, totalPriceWithVat } = body;

    if (!name || !phone || !email || !address || !items || items.length === 0 || totalPrice <= 0 || vat < 0 || totalPriceWithVat <= 0) {
      return NextResponse.json({ message: 'All fields are required and must be valid, including at least one item.' }, { status: 400 });
    }

    // Save order to the database
    const newOrder = new Order({
      name,
      phone,
      email,
      address,
      items,
      totalPrice,
      vat,
      totalPriceWithVat,
    });

    await newOrder.save();
    console.log("Order saved successfully.");

    return NextResponse.json({ message: 'Order placed successfully', success: true }, { status: 201 });
  } catch (error) {
    console.error("Error details:", (error as Error).message);
    return NextResponse.json({ message: 'Internal Server Error', error: (error as Error).message }, { status: 500 });
  }
}

export async function GET() {
  try {
    console.log("GET request received.");

    // Ensure database connection
    if (mongoose.connection.readyState === 0) {
      console.log("Reconnecting to database...");
      await mongoose.connect(connectionSrt);
      console.log("Database connected successfully.");
    } else {
      console.log("Using existing database connection.");
    }

    // Fetch orders from database
    const orders = await Order.find();
    console.log("Fetched orders:", orders);

    return new NextResponse(JSON.stringify(orders), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error("Error in GET method:", (error as Error).message);
    return NextResponse.json({ message: 'Error fetching orders', error: (error as Error).message }, { status: 500 });
  }
}
