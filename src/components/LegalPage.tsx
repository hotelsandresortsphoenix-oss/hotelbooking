export type LegalSection = {
  heading?: string;
  paragraphs: string[];
};

export function LegalPageLayout({
  title,
  intro,
  sections,
}: {
  title: string;
  intro?: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <section className="bg-neutral-950 text-white py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-semibold">
            {title}
          </h1>
          {intro && <p className="mt-4 max-w-2xl text-neutral-300">{intro}</p>}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-4xl gap-10 px-4">
          {sections.map((section, index) => (
            <div key={section.heading ?? index}>
              {section.heading && (
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-neutral-900">
                  {section.heading}
                </h2>
              )}
              <div className="mt-3 grid gap-3 text-sm leading-relaxed text-neutral-700">
                {section.paragraphs.map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
