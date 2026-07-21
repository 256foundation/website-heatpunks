import { ContactForm } from './ContactForm';

export function ContactSection() {
  return (
    <section className="py-16 md:py-24 bg-[var(--card-background)]">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-8">
          <span className="section-tag">[006]</span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide">
            GET IN TOUCH
          </h2>
          <p className="text-[var(--muted)] mt-2 text-sm">
            Have questions about the Hashrate Heatpunks? Want to get involved?
            Send us a message.
          </p>
        </div>

        {/* Contact form card */}
        <div className="heatpunk-card-accent max-w-2xl">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
