import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'blogs.json');

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();
    
    if (!fs.existsSync(dataFilePath)) {
      return NextResponse.json({ error: 'Data not found' }, { status: 404 });
    }
    
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    let blogs = JSON.parse(fileContents);
    
    const index = blogs.findIndex(b => b.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    
    blogs[index] = { ...blogs[index], ...data, id };
    fs.writeFileSync(dataFilePath, JSON.stringify(blogs, null, 2));
    
    return NextResponse.json(blogs[index]);
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
    let blogs = JSON.parse(fileContents);
    
    const newBlogs = blogs.filter(b => b.id !== id);
    fs.writeFileSync(dataFilePath, JSON.stringify(newBlogs, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 });
  }
}
