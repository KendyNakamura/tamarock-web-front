interface BOX {
  title?: string,
  h?: number,
  testId?: string, 
}

const Box: React.FC<BOX> = ({ children, title = null, h = 2, testId }) => {
  const className = "font-bold";

  var titleSection = <></>;
  if (title) {
    titleSection =
      h === 2 ? (
        <h2 className={className} data-testid={testId ? testId : title}>
          {title}
        </h2>
      ) : (
        <h3 className={className} data-testid={testId ? testId : title}>
          {title}
        </h3>
      );
  }

  return (
    <div className="bg-gray-50 px-6 py-4 md:m-6 m-2">
      {titleSection}
      {children}
    </div>
  );
}

export default Box