import React from "react";
import HomepageHeader from "../Component/Homepage/HomepageHeader/HomepageHeader";
import HomepageSection1 from "../Component/Homepage/HomepageSection1/HomepageSection1";
import HomepageSection2 from "../Component/Homepage/HomepageSection2/HomepageSection2";
import HomepageSection3 from "../Component/Homepage/HomepageSection3/HomepageSection3";
import formbot2 from "../Assest/images/formbot2.png";
import formbot1 from "../Assest/images/formbot1.png";
import HomepageSection4 from "../Component/Homepage/HomepageSection4/HomepageSection4";
import HomepageSection5 from "../Component/Homepage/HomepageSection5/HomepageSection5";
import HomepageSection6 from "../Component/Homepage/HomepageSection6/HomepageSection6";
import HomepageSection7 from "../Component/Homepage/HomepageSection7/HomepageSection7";
import HomepageFooter from "../Component/Homepage/HomepageFooter/HomepageFooter";

const Homepages = () => {
  return (
    <div>
      <HomepageHeader />
      <HomepageSection1 />
      <HomepageSection2 />
      <HomepageSection3
        imgSrc={formbot1}
        heading="Easy building experience"
        text="All you have to do is drag and
drop blocks to create your app.
Even if you have custom needs,
you can always add custom
code."
      />
      <HomepageSection3
        imgSrc={formbot2}
        heading="Embed it in a click"
        text='Embedding your typebot in
your applications is a walk in
the park. Typebot gives you
several step-by-step platform-
specific instructions. Your
typebot will always feel "native".'
        isReverse={true}
      />
      <HomepageSection4 />
      <HomepageSection5 />
      <HomepageSection6 />
      <HomepageSection7 />
      <HomepageFooter />
    </div>
  );
};

export default Homepages;
