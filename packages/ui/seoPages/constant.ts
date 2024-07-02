import translate from "google-translate-api-x";
import { Lang } from "../types";
import { unstable_cache } from "next/cache";

const appName = process.env.APP
const lang = process.env.LG as Lang
async function translateContent(content: string) {
   
   const translatedContentRes = await translate(content, {
							to: lang,
						});
		const translatedContent = translatedContentRes.text;
      return translatedContent
}

// ---------------- About Us ------------------

export function aboutContent() {

   const raw = `
  <div className="my-8">
    <h3 className="h3">Meet Our Team at ${appName}!</h3>
    <p>
      Welcome to  ${appName}, your go-to destination for the best promotions and
      discounts online. Our team is passionate about finding the best deals,
      working with over 1000 online stores to bring you fantastic savings on
      fashion, footwear, accessories, appliances, books, electronics, and more.
    </p>
    <h3 className="h3">Discover Amazing Deals with  ${appName}</h3>
    <p>
      At  ${appName}, we offer the latest coupons, exclusive promotions, and
      unbeatable discounts from top online stores and retailers. Whether you're
      looking for a stylish new outfit or the latest tech gadget, you'll find
      incredible deals right here.
    </p>
    <h3 className="h3">How to Use  ${appName} Coupons</h3>
    <p>
      Using  ${appName} is a breeze. No need to subscribe or create an account.
      Simply browse our site, find the coupon code you need, and copy it. Paste
      the code at checkout on the retailer's website to enjoy significant
      savings on your purchase.
    </p>
    <h3>Shop and Save for Free</h3>
    <p>
      Our discount codes are completely free to use. When you shop with
       ${appName}, you can save big with double-digit percentage discounts on your
      online purchases. Why pay full price when you can get more for less?
    </p>
    <h3 className="h3">Need Help? We're Here for You!</h3>
    <p>
      Got a question? Something not clear? Found a discount code we missed? Or
      if you're an online store owner looking to share your discount information
      and collaborate with us, we'd love to hear from you!
    </p>
    
  </div>`

  return translateContent(raw)

}  

// ---------------- Contact Us ------------------
export function contactUsContent(){
   const raw = `
		<h3 className="h3">${appName} is Here to Help</h3>
					<p>
						${appName} is not an online store, but your ultimate source for the best
						coupon codes and discounts. Have questions about our coupon codes? Our
						dedicated team is ready to assist you. If you have any feedback about our
						site, we’d love to hear your ideas, product requests, and suggestions.
					</p>
					<h3 className="h3">Contact Information</h3>

					<p>
						<strong>CONTACT:</strong>
					</p>
					<p>
						Email: <a rel="noreferrer">contact@${process.env.DOMAIN}</a>
					</p>
					<p>
						<strong>HOURS OF OPERATION:</strong>
					</p>
					<p>Monday - Saturday 8:00 am - 10:00 pm IST (UTC+5.30)</p>
					<p>
						Feel free to reach out to us during our hours of operation, and we’ll
						respond promptly to any inquiries or feedback you may have.
					</p>`
    return translateContent(raw)
  }

  // ---------------- Disclaimer ------------------
export function disclaimerContent(){
  const raw = `
	<p>
						If you require any more information or have any questions about our site's
						disclaimer, please feel free to contact us by email at
						${appName}@gmail.com.
					</p>

					<p>
						All the information on this website - https://${process.env.DOMAIN} - is published
						in good faith and for general information purpose only. ${appName} does not
						make any warranties about the completeness, reliability and accuracy of
						this information. Any action you take upon the information you find on
						this website (${appName}), is strictly at your own risk. ${appName} will not
						be liable for any losses and/or damages in connection with the use of our
						website.
					</p>

					<p>
						From our website, you can visit other websites by following hyperlinks to
						such external sites. While we strive to provide only quality links to
						useful and ethical websites, we have no control over the content and
						nature of these sites. These links to other websites do not imply a
						recommendation for all the content found on these sites. Site owners and
						content may change without notice and may occur before we have the
						opportunity to remove a link which may have gone 'bad'.
					</p>

					<p>
						Please be also aware that when you leave our website, other sites may have
						different privacy policies and terms which are beyond our control. Please
						be sure to check the Privacy Policies of these sites as well as their
						"Terms of Service" before engaging in any business or uploading any
						information.
					</p>

					<h3 className="h3">Consent</h3>

					<p>
						By using our website, you hereby consent to our disclaimer and agree to
						its terms.
					</p>

					<h3 className="h3">Update</h3>

					<p>
						Should we update, amend or make any changes to this document, those
						changes will be prominently posted here.
					</p>`;
    return translateContent(raw)
  }

    // ---------------- privacyPolicy------------------
