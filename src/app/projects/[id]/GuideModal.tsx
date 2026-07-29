"use client";

export default function GuideModal({ guide, onClose }: { guide: string; onClose: () => void }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "3rem 1rem",
        overflowY: "auto",
        zIndex: 1000,
      }}>
      <button
        type="button"
        aria-label="Close guide"
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          border: "none",
          padding: 0,
          cursor: "default",
          background: "rgba(0, 0, 0, 0.88)",
          backdropFilter: "blur(6px)",
        }}
      />
      <div className="section" style={{ position: "relative" }}>
        <button
          type="button"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "-0.75rem",
            right: "-0.75rem",
            padding: "0.1rem 0.25rem 0.25rem 0.5rem",
          }}>
          x
        </button>
        {guide === "checklist" && (
          <>
            <h2>Before you submit</h2>
            <ul>
              <li>Make sure your mod is good :3</li>
              <li>Confirm that you did not make your mod nor your readme with AI.</li>
              <li>
                Test if your mod works properly on a server and outside of a development
                environment.
              </li>
              <li>
                Check if your mod is survival-friendly and everything that should be obtainable
                actually is.
              </li>
              <li>Ensure you are in #mc-modding so you can receive your prize.</li>
              <li>Test that your mod actually works for the versions you say it works for 😔</li>
              <li>
                Please also confirm that your mod is coherent and does not contain any tutorial
                items or files (Like ExampleMixin, suspicious substances, chisels, ...)
              </li>
            </ul>
          </>
        )}
        {guide === "github" && (
          <>
            <h2>Publishing to GitHub</h2>
            <i style={{ fontSize: "1rem" }}>
              You are allowed to use another git provider, but most people use GitHub.
            </i>
            <p>
              In Intellij, go to Menu &gt; Git &gt; GitHub &gt; Share Project On GitHub, disable
              Private and Share, this should create a Git repo for you.
            </p>
            <img src="/images/share-on-github.webp" alt="Share on GitHub" width="100%" />
            <p>
              If you aren't using Intellij, create an empty (don't add any files yet) repository on
              GitHub and run the commands GitHub prompts you to in your project folder.
            </p>
          </>
        )}
        {guide === "modrinth" && (
          <>
            <h2>Publishing to Modrinth</h2>
            <p>
              First we need to package our mod, in Intellij click on the gradle icon (the elephant)
              on the left of your screen and double click build to create a jar containing all your
              work.
            </p>
            <img src="/images/build.webp" alt="Building the mod" width="100%" />
            <p>
              Go to <a href="https://modrinth.com/">Modrinth</a> and click the + in the top left
              (sign in if you haven't already) and create a new project. Modrinth already guides you
              through the process, but watch out for these common pitfalls to prevent getting your
              mod rejected:
            </p>
            <ul>
              <li>
                Make sure you have a lengthy and properly formatted description encapsulating all
                features (<a href="https://modrinth.com/mod/quark">good example</a>,{" "}
                <a href="https://modrinth.com/mod/entityculling">great example</a>)
              </li>
              <li>Make sure you have a functional GitHub repository/issues link.</li>
              <li>Check that your license matches the one on GitHub</li>
              <li>Make sure you selected the correct version range. 1.21.x is not real.</li>
              <li>Ensure you are using the correct environment. Most likely this is "both"</li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
