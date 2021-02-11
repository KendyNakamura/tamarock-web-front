export default function Box({ children, title }) {
  return (
    <div className="bg-gray-50 py-8 px-6 m-6 md:p-6 md:my-6">
      <h2>{title}</h2>
      {children}
    </div>
  );
}
