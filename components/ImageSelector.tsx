import Image from "next/image";

interface ImageSelectorProps {
  onSelect: (imagePath: string) => void;
}

const backgroundImages = [
  "/backgrounds/birthday.jpg",
  "/backgrounds/chrismas.jpg",
  "/backgrounds/cosmic.jpg",
  "/backgrounds/crismas.jpg",
  "/backgrounds/forest.jpg",
  "/backgrounds/glass.jpg",
  "/backgrounds/nature.jpg",
  "/backgrounds/party.jpg",
  "/backgrounds/pumpkin.jpg",
  "/backgrounds/stars.jpg",
  "/backgrounds/winter.jpg",
];

export function ImageSelector({ onSelect }: ImageSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-2 mt-2 ml-2">
      <button
        className="relative w-full border border-black/10 rounded overflow-hidden flex justify-center items-center focus:outline-none focus:ring-2 focus:ring-[#00c2cb]"
        onClick={() => onSelect("")}
      >
        <p className="text- font-medium">None</p>
      </button>
      {backgroundImages.map((imagePath, index) => (
        <button
          key={index}
          className="relative w-full size-14 border border-black/10 rounded overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#00c2cb]"
          onClick={() => onSelect(imagePath)}
        >
          <Image
            src={imagePath}
            alt={`Background ${index + 1}`}
            className="w-full h-full object-cover"
            width={400}
            height={400}
          />
        </button>
      ))}
    </div>
  );
}
