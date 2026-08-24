import { randomBytes } from 'crypto';

export function generateReferenceNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 900000) + 100000;
  return `TFS-${year}-${random.toString().padStart(6, '0')}`;
}
