import { burstConfetti } from "~/lib/confetti";

export function ChecklistGuide() {
  return <>
    <h2>Before you submit</h2>
    <ul>
      <li>Make sure your mod is good :3</li>
      <li>Confirm that you did not make your mod nor your readme with AI.</li>
      <li>
        Test if your mod works properly on a server and outside of a development environment.
      </li>
      <li>
        Check if your mod is survival-friendly and everything that should be obtainable
        actually is.
      </li>
      <li>Ensure you are in #mc-modding so you can receive your prize.</li>
      <li>Test that your mod actually works for the versions you say it works for 😔</li>
      <li>
        Please also confirm that your mod is coherent and does not contain any tutorial items
        or files (Like ExampleMixin, suspicious substances, chisels, ...)
      </li>
    </ul>
  </>
}

export function ModrinthGuide() {
  return <>
    <h2>Publishing to Modrinth</h2>
    <p>
      First we need to package our mod, in Intellij click on the gradle icon (the elephant) on
      the left of your screen and double click build to create a jar containing all your work.
    </p>
    <img src="/images/build.webp" alt="Building the mod" width="100%" />
    <p>
      Go to <a href="https://modrinth.com/">Modrinth</a> and click the + in the top left (sign
      in if you haven't already) and create a new project. Modrinth already guides you through
      the process, but watch out for these common pitfalls to prevent getting your mod
      rejected:
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
}

export function GithubGuide() {
  return <>
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
}

export function PreSubmit({ setGuide }: { setGuide: (guide: string | null) => void }) {
  return <>
    <h2>Hold up!</h2>
    <p>Before you submit, make sure your mod page has:</p>
    <ul>
      <li>A proper gallery with screenshots of your mod in action</li>
      <li>A lengthy, well-formatted description covering all features</li>
      <li>A working GitHub repository link with a README<button type="button" className="help-icon" onClick={() => setGuide("github")}>
        ?
      </button></li>
    </ul>
    <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
      <button
        type="submit"
        className="btn"
        name="intent"
        value="submit"
        onClick={e => burstConfetti(e.clientX, e.clientY)}
      >
        All good, send it off!
      </button>
      <button type="button" className="btn" onClick={() => setGuide(null)}>
        Let me double check
      </button>
    </div>
  </>
}