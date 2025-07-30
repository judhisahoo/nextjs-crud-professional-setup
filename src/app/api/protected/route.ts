import jwt from 'jsonwebtoken';

export async function GET(req: Request) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) return new Response('Unauthorized', { status: 401 });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return new Response(JSON.stringify({ message: 'You are authorized!', user: decoded }));
  } catch {
    return new Response('Invalid or expired token', { status: 401 });
  }
}
