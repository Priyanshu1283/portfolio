export default function TextureDivider() {
  return (
    <div className="relative w-full border-b h-10 overflow-hidden select-none">
      <div className="absolute inset-0 bg-stripes" />
      <div className="innerContainer relative h-full" />
    </div>
  );
}
