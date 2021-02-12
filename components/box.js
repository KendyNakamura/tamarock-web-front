export default function Box({ children, title = null, h = 2 }) {
  const className = "mb-6 font-bold";

  if (title) {
    var titleSection = h === 2 ? <h2 className={className}>{title}</h2> : <h3 className={className}>{title}</h3>;
  } else {
    var titleSection = "";
  }

  return (
    <div className="bg-gray-50 md:py-8 md:px-6 py-6 px-3 md:m-6 m-2">
      {titleSection}
      {children}
    </div>
  );
}
