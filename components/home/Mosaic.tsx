
export default function Mosaic({ images }: { images: { src: string; alt: string }[] }) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover rounded-md shadow-md"
          />
        ))}
      </div>
    );
  }
  