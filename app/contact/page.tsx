import ContactBanner from "@/components/helper/ContactBanner"
import FeatureHighlights from "@/components/helper/FeatureHighlights"
import Contact from "@/components/homepage/contact"

function ContactPage(){
  return(
    <div>
      <ContactBanner/>
      <Contact/>
      <FeatureHighlights/>
    </div>
  )
}
export default ContactPage