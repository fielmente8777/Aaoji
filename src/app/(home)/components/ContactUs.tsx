import { SectionWithContainer } from "@/components";
import Form from "@/components/Form";
import LazyLoadedMap from "@/components/map/LazyLoadedMap";

const ContactUs = () => {
  return (
    <SectionWithContainer sectionId="contact-us">
      <div className="md:grid grid-cols-2 flex flex-col-reverse gap-6">
        <div className="w-full rounded-2xl border border-primary overflow-hidden max-sm:aspect-square">
          <LazyLoadedMap src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4297.629890675007!2d79.3004259!3d28.9079452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390a81dc843ea97d%3A0x2ab9954886dc077c!2sAaoji%20Restaurant%20%26%20Cafe!5e1!3m2!1sen!2sin!4v1745578006807!5m2!1sen!2sin" />
        </div>
        <div
          className="w-full rounded-2xl overflow-hidden"
          style={{ boxShadow: "0px 7px 29px 0px rgba(100, 100, 111, 0.20)" }}
        >
          <Form />
        </div>
      </div>
    </SectionWithContainer>
  );
};

export default ContactUs;