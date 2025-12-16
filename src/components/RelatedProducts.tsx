import Image from "next/image";
import type { RelatedProductDto } from "@/types/receipt.types";

type Props = {
  related: RelatedProductDto;
};

export default function RelatedProducts({ related }: Props) {
  if (!related?.products?.length) return null;

  return (
    <section className="bg-green-50 border rounded-xl p-4 mb-4">
      <h3 className="text-center font-semibold text-sm mb-4">{related.title}</h3>
      <div className="grid grid-cols-2 gap-4">
        {related.products.map((p, i) => (
          <a
            key={i}
            href={p.productUrl}
            target="_blank"
            className="flex flex-col items-center text-center text-xs hover:opacity-90"
          >
            <Image
              src={p.imagePath}
              alt={p.name}
              width={80}
              height={80}
              className="rounded-lg object-cover"
            />
            <p className="mt-2">{p.name}</p>
          </a>
        ))}
      </div>
    </section>
  );
}