"use client";
import JSZip from "jszip";
import { useState } from "react";

export default function ProjectGenerator() {
  const [name, setName] = useState("");
  let group = "";

  return (
    <div style={{ fontSize: "1rem" }}>
      <input
        type="text"
        placeholder="Project name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <span style={{ fontSize: "1rem" }}>
        {" "}
        {name.toLowerCase().includes("hackcraft")
          ? "A little more original please!"
          : "Mod id: " +
            name
              .toLowerCase()
              .replaceAll(/\s+/g, "-")
              .replaceAll(/[^a-za-z0-9-_]/g, "")}
      </span>
      <br />
      <input
        type="text"
        placeholder="Group"
        onChange={e => (group = e.target.value)}
      />
      <i> Examples: com.yourwebsite, io.github.username, me.name</i>
      <br />
      Version: 26.1.2
      <br />
      <button onClick={() => generate(group, name)}>Download template</button>
    </div>
  );
}

async function generate(group: string, name: string) {
  const modid = name
    .toLowerCase()
    .replaceAll(/\s+/g, "-")
    .replaceAll(/[^a-za-z0-9-_]/g, "");

  const zip = new JSZip();
  zip.file(
    ".gitignore",
    ".gradle/\nbuild/\nout/\n.idea/\n.vscode/\n*.DS_Store\nrun/",
  );
  zip.file(
    "gradle.properties",
    `org.gradle.jvmargs=-Xmx1G
org.gradle.parallel=true
org.gradle.configuration-cache=false

minecraft_version=26.1.2
loader_version=0.19.2
loom_version=1.16-SNAPSHOT

fabric_api_version=0.146.1+26.1.2

mod_version=1.0.0`,
  );
  zip.file(
    "settings.gradle",
    `pluginManagement {
  repositories {
  	maven {
  		name = 'Fabric'
  		url = 'https://maven.fabricmc.net/'
  	}
  	mavenCentral()
  	gradlePluginPortal()
  }
}

rootProject.name = '${modid}'`,
  );
  zip.file(
    "build.gradle",
    `plugins {
	id 'net.fabricmc.fabric-loom' version "\${loom_version}"
}

version = project.mod_version
group = "${group}"

loom {
	decompilerOptions.named("vineflower") {
		options.put("mark-corresponding-synthetics", "1") // Adds names to lambdas - useful for mixins
	}

	runs {
		afterEvaluate {
			configureEach {
				//vmArg("-javaagent:<path to fabrics sponge mixin jar under external libraries>") // Allows mixin hotswapping
				//vmArg("-XX:+AllowEnhancedClassRedefinition") // Better class hotswapping, requires https://github.com/JetBrains/JetBrainsRuntime
				vmArg("-DMC_DEBUG_ENABLED")
				vmArg("-DMC_DEBUG_HOTKEYS")
				vmArg("-DMC_DEBUG_VERBOSE_COMMAND_ERRORS")
				vmArg("-DMC_DEBUG_DEV_COMMANDS")
				//vmArg("-Dmixin.debug.export=true") // Exports the result of mixins to run/.mixin/out
			}
		}
	}
}

dependencies {
	minecraft "com.mojang:minecraft:\${project.minecraft_version}"
	implementation "net.fabricmc:fabric-loader:\${project.loader_version}"
	implementation "net.fabricmc.fabric-api:fabric-api:\${project.fabric_api_version}"
}

processResources {
	inputs.property "version", project.version

	filesMatching("fabric.mod.json") {
		expand "version": inputs.properties.version
	}
}

tasks.withType(JavaCompile).configureEach {
	it.options.release = 25
}

java {
	sourceCompatibility = JavaVersion.VERSION_25
	targetCompatibility = JavaVersion.VERSION_25
}

jar {
	inputs.property "projectName", project.name

	from("LICENSE") {
		rename { "\${it}_\${project.name}"}
	}
}`,
  );

  zip.file(
    `src/main/resources/${modid}.mixins.json`,
    JSON.stringify(
      {
        required: true,
        package: group + "." + modid + ".mixin",
        compatibilityLevel: "JAVA_25",
        mixins: [],
        injectors: {
          defaultRequire: 1,
        },
        overwrites: {
          requireAnnotations: true,
        },
      },
      null,
      "  ",
    ),
  );
  zip.file(
    "src/main/resources/fabric.mod.json",
    JSON.stringify(
      {
        schemaVersion: 1,
        id: modid,
        version: "${version}",
        name,
        description: "",
        authors: [],
        contact: {},
        license: "MIT",
        icon: `assets/${modid}/icon.png`,
        environment: "*",
        entrypoints: {
          main: [group + "." + modid + ".Main"],
        },
        mixins: [modid + ".mixins.json"],
        depends: {
          minecraft: "~26.1",
          "fabric-api": "*",
        },
      },
      null,
      "  ",
    ),
  );
  zip.file(
    "src/main/java/" + group.replaceAll(".", "/") + "/" + modid + "/Main.java",
    `package ${group}.${modid};

import net.fabricmc.api.ModInitializer;

public class Main implements ModInitializer {
	@Override
	public void onInitialize() {
	}
}`,
  );

  zip.file(
    "gradle/wrapper/gradle-wrapper.properties",
    `distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\://services.gradle.org/distributions/gradle-9.4.1-bin.zip
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists`,
  );
  zip.file(
    "gradlew",
    `#!/bin/sh
  wget -qO "gradle/wrapper/gradle-wrapper.jar" "https://raw.githubusercontent.com/gradle/gradle/master/gradle/wrapper/gradle-wrapper.jar"
  java -jar gradle/wrapper/gradle-wrapper.jar wrapper
  exec "$(cd "$(dirname "$0")" && pwd)/gradlew" "$@"`,
  );
  zip.file(
    "gradlew.bat",
    `powershell -NoProfile -NonInteractive -Command "Invoke-WebRequest -Uri 'https://raw.githubusercontent.com/gradle/gradle/master/gradle/wrapper/gradle-wrapper.jar' -OutFile 'gradle/wrapper/gradle-wrapper.jar'"
    java -jar gradle/wrapper/gradle-wrapper.jar wrapper
    "%SCRIPT%" %*`,
  );

  zip.file(
    "LICENSE",
    `The MIT License (MIT)

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.`,
  );
  zip.file("README.md", "");
  const url = URL.createObjectURL(await zip.generateAsync({ type: "blob" }));
  const a = document.createElement("a");
  a.download = "template.zip";
  a.href = url;
  a.dispatchEvent(new MouseEvent("click"));
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}
