// src/app/api/cars/[id]/route.js
import { NextResponse } from 'next/server';
import carsData from '../../../../data/cars';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    // Add a small delay to simulate network latency
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const car = carsData.find(car => car.id === id);
    
    if (!car) {
      return NextResponse.json({ error: 'Car not found' }, { status: 404 });
    }
    
    return NextResponse.json(car);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch car details' }, { status: 500 });
  }
}