export function privacyPolicyContent(){
  const raw = `
		<p>
						By using our website, you agree to our use of your personal information.
						Below is our privacy policy, which explains how and why we use your
						personal information and what we use it for. This privacy policy applies
						only to the following site: ${appName}. If you visit other sites outside of
						this site, please be aware of their proper handling of your data as they
						may have different cookie policies.
					</p>
					<h3 className="h3">Cookies</h3>
					<p>
						Cookies are small data files that your browser places on your computer or
						mobile device while you visit a site. A cookie typically contains your
						site name and a text string or unique identifier that allows the site to
						recognize each cookie on each subsequent visit during its lifetime.
						Cookies can collect and store a wide variety of information, such as
						browser type or operating system, language, browser settings, registration
						information, or your interaction with the site.
					</p>
					<p>
						Cookies are generally not used to collect data that can identify an
						individual. However, information collected with cookies can be associated
						with a natural person if it is combined with personally identifiable data,
						such as an email address.
					</p>
	`;
    return translateContent(raw)
  }


      // ---------------- termsConditions------------------
export function termsConditionsContent(){
 const raw = `
		<p>Welcome to ${appName}!</p>

					<p>
						These terms and conditions outline the rules and regulations for the use
						of ${appName}'s Website, located at https://${process.env.DOMAIN}.
					</p>

					<p>
						By accessing this website we assume you accept these terms and conditions.
						Do not continue to use ${appName} if you do not agree to take all of the
						terms and conditions stated on this page.
					</p>

					<p>
						The following terminology applies to these Terms and Conditions, Privacy
						Statement and Disclaimer Notice and all Agreements: "Client", "You" and
						"Your" refers to you, the person log on this website and compliant to the
						Company's terms and conditions. "The Company", "Ourselves", "We", "Our"
						and "Us", refers to our Company. "Party", "Parties", or "Us", refers to
						both the Client and ourselves. All terms refer to the offer, acceptance
						and consideration of payment necessary to undertake the process of our
						assistance to the Client in the most appropriate manner for the express
						purpose of meeting the Client's needs in respect of provision of the
						Company's stated services, in accordance with and subject to, prevailing
						law of in. Any use of the above terminology or other words in the
						singular, plural, capitalization and/or he/she or they, are taken as
						interchangeable and therefore as referring to same.
					</p>

					<h3 className="h3">
						<strong>Cookies</strong>
					</h3>

					<p>
						We employ the use of cookies. By accessing ${appName}, you agreed to use
						cookies in agreement with the ${appName}'s Privacy Policy.{" "}
					</p>

					<p>
						Most interactive websites use cookies to let us retrieve the user's
						details for each visit. Cookies are used by our website to enable the
						functionality of certain areas to make it easier for people visiting our
						website. Some of our affiliate/advertising partners may also use cookies.
					</p>

					<h3 className="h3">
						<strong>License</strong>
					</h3>

					<p>
						Unless otherwise stated, ${appName} and/or its licensors own the
						intellectual property rights for all material on ${appName}. All
						intellectual property rights are reserved. You may access this from
						${appName} for your own personal use subjected to restrictions set in these
						terms and conditions.
					</p>

					<p>You must not:</p>
					<ul>
						<li>Republish material from ${appName}</li>
						<li>Sell, rent or sub-license material from ${appName}</li>
						<li>Reproduce, duplicate or copy material from ${appName}</li>
						<li>Redistribute content from ${appName}</li>
					</ul>

					<p>
						Parts of this website offer an opportunity for users to post and exchange
						opinions and information in certain areas of the website. ${appName} does
						not filter, edit, publish or review Comments prior to their presence on
						the website. Comments do not reflect the views and opinions of
						${appName},its agents and/or affiliates. Comments reflect the views and
						opinions of the person who post their views and opinions. To the extent
						permitted by applicable laws, ${appName} shall not be liable for the
						Comments or for any liability, damages or expenses caused and/or suffered
						as a result of any use of and/or posting of and/or appearance of the
						Comments on this website.
					</p>

					<p>
						${appName} reserves the right to monitor all Comments and to remove any
						Comments which can be considered inappropriate, offensive or causes breach
						of these Terms and Conditions.
					</p>

					<p>You warrant and represent that:</p>

					<ul>
						<li>
							You are entitled to post the Comments on our website and have all
							necessary licenses and consents to do so;
						</li>
						<li>
							The Comments do not invade any intellectual property right, including
							without limitation copyright, patent or trademark of any third party;
						</li>
						<li>
							The Comments do not contain any defamatory, libelous, offensive, indecent
							or otherwise unlawful material which is an invasion of privacy
						</li>
						<li>
							The Comments will not be used to solicit or promote business or custom or
							present commercial activities or unlawful activity.
						</li>
					</ul>

					<p>
						You hereby grant ${appName} a non-exclusive license to use, reproduce, edit
						and authorize others to use, reproduce and edit any of your Comments in
						any and all forms, formats or media.
					</p>

					<h3 className="h3">
						<strong>Hyperlinking to our Content</strong>
					</h3>

					<p>
						The following organizations may link to our Website without prior written
						approval:
					</p>

					<ul>
						<li>Government agencies;</li>
						<li>Search engines;</li>
						<li>News organizations;</li>
						<li>
							Online directory distributors may link to our Website in the same manner
							as they hyperlink to the Websites of other listed businesses; and
						</li>
						<li>
							System wide Accredited Businesses except soliciting non-profit
							organizations, charity shopping malls, and charity fundraising groups
							which may not hyperlink to our Web site.
						</li>
					</ul>

					<p>
						These organizations may link to our home page, to publications or to other
						Website information so long as the link: (a) is not in any way deceptive;
						(b) does not falsely imply sponsorship, endorsement or approval of the
						linking party and its products and/or services; and (c) fits within the
						context of the linking party's site.
					</p>

					<p>
						We may consider and approve other link requests from the following types
						of organizations:
					</p>

					<ul>
						<li>commonly-known consumer and/or business information sources;</li>
						<li>dot.com community sites;</li>
						<li>associations or other groups representing charities;</li>
						<li>online directory distributors;</li>
						<li>internet portals;</li>
						<li>accounting, law and consulting firms; and</li>
						<li>educational institutions and trade associations.</li>
					</ul>

					<p>
						We will approve link requests from these organizations if we decide that:
						(a) the link would not make us look unfavorably to ourselves or to our
						accredited businesses; (b) the organization does not have any negative
						records with us; (c) the benefit to us from the visibility of the
						hyperlink compensates the absence of ${appName}; and (d) the link is in the
						context of general resource information.
					</p>

					<p>
						These organizations may link to our home page so long as the link: (a) is
						not in any way deceptive; (b) does not falsely imply sponsorship,
						endorsement or approval of the linking party and its products or services;
						and (c) fits within the context of the linking party's site.
					</p>

					<p>
						If you are one of the organizations listed in paragraph 2 above and are
						interested in linking to our website, you must inform us by sending an
						e-mail to ${appName}. Please include your name, your organization name,
						contact information as well as the URL of your site, a list of any URLs
						from which you intend to link to our Website, and a list of the URLs on
						our site to which you would like to link. Wait 2-3 weeks for a response.
					</p>

					<p>Approved organizations may hyperlink to our Website as follows:</p>

					<ul>
						<li>By use of our corporate name; or</li>
						<li>By use of the uniform resource locator being linked to; or</li>
						<li>
							By use of any other description of our Website being linked to that makes
							sense within the context and format of content on the linking party's
							site.
						</li>
					</ul>

					<p>
						No use of ${appName}'s logo or other artwork will be allowed for linking
						absent a trademark license agreement.
					</p>

					<h3 className="h3">
						<strong>iFrames</strong>
					</h3>

					<p>
						Without prior approval and written permission, you may not create frames
						around our Webpages that alter in any way the visual presentation or
						appearance of our Website.
					</p>

					<h3 className="h3">
						<strong>Content Liability</strong>
					</h3>

					<p>
						We shall not be hold responsible for any content that appears on your
						Website. You agree to protect and defend us against all claims that is
						rising on your Website. No link(s) should appear on any Website that may
						be interpreted as libelous, obscene or criminal, or which infringes,
						otherwise violates, or advocates the infringement or other violation of,
						any third party rights.
					</p>

					<h3 className="h3">
						<strong>Reservation of Rights</strong>
					</h3>

					<p>
						We reserve the right to request that you remove all links or any
						particular link to our Website. You approve to immediately remove all
						links to our Website upon request. We also reserve the right to amen these
						terms and conditions and it's linking policy at any time. By continuously
						linking to our Website, you agree to be bound to and follow these linking
						terms and conditions.
					</p>

					<h3 className="h3">
						<strong>Removal of links from our website</strong>
					</h3>

					<p>
						If you find any link on our Website that is offensive for any reason, you
						are free to contact and inform us any moment. We will consider requests to
						remove links but we are not obligated to or so or to respond to you
						directly.
					</p>

					<p>
						We do not ensure that the information on this website is correct, we do
						not warrant its completeness or accuracy; nor do we promise to ensure that
						the website remains available or that the material on the website is kept
						up to date.
					</p>

					<h3 className="h3">
						<strong>Disclaimer</strong>
					</h3>

					<p>
						To the maximum extent permitted by applicable law, we exclude all
						representations, warranties and conditions relating to our website and the
						use of this website. Nothing in this disclaimer will:
					</p>

					<ul>
						<li>
							limit or exclude our or your liability for death or personal injury;
						</li>
						<li>
							limit or exclude our or your liability for fraud or fraudulent
							misrepresentation;
						</li>
						<li>
							limit any of our or your liabilities in any way that is not permitted
							under applicable law; or
						</li>
						<li>
							exclude any of our or your liabilities that may not be excluded under
							applicable law.
						</li>
					</ul>

					<p>
						The limitations and prohibitions of liability set in this Section and
						elsewhere in this disclaimer: (a) are subject to the preceding paragraph;
						and (b) govern all liabilities arising under the disclaimer, including
						liabilities arising in contract, in tort and for breach of statutory duty.
					</p>

					<p>
						As long as the website and the information and services on the website are
						provided free of charge, we will not be liable for any loss or damage of
						any nature.
					</p>
	`;
    return translateContent(raw)
  }


        // ---------------- dmca------------------
