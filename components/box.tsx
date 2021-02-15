interface BOX {
  title?: string,
  h?: number,
}

const Box: React.FC<BOX> = ({ children, title = null, h = 2 }) => {
  const className = "mb-6 font-bold";

  var titleSection = <></>;
  if (title) {
    titleSection = h === 2 ? <h2 className={className}>{title}</h2> : <h3 className={className}>{title}</h3>;
  }

  return (
    <div className="bg-gray-50 md:py-8 md:px-6 py-6 px-3 md:m-6 m-2">
      {titleSection}
      {children}
    </div>
  );
}

export default Box