export default function Box({ children, title }) {
  return (
    <div className="bg-gray-50 md:py-8 md:px-6 py-6 px-3 md:m-6 m-2">
      <h2 className="mb-6 font-bold">{title}</h2>
      {children}
    </div>
  );
}
