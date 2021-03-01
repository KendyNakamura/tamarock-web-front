interface BOX {
  title?: string;
  h?: number;
  testId?: string;
}

const Box: React.FC<BOX> = ({ children, title = null, h = 2, testId }) => {
  const className = "font-bold";

  var titleSection = <></>;
  if (title) {
    if (h === 1) {
      titleSection = (
        <h1 className={className} data-testid={testId ? testId : title}>
          {title}
        </h1>
      );
    } else if (h === 2) {
      titleSection = (
        <h2 className={className} data-testid={testId ? testId : title}>
          {title}
        </h2>
      );
    } else {
      titleSection = (
        <h3 className={className} data-testid={testId ? testId : title}>
          {title}
        </h3>
      );
    }
  }

  return (
    <div className="max-w-screen-md bg-gray-50 p-2 md:my-6 my-2 mx-auto">
      {titleSection}
      {children}
    </div>
  );
};

export default Box;