export function dmcaContent(){
 const raw = `
		<p>Welcome to ${appName}!</p>

					<p>
						These terms and conditions outline the rules and regulations for the use
						of ${appName}'s Website, located at https://${process.env.DOMAIN}.
					</p>

					<p>
						By accessing this website we assume you accept these terms and conditions.
						Do not continue to use ${appName} if you do not agree to take all of the
						terms and conditions stated on this page.
					</p>

					<p>
						The following terminology applies to these Terms and Conditions, Privacy
						Statement and Disclaimer Notice and all Agreements: "Client", "You" and
						"Your" refers to you, the person log on this website and compliant to the
						Company's terms and conditions. "The Company", "Ourselves", "We", "Our"
						and "Us", refers to our Company. "Party", "Parties", or "Us", refers to
						both the Client and ourselves. All terms refer to the offer, acceptance
						and consideration of payment necessary to undertake the process of our
						assistance to the Client in the most appropriate manner for the express
						purpose of meeting the Client's needs in respect of provision of the
						Company's stated services, in accordance with and subject to, prevailing
						law of in. Any use of the above terminology or other words in the
						singular, plural, capitalization and/or he/she or they, are taken as
						interchangeable and therefore as referring to same.
					</p>

					<h3 className="h3">
						<strong>Cookies</strong>
					</h3>

					<p>
						We employ the use of cookies. By accessing ${appName}, you agreed to use
						cookies in agreement with the ${appName}'s Privacy Policy.{" "}
					</p>

					<p>
						Most interactive websites use cookies to let us retrieve the user's
						details for each visit. Cookies are used by our website to enable the
						functionality of certain areas to make it easier for people visiting our
						website. Some of our affiliate/advertising partners may also use cookies.
					</p>

					<h3 className="h3">
						<strong>License</strong>
					</h3>

					<p>
						Unless otherwise stated, ${appName} and/or its licensors own the
						intellectual property rights for all material on ${appName}. All
						intellectual property rights are reserved. You may access this from
						${appName} for your own personal use subjected to restrictions set in these
						terms and conditions.
					</p>

					<p>You must not:</p>
					<ul>
						<li>Republish material from ${appName}</li>
						<li>Sell, rent or sub-license material from ${appName}</li>
						<li>Reproduce, duplicate or copy material from ${appName}</li>
						<li>Redistribute content from ${appName}</li>
					</ul>

					<p>
						Parts of this website offer an opportunity for users to post and exchange
						opinions and information in certain areas of the website. ${appName} does
						not filter, edit, publish or review Comments prior to their presence on
						the website. Comments do not reflect the views and opinions of
						${appName},its agents and/or affiliates. Comments reflect the views and
						opinions of the person who post their views and opinions. To the extent
						permitted by applicable laws, ${appName} shall not be liable for the
						Comments or for any liability, damages or expenses caused and/or suffered
						as a result of any use of and/or posting of and/or appearance of the
						Comments on this website.
					</p>

					<p>
						${appName} reserves the right to monitor all Comments and to remove any
						Comments which can be considered inappropriate, offensive or causes breach
						of these Terms and Conditions.
					</p>

					<p>You warrant and represent that:</p>

					<ul>
						<li>
							You are entitled to post the Comments on our website and have all
							necessary licenses and consents to do so;
						</li>
						<li>
							The Comments do not invade any intellectual property right, including
							without limitation copyright, patent or trademark of any third party;
						</li>
						<li>
							The Comments do not contain any defamatory, libelous, offensive, indecent
							or otherwise unlawful material which is an invasion of privacy
						</li>
						<li>
							The Comments will not be used to solicit or promote business or custom or
							present commercial activities or unlawful activity.
						</li>
					</ul>

					<p>
						You hereby grant ${appName} a non-exclusive license to use, reproduce, edit
						and authorize others to use, reproduce and edit any of your Comments in
						any and all forms, formats or media.
					</p>

					<h3 className="h3">
						<strong>Hyperlinking to our Content</strong>
					</h3>

					<p>
						The following organizations may link to our Website without prior written
						approval:
					</p>

					<ul>
						<li>Government agencies;</li>
						<li>Search engines;</li>
						<li>News organizations;</li>
						<li>
							Online directory distributors may link to our Website in the same manner
							as they hyperlink to the Websites of other listed businesses; and
						</li>
						<li>
							System wide Accredited Businesses except soliciting non-profit
							organizations, charity shopping malls, and charity fundraising groups
							which may not hyperlink to our Web site.
						</li>
					</ul>

					<p>
						These organizations may link to our home page, to publications or to other
						Website information so long as the link: (a) is not in any way deceptive;
						(b) does not falsely imply sponsorship, endorsement or approval of the
						linking party and its products and/or services; and (c) fits within the
						context of the linking party's site.
					</p>

					<p>
						We may consider and approve other link requests from the following types
						of organizations:
					</p>

					<ul>
						<li>commonly-known consumer and/or business information sources;</li>
						<li>dot.com community sites;</li>
						<li>associations or other groups representing charities;</li>
						<li>online directory distributors;</li>
						<li>internet portals;</li>
						<li>accounting, law and consulting firms; and</li>
						<li>educational institutions and trade associations.</li>
					</ul>

					<p>
						We will approve link requests from these organizations if we decide that:
						(a) the link would not make us look unfavorably to ourselves or to our
						accredited businesses; (b) the organization does not have any negative
						records with us; (c) the benefit to us from the visibility of the
						hyperlink compensates the absence of ${appName}; and (d) the link is in the
						context of general resource information.
					</p>

					<p>
						These organizations may link to our home page so long as the link: (a) is
						not in any way deceptive; (b) does not falsely imply sponsorship,
						endorsement or approval of the linking party and its products or services;
						and (c) fits within the context of the linking party's site.
					</p>

					<p>
						If you are one of the organizations listed in paragraph 2 above and are
						interested in linking to our website, you must inform us by sending an
						e-mail to ${appName}. Please include your name, your organization name,
						contact information as well as the URL of your site, a list of any URLs
						from which you intend to link to our Website, and a list of the URLs on
						our site to which you would like to link. Wait 2-3 weeks for a response.
					</p>

					<p>Approved organizations may hyperlink to our Website as follows:</p>

					<ul>
						<li>By use of our corporate name; or</li>
						<li>By use of the uniform resource locator being linked to; or</li>
						<li>
							By use of any other description of our Website being linked to that makes
							sense within the context and format of content on the linking party's
							site.
						</li>
					</ul>

					<p>
						No use of ${appName}'s logo or other artwork will be allowed for linking
						absent a trademark license agreement.
					</p>

					<h3 className="h3">
						<strong>iFrames</strong>
					</h3>

					<p>
						Without prior approval and written permission, you may not create frames
						around our Webpages that alter in any way the visual presentation or
						appearance of our Website.
					</p>

					<h3 className="h3">
						<strong>Content Liability</strong>
					</h3>

					<p>
						We shall not be hold responsible for any content that appears on your
						Website. You agree to protect and defend us against all claims that is
						rising on your Website. No link(s) should appear on any Website that may
						be interpreted as libelous, obscene or criminal, or which infringes,
						otherwise violates, or advocates the infringement or other violation of,
						any third party rights.
					</p>

					<h3 className="h3">
						<strong>Reservation of Rights</strong>
					</h3>

					<p>
						We reserve the right to request that you remove all links or any
						particular link to our Website. You approve to immediately remove all
						links to our Website upon request. We also reserve the right to amen these
						terms and conditions and it's linking policy at any time. By continuously
						linking to our Website, you agree to be bound to and follow these linking
						terms and conditions.
					</p>

					<h3 className="h3">
						<strong>Removal of links from our website</strong>
					</h3>

					<p>
						If you find any link on our Website that is offensive for any reason, you
						are free to contact and inform us any moment. We will consider requests to
						remove links but we are not obligated to or so or to respond to you
						directly.
					</p>

					<p>
						We do not ensure that the information on this website is correct, we do
						not warrant its completeness or accuracy; nor do we promise to ensure that
						the website remains available or that the material on the website is kept
						up to date.
					</p>

					<h3 className="h3">
						<strong>Disclaimer</strong>
					</h3>

					<p>
						To the maximum extent permitted by applicable law, we exclude all
						representations, warranties and conditions relating to our website and the
						use of this website. Nothing in this disclaimer will:
					</p>

					<ul>
						<li>
							limit or exclude our or your liability for death or personal injury;
						</li>
						<li>
							limit or exclude our or your liability for fraud or fraudulent
							misrepresentation;
						</li>
						<li>
							limit any of our or your liabilities in any way that is not permitted
							under applicable law; or
						</li>
						<li>
							exclude any of our or your liabilities that may not be excluded under
							applicable law.
						</li>
					</ul>

					<p>
						The limitations and prohibitions of liability set in this Section and
						elsewhere in this disclaimer: (a) are subject to the preceding paragraph;
						and (b) govern all liabilities arising under the disclaimer, including
						liabilities arising in contract, in tort and for breach of statutory duty.
					</p>

					<p>
						As long as the website and the information and services on the website are
						provided free of charge, we will not be liable for any loss or damage of
						any nature.
					</p>
	`;
    return translateContent(raw)
  }


