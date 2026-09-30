import { NextResponse } from 'next/server';
import { overviewService } from '@/lib/container';

export const dynamic = 'force-dynamic';

export async function GET() {
  const overview = await overviewService.getOverview();
  return NextResponse.json(overview);
}