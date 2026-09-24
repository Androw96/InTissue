import { notFound } from 'next/navigation';
import { products } from '@/lib/products';
import ProductProfileContent from '../../product-profile-content';
export default async function ProductProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!products.some((product) => product.id === id)) notFound();
  return <ProductProfileContent id={id} />;
}
