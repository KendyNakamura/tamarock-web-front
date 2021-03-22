interface BOX {
  title?: string;
  h?: number;
  testId?: string;
  src?: string;
}

const Box: React.FC<BOX> = ({ children, title = null, h = 2, testId, src = null }) => {
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
    <div className="max-w-screen-md p-1 md:my-6 my-2 mx-auto">
      {titleSection}
      <img src={src} className="w-full"/>
      {children}
    </div>
  );
};

export default Box;
