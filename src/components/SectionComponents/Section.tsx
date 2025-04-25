interface SectionProps {
  className?: string;
  lgpy?: string;
  py?: string;
  children: React.ReactNode;
  id?: string;
}

const Section: React.FC<SectionProps> = ({
  className = "",
  lgpy,
  py,
  id,
  children,
}) => {
  return (
    <section
      className={`max-w-[1600px] mx-auto w-full ${lgpy ? `lg:py-${lgpy}` : "lg:py-14"} ${py ? `py-${py}` : "py-8"} ${className}`}
      id={id}
    >
      {children}
    </section>
  );
};

export default Section;
