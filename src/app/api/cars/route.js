// src/app/api/cars/route.js
import { NextResponse } from 'next/server';
import carsData from '../../../data/cars';

export async function GET(request) {
  try {
    // Add a small delay to simulate network latency
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json(carsData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cars' }, { status: 500 });
  }
}