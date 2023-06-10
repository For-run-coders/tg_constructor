plugins {
    id("java")
    id("com.google.cloud.tools.jib") version "3.3.2"

}
dependencies {
    compileOnly("org.projectlombok:lombok:1.18.28")
    annotationProcessor("org.projectlombok:lombok:1.18.28")
    implementation("org.slf4j:slf4j-api:1.7.25")
    implementation("org.slf4j:slf4j-simple:1.7.25")
    implementation("ch.qos.logback:logback-core:1.4.7")
    implementation("ch.qos.logback:logback-classic:1.4.7")



//    db
    implementation("org.flywaydb:flyway-core:9.19.3")
    implementation("org.postgresql:postgresql:42.6.0")

}

repositories {
    mavenCentral()
}

jib {
    from {
        image = "eclipse-temurin"
        auth {
            username = System.getProperty("DOCKER_USERNAME")
            password = System.getProperty("DOCKER_PASSWORD")
        }
    }
    to {
        auth {
            username = System.getProperty("DOCKER_USERNAME")
            password = System.getProperty("DOCKER_PASSWORD")
        }
    }
}
java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(17))
    }
}


