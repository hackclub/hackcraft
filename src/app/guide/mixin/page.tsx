import Link from "next/link";
import SplashText from "~/components/SplashText";
import TiledDiv from "~/components/TiledDiv";

export const revalidate = 60;

export default function GuidePage() {
  return (
    <>
      <TiledDiv background="grass" id="navbar">
        <Link className="back" href="/guide#2">
          back
        </Link>
        <div style={{ top: "5em", position: "relative" }}>
          <Link href="/">
            <img src="/images/logo.png" alt="Minecraft Logo" width="100%" />
          </Link>
          <SplashText />
        </div>
      </TiledDiv>
      <TiledDiv id="header" background="dirt">
        <div id="subtitle" style={{ fontSize: "1.2em", marginBottom: "5em" }}>
          <span>Mixin</span>
        </div>
        <div className="section">
          <i style={{ fontSize: "1rem" }}>
            Disclaimer: This tutorial is highly simplified and does something
            very specific that you probably don't want. However, it should give
            you a basic understanding of the process of creating Mixins.
          </i>
          <p>
            Mojang and Fabric's APIs can handle a lot for you, but sometimes
            you'll find limitations. That's where Mixins come in. Mixins let you
            modify the game's code directly, without editing the Minecraft jar
            itself.
          </p>
        </div>
      </TiledDiv>
      <TiledDiv background="cobblestone" style={{ padding: "1rem" }}>
        <div className="section">
          <div className="section-title" id="1">
            <h3>Localizing Our Target</h3>
            <a href="#2" className="skip">
              skip
            </a>
          </div>
          <p>
            Let's say you want the player to get flattened if they get hit by an
            anvil. First, we need to find the code that damages you when an
            anvil falls on you. Our first clue is that an anvil is a falling
            block. Searching for that leads us to the{" "}
            <code>FallingBlockEntity</code> class.
          </p>
          <div style={{ fontSize: "1rem" }}>
            <p>Some helpful shortcuts:</p>
            <ul>
              <li>`Ctrl + N` to search classes (set scope to "All Places")</li>
              <li>`Ctrl + Shift + F` for full-text search</li>
              <li>`Ctrl + Click` to follow references</li>
              <li>
                Use "Decompile with Vineflower" in a Minecraft class for better
                code and results
              </li>
            </ul>
          </div>

          <p>
            Looking through that class, I found a{" "}
            <code className="function">handleFallDamage</code> function
            containing this line
          </p>
          <pre>
            <code>
              <span className="keyword">this</span>.getWorld().getOtherEntities(
              <span className="keyword">this</span>,{" "}
              <span className="keyword">this</span>
              .getBoundingBox(), predicate)
              {"\n    "}
              .forEach(entity -&gt; entity.serverDamage(
              <span className="field">damageSource2</span>,{" "}
              <span className="field">f</span>));
            </code>
          </pre>

          <p>This is our target. Time to modify it!</p>
        </div>
        <div
          className="section"
          style={{
            marginTop: "1rem",
          }}>
          <div className="section-title" id="2">
            <h3>But first, some theory!</h3>
            <a href="#3" className="skip">
              skip
            </a>
          </div>
          <p>
            A Mixin is a special Java class that modifies ("mixes in") another
            class's code while the game is running. Think of it like overlaying
            the class, adding in some extra code
          </p>
          <p>
            They are written in Java, annotated with{" "}
            <code>
              <span className="annotation">@Mixin</span>(TargetClass.
              <span className="keyword">class</span>)
            </code>{" "}
            and registered in <code>resources/modid.mixin.json</code>.
          </p>
          <p>
            You can't reference Mixin classes directly from normal code as they
            don't exist at runtime, but you <i>can</i> add new methods by
            implementing interfaces in the target class.
          </p>
          <p>
            Inside Mixins you can annotate functions to do things, in most cases{" "}
            <code>
              <span className="annotation">@Inject</span>(...)
            </code>{" "}
            and{" "}
            <code>
              <span className="annotation">@Redirect</span>(...)
            </code>{" "}
            will do the trick. Both take the following parameters:
          </p>
          <pre>
            <code>
              (method ={" "}
              <span className="string">
                "the method to modify in a bytecode format, autocomplete is your
                friend"
              </span>
              ,<br />
              at =<span className="annotation"> @At</span>(
              <span className="string">"INJECTION_POINT"</span>))
            </code>
          </pre>
          <p>
            Where <code className="string">"INJECTION_POINT"</code> can be:
          </p>
          <ul>
            <li>
              <code className="string">"HEAD"</code>: the start of the method
            </li>
            <li>
              <code>
                <span className="string">"INVOKE"</span>, target ={" "}
                <span className="string">"the called method"</span>(, ordinal ={" "}
                <span className="number">the index of the invocation</span>)
              </code>
              : a function invocation (required for Redirect)
            </li>
            <li>
              <code className="string">"RETURN"</code>: any return statement
            </li>
            <li>
              <code className="string">"TAIL"</code>: the end of the method
            </li>
            <li>
              <a href="https://github.com/SpongePowered/Mixin/wiki/Injection-Point-Reference">
                Full list
              </a>
            </li>
          </ul>
          <p>
            When injecting your function gets an additional ci(r) parameter this
            can be used to inject a return statement with{" "}
            <code>ci.cancel()</code> or <code>cir.setReturnValue(...)</code>.
          </p>
          <p>
            Since mixins are applied at runtime, java and your IDE don't know
            your class will be injected into another one, you cannot access
            fields or methods.
          </p>
          <p>
            To work around this you can cast{" "}
            <code className="keyword">this</code> like so:{" "}
            <code>
              ((TargetClass) (Object) <span className="keyword">this</span>)
            </code>{" "}
            or shadow the member by creating a identically typed field/method
            and annotating it with <code className="annotation">@Shadow</code>.
          </p>
          <p>
            If you need to access a super class you can extend it in your mixin
            (Make sure your it is abstract!).
          </p>
          <h4>Additional reading</h4>
          <ul>
            <li>
              <a href="https://wiki.fabricmc.net/tutorial:mixin_examples">
                Examples (read this!)
              </a>
            </li>
            <li>
              <a href="https://github.com/LlamaLad7/MixinExtras/wiki/Local">
                Read/modify local variables
              </a>
            </li>
            <li>
              <a href="https://wiki.fabricmc.net/tutorial:accesswideners">
                Access private members
              </a>
            </li>
            <li>
              <a href="https://github.com/SpongePowered/Mixin/wiki">
                Official, more detailed docs
              </a>
            </li>
          </ul>
          <p>Here is an example of what Mixin does under the hood:</p>
          <img
            src="/images/mixin-example.png"
            alt="Mixin example"
            style={{ width: "100%", borderRadius: "8px" }}
          />
          <p>
            Add <code>-Dmixin.debug.export=true</code> to your VM options and
            check <code>run/.mixin.out</code> to see your own generated code.
          </p>
        </div>
      </TiledDiv>
      <TiledDiv
        background="deepslate"
        style={{ paddingTop: "1em", paddingBottom: "1em" }}>
        <div className="section">
          <div className="section-title" id="3">
            <h3>Injecting the code</h3>
          </div>
          <p>
            Alright, that was a lot. Feel free to any questions you got in{" "}
            <code>#mc-modding</code>. Now let's finally write our Mixin.
          </p>
          <p>
            Lets create a new abstract class called{" "}
            <code>FallingBlockEntityMixin</code> inside your <code>mixin</code>{" "}
            directory (create it if it doesn't exist) and annotate it with{" "}
            <code>
              <span className="annotation">@Mixin</span>(FallingBlockEntity.
              <span className="keyword">class</span>)
            </code>
          </p>
          <p>
            A warning should pop, click "Add To Mixin Config" (or manually add{" "}
            <code className="string">"FallingBlockEntityMixin"</code> to the{" "}
            <code className="string">"mixins"</code> array in your config).
          </p>
          <p>
            This example is unfortunately a special case as we need to inject
            into a lambda. To find the synthetic method name, go to Menu &gt;
            View &gt; Show Bytecode, search for
            <code>serverDamage</code> (as it is called in the lambda) and look
            up. In this case, the method is named{" "}
            <code className="function">method_32879</code>.
          </p>
          <p>
            Since we don't care where in the lambda we inject, we'll use{" "}
            <code className="string">"TAIL"</code>.
          </p>
          <p>And following that we get this:</p>
          <pre>
            <code>
              <span className="annotation">@Mixin</span>(FallingBlockEntity.
              <span className="keyword">class</span>){"\n"}
              <span className="keyword">public abstract class</span>{" "}
              FallingBlockEntityMixin {"{\n    "}
              <span className="annotation">@Inject</span>(method ={" "}
              <span className="string">"method_32879"</span>, at ={" "}
              <span className="annotation">@At</span>(
              <span className="string">"TAIL"</span>)){"\n    "}
              <span className="keyword">private static void</span>{" "}
              <span className="function">shrinkEntity</span>(DamageSource
              damageSource, <span className="keyword">float</span> amount,
              {"\n                                     "}Entity entity,
              CallbackInfo ci) {"{\n        "}
              <span className="comment">
                {"// "}The actual code is out of scope for this tutorial (since
                my mod is already doing it :&gt;)
              </span>
              {"\n    }"}
              {"\n}"}
            </code>
          </pre>

          <p>
            That's it! The rest is up to you, now go make something cool! :D
          </p>
          <Link href="/guide#2">Back</Link>
        </div>
      </TiledDiv>
      <TiledDiv id="footer" background="bedrock">
        <em className="player1 love">And the universe said I love you...</em>
        <p style={{ display: "flex", gap: "4px", justifyContent: "center" }}>
          Made with{" "}
          <img
            src="/images/dancing_parrot.gif"
            alt="minecraft parrot"
            title="A minecraft parrot"
            height="20px"
          />{" "}
          by <a href="https://hackclub.com">Hack Club</a>.
        </p>
      </TiledDiv>
    </>
  );
}
