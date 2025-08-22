import styles from './ContactPage.module.css';

const ContactPage = () => {
  return (
    <div className={styles.cpContainer}>
      <div className={styles.cpCard}>
        <h1 className={styles.cpTitle}>Get in Touch</h1>
        <p className={styles.cpSubtitle}>
          Have a question or feedback? Fill out the form below to send an email.
        </p>
        <form 
          action="mailto:kunwardivasingh@gmail.com" 
          method="post" 
          encType="text/plain"
        >
          <div className={styles.cpFormGroup}>
            <label className={styles.cpLabel} htmlFor="name">Your Name</label>
            <input className={styles.cpInput} type="text" id="name" name="name" required />
          </div>
          <div className={styles.cpFormGroup}>
            <label className={styles.cpLabel} htmlFor="email">Your Email</label>
            <input className={styles.cpInput} type="email" id="email" name="email" required />
          </div>
          <div className={styles.cpFormGroup}>
            <label className={styles.cpLabel} htmlFor="message">Message</label>
            <textarea className={styles.cpTextarea} id="message" name="message" rows={5} required></textarea>
          </div>
          <button className={styles.cpButton} type="submit">Send Email</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;