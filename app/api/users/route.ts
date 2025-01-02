import Users from '../../models/Users';
import { mongooseConnect } from '../../lib/mongoose';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await mongooseConnect();
    const order = await Users.find();
    return NextResponse.json(order);
  } catch (error) {
    console.error('Error fetching Order:', error);
    return NextResponse.json(
      { message: 'Failed to fetch Order' },
      { status: 500 }
    );
  }
}

export async function POST(request:any) {
  try {
    await mongooseConnect();
    const {
      name,
      description,
      currency,
      address,
      admins,
      ig,
      fb,
      yt,
      customLink,
    } = await request.json();
    const newOrder = new Users({
      name,
      description,
      currency,
      address,
      admins,
      ig,
      fb,
      yt,
      customLink,
    });
    await newOrder.save();

    return NextResponse.json({ message: 'Order created successfully' });
  } catch (error) {
    console.error('Error creating Order:', error);
    return NextResponse.json(
      { message: 'Failed to create Order' },
      { status: 500 }
    );
  }
}
export async function PUT(request:any) {
  try {
    await mongooseConnect();
    const { _id, ...updatedFields } = await request.json();

    const order = await Users.findById(_id);

    if (!order) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    // Update the Order if any fields have changed
    if (Object.keys(updatedFields).length > 0) {
      await Users.updateOne({ _id: _id }, updatedFields);
      return NextResponse.json({ message: 'Order edited successfully' });
    } else {
      return NextResponse.json({ message: 'No changes detected' });
    }
  } catch (error) {
    console.error('Error editing Order:', error);
    return NextResponse.json(
      { message: 'Failed to edit Order' },
      { status: 500 }
    );
  }
}
