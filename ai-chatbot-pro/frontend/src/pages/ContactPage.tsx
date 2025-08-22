import styles from './ContactPage.module.css';

const ContactPage = () => {
  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactCard}>
        <h1 className={styles.title}>Get in Touch</h1>
        <p className={styles.subtitle}>
          Have a question or feedback? Fill out the form below to send an email.
        </p>
        <form 
          action="mailto:kunwardivasingh@gmail.com" 
          method="post" 
          encType="text/plain"
        >
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="name">Your Name</label>
            <input className={styles.input} type="text" id="name" name="name" required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">Your Email</label>
            <input className={styles.input} type="email" id="email" name="email" required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="message">Message</label>
            <textarea className={styles.textarea} id="message" name="message" rows={5} required></textarea>
          </div>
          <button className={styles.button} type="submit">Send Email</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;