import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'events.json');

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();
    
    if (!fs.existsSync(dataFilePath)) {
      return NextResponse.json({ error: 'Data not found' }, { status: 404 });
    }
    
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    let events = JSON.parse(fileContents);
    
    const index = events.findIndex(e => e.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    
    events[index] = { ...events[index], ...data, id };
    fs.writeFileSync(dataFilePath, JSON.stringify(events, null, 2));
    
    return NextResponse.json(events[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    if (!fs.existsSync(dataFilePath)) {
      return NextResponse.json({ error: 'Data not found' }, { status: 404 });
    }
    
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    let events = JSON.parse(fileContents);
    
    const newEvents = events.filter(e => e.id !== id);
    fs.writeFileSync(dataFilePath, JSON.stringify(newEvents, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 });
  }
}
