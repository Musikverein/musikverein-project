import React from 'react';
import { Link } from 'react-router-dom';

import ROUTES from '../../routers/routes';

export const Tos = () => {
  return (
    <>
      <Link to={ROUTES.SIGN_UP} className="flex items-center">
        <span className="bx bxs-chevron-left text-4xl" />
        <span className="text-sm text-gray-500">Go back</span>
      </Link>
      <h1 className="pt-4 px-4 color__secundary text-xl font-semibold">
        Musikverein Terms and Conditions of Use
      </h1>
      <div className="p-4 text-sm">
        <p className="pt-2">
          This website is the property of Musikverein. These Terms and
          Conditions set out the parameters under parameters under which the
          user may use the website and the services offered. This website offers
          visitors the service of uploading and listening to songs. By visiting
          by accessing or using our service website, you acknowledge that you
          have read, understand and agree to be bound by these Terms. and agree
          to be bound by these Terms:
        </p>
        <p className="pt-2">
          - To use our website and/or receive our services, the user must be at
          least. at least 18 years of age, or the legal age of majority in your
          jurisdiction, and possess the legal authority, right and freedom to
          legal authority, right and freedom to enter into these Terms as a
          binding agreement. The user is not permitted to use this web site
          and/or receive services if doing so is prohibited in your country or
          under any law or regulation applicable to you.
        </p>
        <p className="pt-2">
          - The website is not responsible for the improper use of copyrighted
          files: such responsibility rests with the user. responsibility lies
          with the user who chooses to add copyrighted files without the
          explicit consent of the user. without the explicit consent of the
          author.
        </p>
        <p className="pt-2">
          - Musikverein can terminate or suspend permanently or temporarily the
          access of the user to the service access to the service without prior
          notice and liability for any reason, even if at our sole determination
          the user violates any copyright our sole determination the user
          violates any provision of these Terms or any applicable law or
          regulation. applicable law or regulation. You may discontinue use of
          and request cancellation of your account and/or any service at any
          time. any service at any time. Notwithstanding the foregoing, with
          respect to automatically renewed subscriptions to the services
          automatically renewed subscriptions to paid services, such
          subscriptions shall be suspended only at the shall be suspended only
          upon expiration of the relevant period for which payment has already
          been made. payment has already been made.
        </p>
        <p className="pt-2">
          - To the fullest extent permitted by applicable law, in no event shall
          Musikverein be liable for indirect, punitive, exemplary, incidental,
          consequential, punitive, incidental, punitive or be liable for
          indirect, punitive, incidental, special, consequential or exemplary
          damages, including, but not limited to, indirect, punitive,
          incidental, special, consequential or exemplary damages. exemplary
          damages, including, but not limited to, damages for loss of profits,
          goodwill, use, data, or other intangible or other intangible losses,
          arising out of or in connection with the use or inability to use the
          service. use of the service. To the fullest extent permitted by
          applicable law, Musikverein assumes no liability whatsoever for errors
          or inaccuracies of the for errors or inaccuracies in content; personal
          injury or property damage, of any nature whatsoever, resulting from
          access to or use of our service; any unauthorized access to or use of
          our secure servers and/or any personal information stored thereon.
          personal information stored therein.
        </p>
        <p className="pt-2">
          - This website uses cookies for its correct functioning, with the
          acceptance of these terms and conditions, the user accepts the terms
          and conditions, the user accepts the use of own and third party
          cookies.
        </p>
        <p className="pt-2">
          - This website uses third party services, with the acceptance of these
          terms and conditions, the user accepts the conditions, the user agrees
          to share their data with third parties.
        </p>
        <p className="pt-2">
          - Musikverein reserves the right to modify these terms when necessary.
          Therefore, the user should review these pages periodically. When the
          Terms are modified the Terms in a material way, the user will be
          notified. Your continued use of the website or the services offered by
          Musikverein after such change constitutes the user&apos;s acceptance
          of the new terms. user&apos;s acceptance of the new Terms. If the user
          does not accept any of these these terms or any future version of the
          Terms, the User may not use or access (or continue to access) the (or
          continue to access) the website or service.
        </p>
      </div>
    </>
  );
};
