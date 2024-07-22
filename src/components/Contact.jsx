import React from 'react';
import contactStyles from './Contact.module.css';
import NavBar from './Navbar';

function Contact() {
  return ( <>
  <NavBar />
    <div className={contactStyles.container}>
      <form action="https://api.web3forms.com/submit" method="POST" className={contactStyles.form}>
        <input type="hidden" name="access_key" value="1f54def1-a096-4228-a1dd-3e2a012672ac" />
        <h2 className={contactStyles.heading}>Contact Us</h2>
        <label className={contactStyles.label}>
          <h3 className={contactStyles.subheading}>Name:</h3>
          <input type="text" name="name" required placeholder="Full Name" className={contactStyles.input} />
        </label>
        <label className={contactStyles.label}>
          <h3 className={contactStyles.subheading}>E-mail:</h3>
          <input type="email" name="email" required placeholder="Email Address" className={contactStyles.input} />
        </label>
        <label className={contactStyles.label}>
          <h3 className={contactStyles.subheading}>Phone:</h3>
          <input type="tel" name="phone" required placeholder="Phone Number" className={contactStyles.input} />
        </label>
        <label className={contactStyles.label}>
          <h3 className={contactStyles.subheading}>Message:</h3>
          <textarea name="message" required placeholder="Your Message" className={contactStyles.textarea}></textarea>
        </label>
        <button type="submit" className={contactStyles.button}>Send Message!</button>
      </form>
    </div>
    </>
  );
}

export default Contact;
