import { Button, SectionWithContainer } from "@/components";

interface ContactCardProps {
  title: string;
  subTitle: string;
  label: string;
  href: string;
}
const ContactCard: React.FC<ContactCardProps> = ({
  title,
  subTitle,
  label,
  href,
}) => {
  return (
    <SectionWithContainer>
      <div className="lg:grid grid-cols-7 flex-col flex w-full gap-6 lg:px-20 lg:py-10 max-sm:p-6 rounded-3xl bg-primary">
        <div className="lg:col-span-5 flex flex-col gap-4">
          <h3 className="capitalize text-white mediumHeading tracking-wide mendl max-sm:text-center">
            {title}
          </h3>
          <p className=" text-white description1 font-extralight avenir max-sm:text-center">{subTitle}</p>
        </div>
        <div className="lg:col-span-2 col-span-3 flex items-center justify-center lg:justify-end w-full h-full">
          <Button href={href} label={label} className="border-white bg-white !text-primary border avenir-book" />
        </div>
      </div>
      <p className="text-primary text-center description1 avenir mt-2">*Veg Starting@₹899/- and Non-Veg Starting@₹1099/-</p>
    </SectionWithContainer>
  );
};

export default ContactCard;
