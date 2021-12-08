import { Component } from 'preact';
import { route } from 'preact-router';
import { updateStore } from '_unistore';
import { ButtonDescription }  from '_components/core';
import style from './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
class TermsConditions extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isReading: true
    };
  }
	componentDidMount = () => {
		updateStore({
			customBack: () => {
				route('/', true)
			}
		});
	};

	checkIfRead = () => {
	  if (this.el && this.state.isReading) {
	    setTimeout(() => {
	      this.setState({
	        isReading: !(
	          this.el.scrollHeight - this.el.scrollTop ===
						this.el.clientHeight
	        )
	      });
	    }, 250);
	  }
	};

	handleContinue = (e) => {
		route(`/${this.props.parent}/signup`);
	};

	renderContent = () => {
		return (
			<div className={style.termsContent}
				ref={(el) => {
					if (el) {
						this.el = el;
					}
				}}
				onScroll={this.checkIfRead}> 
				<p className={`bold ${style.heading}`}>TERMS &amp; CONDITIONS AND CUSTOMER CHARTER</p>
				<p>The Terms and Conditions below shall apply to all the users and visitors of this site. Kindly read carefully as your use of this site signifies your acceptance to be bound by these terms and conditions.</p>
				<p>The TEAMLENIROBREDO.COM is a community of passionate and patriotic individuals bound together by a dream of a just and prosperous Philippines. Data contained in the site does not entail any legal commitment or contractual agreement on the part of TEAMLENIROBREDO.COM, which also reserves the right to modify its characteristics.</p>
				
				<p className={`bold ${style.heading}`}>1. DEFINITION</p>
				<p>Unless the context otherwise requires, the following expressions shall have the following meanings in these Terms of Use:</p>
				<ul>
					<li>1.1. “User” has the same meaning as in the Terms &amp; Conditions of Online Platform.</li>
					<li>1.2. “TEAMLENIROBREDO.COM Indemnitees” means TEAMLENIROBREDO.COM and all of its respective officers, employees, directors, agents, contractors and assigns.</li>
					<li>1.3. “Personal Data” means data, whether true or not, that can be used to identify, contact or locate you. Personal Data can include your name, e-mail address and phone number. “Personal Data” shall be deemed to include any data that you have provided to us when signing up for our events and projects.</li>
					<li>1.4. “Platform” means</li>
					<ul>
						<li>(a) both the web and mobile versions of the website operated and/or owned by TEAMLENIROBREDO.COM which is presently located at the following URL: www.teamlenirobredo.com; and</li>
						<li>(b) the mobile applications that in the future may be made available by TEAMLENIROBREDO.COM, including the iOS and Android versions.</li>
					</ul>
					<li>1.5. “Prohibited Material” means any information, graphics, photographs, data and/or any other material that:</li>
					<ul>
						<li>(a) contains any computer virus or other invasive or damaging code, program or macro;</li>
						<li>(b) infringes any third-party Intellectual Property or any other proprietary rights;</li>
						<li>(c) is defamatory, libelous or threatening;</li>
						<li>(d) is obscene, pornographic, indecent, counterfeited, fraudulent, stolen, harmful or otherwise illegal under the applicable law; and/or</li>
						<li>(e) is or may be construed as offensive and/or otherwise objectionable, in our sole opinion.</li>
					</ul>
					<li>1.6. “Terms of Use” means the recitals, Clauses 1 to 12 and any Schedules to these terms and conditions.</li>
					<li>1.7. “Username” refers to the unique login identification name or code which identifies a User who has an account with TEAMLENIROBREDO.COM.</li>
					<li>1.8. “You” and “Your” refer to the individuals over the age of 18 or otherwise under the supervision of a parent or legal guardian.</li>
				</ul>

				<p className={`bold ${style.heading}`}>2. INTERPRETATION</p>
				<ul>
					<li>2.1 Any reference in these Terms of Use to any provision of a statute shall be construed as a reference to that provision as amended, re-enacted or extended at the relevant time. In the Agreement, whenever the words “include”, “includes” or “including” are used, they will be deemed to be followed by the words “without limitation”. Unless expressly indicated otherwise, all references to a number of days mean calendar days, and the words “month” or “monthly” as well as all references to a number of months means calendar months.</li>
					<li>2.2. Clause headings are inserted for convenience only and shall not affect the interpretation of these Terms of Use. In the event of a conflict or inconsistency between any two or more provisions under these Terms of Use, whether such provisions are contained in the same or different documents, such conflict or inconsistency shall be resolved in favor of TEAMLENIROBREDO.COM and the provision which is more favorable to TEAMLENIROBREDO.COM shall prevail.</li>
				</ul>

				<p className={`bold ${style.heading}`}>3. ACCEPTANCE OF THE TERMS OF USE</p>
				<ul>
					<li>3.1 You agree to comply with any and all the guidelines, notices, operating rules and policies and instructions pertaining to the use of the Services and/or access of the Platform, as well as any amendments to the aforementioned, issued by us, from time to time.</li>
					<li>3.2 TEAMLENIROBREDO.COM reserves the right to modify, add to, remove and update these guidelines, notices, operating rules and policies and instructions at any time and you are deemed to be aware of and bound by any changes to the foregoing upon their publication on the Platform.</li>
				</ul>
				
				<p className={`bold ${style.heading}`}>4. ACCESS OF PLATFORM AND USE OF SERVICES</p>
				<ul>
					<li>4.1. Guidelines: Access to this site is free. Costs of access to use the telecommunication network are to be paid by you, the Internet user, in accordance with the terms stipulated by your service provider and telecom operator.</li>
					<li>4.2. TEAMLENIROBREDO.COM grants you an unlimited license to access the site and use of the services in accordance with these Terms and Conditions, as well as the instructions and guidelines posted on this site. TEAMLENIROBREDO.COM reserves the right to terminate your access and use of platform at any time for any reason, or in the future, for commercial usage.</li>
					<li>4.3. This site is not intended for distribution, or use by, any person or entity in any jurisdiction or country where such distribution or use would be contrary to local law or regulation.</li>
					<li>4.4. You are required to create an account (“Account”) to use the TEAMLENIROBREDO.COM Services. If you provide untrue, incomplete or inaccurate information, you understand that we have the right to terminate your Account and use of the platform’s (TEAMLENIROBREDO.COM) Services at any time in our sole discretion.</li>
					<li>4.5. By creating an Account with us, you agree that TEAMLENIROBREDO.COM may contact you using the email address that you provided when activating your Account.</li>
					<li>4.6. Users are responsible for all use of the said Account, including by others to whom you have provided access to your Account. TEAMLENIROBREDO.COM may act upon any instructions received under your password and e-mail address without further verification.</li>
					<li>4.7. Unauthorized use of this site and systems including but not limited to spamming, spam related activities, or disassemble, decompile, copy, modify or reverse engineer any of the software therein. Unauthorized entry into TEAMLENIROBREDO’s systems, misuse of passwords, or misuse of any information posted on a site is strictly prohibited.</li>
					<li>4.8. You agree not to collect, use or harvest any personally identifiable information from this site. You also agree not to copy any text, image, code or other content from this site without TEAMLENIROBREDO.COM’s permission.</li>
					<li>4.9. You agree to access and/or use the site only for lawful purposes and in a lawful manner at all times and further agree to conduct any activity relating to the projects and events in good faith.</li>
					<li>4.10. You agree to ensure that any information or data you post or cause to appear on the Platform in connection with the Services is accurate and agree to take sole responsibility for such information and data.</li>
				</ul>
				
				<p className={`bold ${style.heading}`}>5. RESTRICTIONS AND LIMITATIONS</p>
				<ul>
					<li>5.1. Restrictions. Use of the Services is limited to authorized Users that are of legal age and who have the legal capacity to enter into and form contracts under existing Philippine laws and legal orders.</li>
					<li>5.2. Users who have breached the terms and conditions contained herein and Users who have been permanently or temporarily suspended from access to the site may not use the same even if they satisfy the requirements required under applicable clauses of this platform.</li>
					<li>5.3. You agree and undertake NOT to impersonate any person or entity or to falsely state or otherwise misrepresent your affiliation with any person or entity.</li>
					<li>5.4. You agree and undertake NOT to use the Platform or Services for illegal, illicit and unlawful purposes.</li>
					<li>5.5. You agree and undertake NOT to attempt and to gain unauthorized access to or otherwise interfere or disrupt other computer systems or networks connected to the Platform.</li>
					<li>5.6. You agree and undertake NOT to post, promote or transmit through the Platform or Services any Prohibited Materials.</li>
					<li>5.7. You agree and undertake NOT to interfere with another’s utilization and enjoyment of the Platform.</li>
					<li>5.8. You agree and undertake NOT to use or upload, in any way, any software or material that contains, or which you have reason to suspect that contains, viruses, damaging components, malicious code or harmful components which may impair or corrupt the Platform’s data or damage or interfere with the operation of another Customer’s computer or mobile device or the Platform or Services; and</li>
					<li>5.9. You agree and undertake NOT to use the Platform other than in conformance with the acceptable use policies of any connected computer networks, any applicable Internet standards and any other applicable laws.</li>
				</ul>
				
				<p className={`bold ${style.heading}`}>6. RESERVATIONS</p>
				<ul>
					<li>6.1. We reserve the right, but shall not be obliged to:</li>
					<ul>
						<li>(a) monitor, screen or otherwise control any activity, content or material on the Platform and/or through the Services. We may in our sole and absolute discretion, investigate any violation of the terms and conditions contained herein and may take any action it deems appropriate;</li>
						<li>(b) prevent or restrict access of any User to the Platform;</li>
						<li>(c) report any activity it suspects to be in violation of any applicable law, statute or regulation to the appropriate authorities and to co-operate with such authorities; and/or</li>
						<li>(d) to request any information and data from you in connection with your use of the site and/or access of the Platform at any time and to exercise our right under this paragraph if you refuse to divulge such information and/or data or if you provide or if we have reasonable grounds to suspect that you have provided inaccurate, misleading or fraudulent information and/or data.</li>
					</ul>
				</ul>

				<p className={`bold ${style.heading}`}>7. AVAILABILITY OF PLATFORM AND SERVICES:</p>
				<ul>
					<li>7.1. We may, from time to time and without giving any reason or prior notice, upgrade, modify, suspend or discontinue the provision of or remove, whether in whole or in part, the Platform or any Services and shall not be liable if any such upgrade, modification, suspension or removal prevents you from accessing the Platform or any part of the Services.</li>
				</ul>
				
				<p className={`bold ${style.heading}`}>8. INTELLECTUAL PROPERTY</p>
				<ul>
					<li>8.1. This site must be seen as an inseparable whole. Complete, partial reproduction or representation of pages, data and any other element constituting the site, by any process and on any support, is prohibited without the publisher's permission.</li>
					<li>8.2. The brand names and/or logos featured on the site are owned and acquired under license contract by TEAMLENIROBREDO.COM.</li>
					<li>8.3. Ownership: The Intellectual Property in and to the Platform and the Materials are owned, licensed to or controlled by us, our licensors or our service providers. We reserve the right to enforce its Intellectual Property to the fullest extent of the law.</li>
					<li>8.4. Restricted use: No part or parts of the Platform, or any Materials may be reproduced, reverse engineered, decompiled, disassembled, separated, altered, distributed, republished, displayed, broadcast, hyperlinked, mirrored, framed, transferred or transmitted in any manner or by any means or stored in an information retrieval system or installed on any servers, system or equipment without our prior written permission or that of the relevant copyright owners.</li>
					<li>8.5. Subject to Trademark’s Right permission will only be granted to you to download, print or use the Materials for personal and non-commercial uses, provided that you do not modify the Materials and that we or the relevant copyright owners retain all copyright and other proprietary notices contained in the Materials.</li>
					<li>8.6. The Trademarks are registered and unregistered trademarks of us or third parties. Nothing on the Platform and in these Terms of Use shall be construed as granting, by implication, estoppel, or otherwise, any license or right to use (including as a meta tag or as a “hot” link to any other website) any Trademarks displayed on the Services, without our written permission or any other applicable trademark owner.</li>
				</ul>
				
				<p className={`bold ${style.heading}`}>9. OUR LIMITATION OF RESPONSIBILITY AND LIABILITY</p>
				<ul>
          <li>9.1. No representations or warranties: The Platform and the Materials are provided on an “as is” and “as available” basis. All data and/or information contained in the Platform, the Services or the Materials are provided for informational purposes only. No representations or warranties of any kind, implied, express or statutory, including the warranties of non-infringement of third-party rights, title, merchantability, satisfactory quality or fitness for a particular purpose, are given in conjunction with the Platform, the Materials or the Site, in general. Without prejudice to the generality of the foregoing, we do not warrant:</li>
          <ul>
            <li>(a) the accuracy, timeliness, adequacy, commercial value or completeness of all data and/or information contained in the Platform, the Materials or the Site, in general;</li>
            <li>(b) that the Platform, the Materials or the Site, in general will be provided uninterrupted, secure or free from errors or omissions, or that any identified defect will be corrected;</li>
            <li>(c) that the Platform, the Materials or the Site, in general are free from any computer virus or other malicious, destructive or corrupting code, agent, program or macros; and</li>
            <li>(d) the security of any information transmitted by you or to you through the Platform or the Services, and you accept the risk that any information transmitted or received through the Services or the Platform may be accessed by unauthorized third parties and/or disclosed by us or our officers, employees or agents to third parties purporting to be you or purporting to act under your authority. Transmissions over the Internet and electronic mail may be subject to interruption, transmission blackout, delayed transmission due to internet traffic or incorrect data transmission due to the public nature of the Internet.</li>
          </ul>
          <li>9.2. Exclusion of liability: TEAMLENIROBREDO.COM Indemnitees shall not be liable to you for any Losses whatsoever or howsoever caused (regardless of the form of action) arising directly or indirectly in connection with:</li>
          <ul>
            <li>(a) any access, use and/or inability to use the Platform or the Services;</li>
            <li>(b) reliance on any data or information made available through the Platform and/or through the Services. You should not act on such data or information without first independently verifying its contents;</li>
						<li>(c) any system, server or connection failure, error, omission, interruption, delay in transmission, computer virus or other malicious, destructive or corrupting code, agent program or macros; and</li>
            <li>(d) any use of or access to any other website or webpage linked to the Platform, even if we or our officers or agents or employees may have been advised of, or otherwise might have anticipated, the possibility of the same.</li>
          </ul>
					<li>9.3. At your own risk: Any risk of misunderstanding, error, damage, expense or Losses resulting from the use of the Platform is entirely at your own risk and we shall not be liable therefor.</li>
        </ul>
				
				<p className={`bold ${style.heading}`}>10. LINKS, HYPERLINKS, AND ALERTS</p>
				<ul>
					<li>10.1. The site may contain links to sites controlled or offered by third parties and not by TEAMLENIROBREDO.COM. The site shall not be liable for any information, materials, products and services posted or offered by any of these third-party sites.</li>
					<li>10.2. By participating in any sponsored promotion endorsed or administered by third parties, you therefore agree to release TEAMLENIROBREDO.COM from any claims or liabilities.</li>
					<li>10.3. Hyperlinks: For your convenience, we may include hyperlinks to other websites or content on the Internet that are owned or operated by third parties. Such linked websites or content are not under our control and we are not liable for any errors, omissions, delays, defamation, libel, slander, falsehood, obscenity, pornography, profanity, inaccuracy or any other objectionable material contained in the contents, or the consequences of accessing, any linked website.</li>
					<li>10.4. Any hyperlinks to any other websites or content are not an endorsement or verification of such websites or content and you agree that your access to or use of such linked websites or content is entirely at your own risk.</li>
					<li>10.5. We may attach banners, java applets and/or such other materials to the Platform for the purposes of promoting our or our Third-Party Vendors’ products and/or services. For the avoidance of doubt, you shall not be entitled to receive any payment, fee and/or commission in respect of any such promotional materials.</li>
				</ul>
				
				<p className={`bold ${style.heading}`}>11. YOUR SUBMISSIONS AND INFORMATION</p>
				<ul>
					<li>11.1. Submissions by you: You grant us a non-exclusive license to use the materials or information that you submit to the Platform and/or provide to us, including but not limited to, questions, reviews, comments, and suggestions (collectively, “Submissions”). Provided, further, you signify intent NOT to publish your identity in the Platform.</li>
					<li>11.2. When you post comments or reviews to the Platform, you also grant us the right to use the name that you submit or your Username in connection with such review, comment, or other content. Provided, further, you signify intent NOT to publish said comment/ reviews in the Platform.</li>
					<li>11.3. You shall not use a false e-mail address, pretend to be someone other than yourself or otherwise mislead us or third parties as to the origin of any Submissions. We may, but shall not be obligated to, publish, remove or edit your Submissions.</li>
					<li>11.4. Consent to receive e-mails: You give your full, free, and unequivocal consent and authority to the collection, processing and use by us of any information provided by you (including Personal Data) for the purposes of sending informational and promotional e-mails and any and all communications, notices, updates and other information to you.</li>
					<li>11.5. Your agreement to the provisions of the paragraph 11.4 shall constitute your consent for the purpose of the provisions of any spam control laws (whether in Philippines or elsewhere). You may subsequently opt out of receiving promotional e-mails by clicking on the appropriate hyperlink in any promotional e-mail.</li>
					<li>11.6. TEAMLENIROBREDO.COM may, from time to time, be required by government agencies to disclose certain information in connection with any audit or investigation. You understand that we are not required to contest any demand made by an (government) authority for such information.</li>
					<li>11.7. Privacy Policy: You acknowledge that you have read and agree to the Privacy Policy set out Here. and consent to our collection, use and disclosure of your Personal Data for the purposes as set out in the Privacy Policy.</li>
				</ul>
				
				<p className={`bold ${style.heading}`}>12. TERMINATION</p>
				<ul>
					<li>12.1. Termination by us: In our sole and absolute discretion, we may with immediate effect terminate your use of the Platform and/or disable your Username and Password. We may bar access to the Platform (or any part thereof) for any reason whatsoever, including a breach of any of these Terms of Use or where if we believe that you have violated or acted inconsistently with any terms or conditions set out herein, or if in our opinion or the opinion of any regulatory authority, it is not suitable to continue providing the services relating to the Platform.</li>
					<li>12.2. Termination by you: You may terminate these Terms of Use by giving seven days’ notice in writing to us.</li>
				</ul>

				<p className={`bold ${style.heading}`}>13. GENERAL</p>
				<ul>
					<li>13.1. Cumulative rights and remedies: Unless otherwise provided under these Terms of Use, the provisions of these Terms of Use and our rights and remedies under these Terms of Use are cumulative and are without prejudice and in addition to any rights or remedies we may have in law or in equity, and no exercise by us of any one right or remedy under these Terms of Use, or at law or in equity, shall (save to the extent, if any, provided expressly in these Terms of Use or at law or in equity) operate so as to hinder or prevent our exercise of any other such right or remedy as at law or in equity.</li>
					<li>13.2. No waiver: Our failure to enforce these Terms of Use shall not constitute a waiver of these terms, and such failure shall not affect the right later to enforce these Terms of Use. We would still be entitled to use our rights and remedies in any other situation where you breach these Terms of Use.</li>
					<li>13.3. Severability: If at any time any provision of these Terms of Use shall be or shall become illegal, invalid or unenforceable in any respect, the legality, validity and enforceability of the remaining provisions of this Agreement shall not be affected or impaired thereby, and shall continue in force as if such illegal, invalid or unenforceable provision was severed from these Terms of Use.</li>
					<li>13.4. Rights of third parties: A person or entity who is not a party to these Terms of Use shall have no right under any legislation in any jurisdiction to enforce any term of these Terms of Use, regardless of whether such person or entity has been identified by name, as a member of a className or as answering a particular description. For the avoidance of doubt, nothing in this Clause shall affect the rights of any permitted assignee or transferee of these Terms of Use.</li>
					<li>13.5. Governing law: Use of the Platform and/or the Services and these Terms of Use shall be governed by and construed in accordance with Philippine law. If any dispute arises in connection with these Terms of Use, the Parties shall attempt, in fair dealing and in good faith, to settle such dispute. If the Parties are not able to reach an amicable settlement pursuant to the preceding section, they shall try to agree on an appropriate ADR proceeding (for example mediation, conciliation, expert determination, dispute board, adjudication). If they do not reach agreement on the appropriate ADR proceeding within 14 days after failure of the settlement negotiations or if the dispute is not settled through an ADR proceeding within a period of two months after initiation of the ADR preceding, each Party may initiate an arbitration proceeding pursuant to the following paragraph.</li>
					<li>13.6. All disputes arising out of or in connection with the present contract, including any question regarding its existence, validity or termination, shall be finally settled in accordance with the rules of the Philippine Dispute Resolution Center, Inc. (“PDRCI”) for the time being in force, which rules are deemed incorporated by reference into this clause. The arbitral tribunal shall consist of three arbitrators to be chosen in accordance with the rules of the PDRCI. The seat of arbitration shall be the Philippines. The procedural law of this seat applicable to commercial arbitration proceedings shall apply where the Rules are silent. The language to be used in the arbitration proceedings shall be English.</li>
					<li>13.7. Injunctive relief: We may seek immediate injunctive relief if we make a good faith determination that a breach or non-performance is such that a temporary restraining order or other immediate injunctive relief is the only appropriate or adequate remedy.</li>
					<li>13.8. Amendments: We may by notice through the Platform or by such other method of notification as we may designate (which may include notification by way of e-mail), vary the terms and conditions of these Terms of Use, such variation to take effect on the date we specify through the above means. If you use the Platform or the Services after such date, you are deemed to have accepted such variation. If you do not accept the variation, you must stop access or using the Platform and the Services and terminate these Terms of Use. Our right to vary these Terms of Use in the manner aforesaid will be exercised with may be exercised without the consent of any person or entity who is not a party to these Terms of Use.</li>
					<li>13.9. Correction of errors: Any typographical, clerical or other error or omission in any acceptance, invoice or other document on our part shall be subject to correction without any liability on our part.</li>
					<li>13.10. Language: In the event that these Terms of Use is executed or translated in any language other than English (“Foreign Language Version”), the English language version of these Terms of Use shall govern and shall take precedence over the Foreign Language Version.</li>
					<li>13.11. Entire agreement: These Terms of Use shall constitute the entire agreement between you and us relating to the subject matter hereof and supersedes and replaces in full all prior understandings, communications and agreements with respect to the subject matter hereof.</li>
					<li>13.12. Binding and conclusive: You acknowledge and agree that any records (including records of any telephone conversations relating to the Site, if any) maintained by us or our service providers relating to or in connection with the Platform shall be binding and conclusive on you for all purposes whatsoever and shall be conclusive evidence of any information and/or data transmitted between us and you. You hereby agree that all such records are admissible in evidence and that you shall not challenge or dispute the admissibility, reliability, accuracy or the authenticity of such records merely on the basis that such records are in electronic form or are the output of a computer system, and you hereby waive any of your rights, if any, to so object.</li>
					<li>13.13. Sub-contracting and delegation: We reserve the right to delegate or sub-contract the performance of any of our functions in connection with the Platform and/or Services and reserve the right to use any service providers, subcontractors and/or agents on such terms as we deem appropriate.</li>
					<li>13.14. Assignment: You may not assign your rights under these Terms of Use without our prior written consent. We may assign our rights under these Terms of Use to any third party.</li>
					<li>13.15. Force Majeure: We shall not be liable for non-performance, error, interruption or delay in the performance of its obligations under these Terms of Use (or any part thereof) or for any inaccuracy, unreliability or unsuitability of the Platform's and/or Services’ contents if this is due, in whole or in part, directly or indirectly to an event or failure which is beyond our reasonable control.</li>
				</ul>
				
				<p className={`bold ${style.heading}`}>14. TECHNICAL INFORMATION</p>
				<ul>
				  <li>14.1. Bear in mind that the confidentiality of correspondence is not guaranteed outside the computer network of TEAMLENIROBREDO.COM. It is up to each user in particular to take all appropriate steps to protect his own data and/or software against contamination by any viruses circulating on the Internet/web.</li>
        </ul>
				
				<p className={`bold ${style.heading}`}>15. COOKIES/INFORMATION COLLECTED WHEN YOU VISIT OUR WEBSITES</p>
				<ul>
					<li>15.1 Users are informed that when they access this site, information will be temporarily stored in memory or on their hard disk known as “cookies”. In order to optimize and customize navigation on this site, any user can configure the preferences of his browser to refuse cookies. In this case, certain functions of the site may not be accessible.</li>
					<li>15.2 We do not collect or store any personal data from you under this circumstance. You have a choice not to accept the cookies, but if you do, certain functionality, i.e. banner redirection and certain content display may not be available.</li>
				</ul>
				
				<p className={`bold ${style.heading}`}>16. STATISTICS ON VISITORS TO OUR WEBSITE</p>
				<ul>
					<li>16.1. When you use this website, TEAMLENIROBREDO.COM will record anonymous statistics about your visit and will not collect any information which identifies your personal identity until you in fact decide to agree to use any of our products/services.</li>
					<li>16.2. Our service providers make a record of your visit that includes but not limited to IP addresses (and domain names), the types and configurations of browsers, language settings, geo-locations, operating systems, previous sites visited, and time/duration and the pages visited. If you would prefer, you can set your browser to disable cookies or inform you when they are set.</li>
				</ul>
				
				<p className={`bold ${style.heading}`}>7. ABSENCE OF GUARANTEE</p>
				<ul>
					<li>17.1. TEAMLENIROBREDO.COM by all efforts keep this site up to date. However, TEAMLENIROBREDO.COM does NOT guarantee the accuracy, adequacy, correctness, completeness or quality of any information or material presented on this site.</li>
					<li>17.2. It does not claim any liability for errors or omissions in the information or material. TEAMLENIROBREDO.COM does not provide any warranty of any kind, implied, expressed or statutory including but not limited to warranties of non-infringement of third-party rights, title, merchantability, fitness for a particular purpose and freedom from computer virus.</li>
				</ul>
				
				<p className={`bold ${style.heading}`}>18. LIMITATION OF LIABILITY</p>
				<ul>
					<li>18.1. TEAMLENIROBREDO.COM, including any of its directors, officers, employees and/or representatives, shall in no case be held responsible for any direct or indirect damage, loss, or injury resulting from the visit or use of this site or linked sites.</li>
					<li>18.2. The use or dependence of any information or material in the site, or the inability to use by any party, or in connection with any failure of performance, error, omission, interruption, delay in operation or transmission, computer virus, system failure associated with the visit to the site or linked sites, including incidental or consequential damages, losses and expenses.</li>
				</ul>
				
				<p className={`bold ${style.heading}`}>19. SEVERABILITY</p>
				<ul>
					<li>19.1. Should any provision of these Terms and Conditions be or subsequently become invalid, illegal or unenforceable.</li>
					<li>19.2. These Terms and Conditions shall be deemed amended to delete therefrom the provision adjudicated invalid, illegal or unenforceable and the validity of the remaining provisions of these Terms and Conditions shall not be affected.</li>
					<li>19.3. To the extent possible, any provision adjudicated invalid, illegal or unenforceable shall be replaced with a provision that closely provides the intended result of the deleted provision.</li>
				</ul>
				
				<p className={`bold ${style.heading}`}>20. PRIVACY POLICY</p>
				<ul>
					<li>20.1. TEAMLENIROBREDO.COM is committed to maintaining the privacy of data obtained in the course of its business. Concurrent to this compliance is our acknowledgement that the data subjects whose personal information and sensitive personal information (collectively, “Information”) we collect and process are handled incorporating the minimum standards defined by the Republic Act No. 10173 (“Data Privacy Act of 2012” or “DPA”), its own internal Privacy Rules and TEAMLENIROBREDO.COM Team standards based on existing Philippine laws, jurisprudence and legal orders.</li>
					<li>20.2. As a user who provides personal information and sensitive personal information to TEAMLENIROBREDO.COM, you authorize and consent to the collection, use, processing, and transfer of said information according to valid and legitimate purposes. Further, you authorize sharing of said information to regulatory bodies or government agencies to allow TEAMLENIROBREDO.COM to meet its obligations under applicable laws, regulations, including contractual obligations. We may further collect or disclose necessary Information from our subsidiaries and affiliates or other agencies as allowed by the law.</li>
					<li>20.3. TEAMLENIROBREDO.COM also commits to maintaining the integrity, availability and confidentiality of your information against any incidents or breaches while ensuring the protection of the fundamental right of privacy. This commitment applies to all its employees, directors, and partners of TEAMLENIROBREDO.COM. Processing of information will only be done when user has given his/her consent prior to the collection of the data or as soon as practicable and reasonable. TEAMLENIROBREDO.COM will protect the privacy of your information through implementation of organizational, technical, and security measures against the unauthorized or unlawful use, loss, alteration, destruction, sharing, or access to the Information which are transmitted, stored, or otherwise processed. Under no circumstance will TEAMLENIROBREDO.COM allow selling of Information.</li>
					<li>20.4. Any transfer or sharing, or outsourced processing of your Information will be carried out in compliance with the local law through an Agreement.</li>
				</ul>
				
				<p className={`bold ${style.heading}`}>21. CONTENT AND USE OF INFORMATION</p>
				<ul>
					<li>21.1. All information provided in this site shall be deemed and shall remain the property of TEAMLENIROBREDO.COM. TEAMLENIROBREDO.COM shall be free to use for any purpose, any idea, concepts, know-how or techniques contained in the provided information, subject to the provisions on privacy detailed herein. Except as specifically required by Philippine law, TEAMLENIROBREDO.COM shall not be subject to any obligations of confidentiality regarding the provided information.</li>
					<li>21.2. By posting any content, you are granting permission to TEAMLENIROBREDO.COM and others to access and use it in connection with any service and otherwise in connection with our business. In connection with your posted contents, you agree that you will not:</li>
          <ul>
					  <li>(a) submit material that is copyrighted, protected by trade secret or otherwise subject to third party proprietary rights, including privacy and publicity rights, unless you are the owner of such rights or have permission from their rightful owner to post the material;</li>
					  <li>(b) publish falsehoods or misrepresentations that could damage TEAMLENIROBREDO.COM or any third party;</li>
					  <li>(c) submit URLs or contents that are unlawful, obscene, defamatory, libelous, threatening, pornographic, harassing, hateful, racially or ethnically offensive and encourages conduct that would be considered a criminal offense, give rise to civil liability, violate any law, or is otherwise inappropriate;</li>
					  <li>(d) offer or provide services whose subject matter is pornographic.</li>
					</ul>
          <li>21.3. reference to political activities, political party meetings, demonstrations, fliers or petitions, as well as the propagation of political symbols is prohibited. Furthermore, posted contents that insult, belittle, or in other negative ways affect other users are also prohibited. If you violate any of these restrictions, TEAMLENIROBREDO.COM is authorized to deny or delete your posted content and/or cancel your right to use the site and/or services, without prior notice.</li>
					<li>21.4. TEAMLENIROBREDO.COM may do so in its sole discretion without any obligation to investigate. You will be liable to TEAMLENIROBREDO.COM for all direct and indirect damages for any violation of the abovementioned restrictions.</li>
					<li>21.5. You agree to indemnify TEAMLENIROBREDO.COM from all claims by third party resulting from your violation of the above restrictions.</li>
				</ul>


			</div>
		);
	}

	render = () => {
	  return (
	    <div className={style.termsWrapper}>
	      {this.renderContent()}
	      <div className={style.buttonContainer}>
	        <ButtonDescription
	          onClickCallback={this.handleContinue}
	          text="CONTINUE"
	          bottomDescription="TERMS_BOTTON_DESC"
	          isDisabled={this.state.isReading}
	        />
	      </div>
	    </div>
	  );
	};
}
export default TermsConditions;
