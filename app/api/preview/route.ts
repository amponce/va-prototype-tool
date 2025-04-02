import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { writeFile, readFile } from 'fs/promises'
import { join } from 'path'

const TEMP_DIR = join(process.cwd(), 'temp-components')

export async function POST(req: Request) {
  try {
    const { code, chatId } = await req.json()

    if (!code || !chatId) {
      return NextResponse.json({ error: 'Code and chat ID are required' }, { status: 400 })
    }

    // Create the temp component file
    const componentPath = join(TEMP_DIR, `${chatId}.tsx`)
    await writeFile(componentPath, code, 'utf-8')

    return NextResponse.json({ componentId: chatId })
  } catch (error) {
    console.error('Error creating preview:', error)
    return NextResponse.json(
      { error: 'Failed to create preview' },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const componentId = searchParams.get('id')

    if (!componentId) {
      return NextResponse.json({ error: 'No component ID provided' }, { status: 400 })
    }

    // Read the component file
    const componentPath = join(TEMP_DIR, `${componentId}.tsx`)
    const code = await readFile(componentPath, 'utf-8')

    // Format the code as a proper module
    const moduleCode = `
import React from 'react';
import { VaButton, VaAlert } from "@department-of-veterans-affairs/component-library/dist/react-bindings";
import { VAStylesProvider } from "@/app/va-styles";

${code}

export default DynamicComponent;
`;

    return NextResponse.json({ code: moduleCode })
  } catch (error) {
    console.error('Error fetching preview:', error)
    return NextResponse.json(
      { error: 'Failed to fetch preview' },
      { status: 500 }
    )
  }
} 