import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";

const CustomImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  iconSize,
  ...props
}) => {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  if (!src) {
    return <p>Imagem não encontrada</p>;
  }

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-200 ${className}`}
        style={{ width, height }}
        aria-label="Imagem não carregada"
      >
        <ImageOff
          className="text-gray-400"
          size={iconSize || (width > 100 ? 48 : 24)}
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      width={width}
      height={height}
      className={className}
      onError={handleError}
      priority={src}
    />
  );
};

export default CustomImage;
